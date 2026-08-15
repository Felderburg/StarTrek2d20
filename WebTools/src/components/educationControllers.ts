import { Character } from '../common/character';
import { Attribute } from '../helpers/attributes';
import { Department } from '../helpers/department';
import { ImprovementRuleType, TrackModel } from '../helpers/tracks';
import {
  StepContext,
  modifyCharacterAttribute,
  modifyCharacterDiscipline,
} from '../state/characterActions';
import store from '../state/store';
import { IAttributeController } from './attributeController';
import { IDisciplineController } from './disciplineListComponent';

export class EducationAttributeController implements IAttributeController {
  readonly character: Character;
  readonly track: TrackModel;

  constructor(character: Character, track: TrackModel) {
    this.character = character;
    this.track = track;
  }

  isShown(attribute: Attribute) {
    return true;
  }
  isEditable(attribute: Attribute): boolean {
    return true;
  }
  getValue(attribute: Attribute): number {
    return this.character.attributes[attribute];
  }
  getDeltaValue(attribute: Attribute): number | undefined {
    return undefined;
  }
  canIncrease(attribute: Attribute): boolean {
    return (
      this.character.canRaiseAttributeValue(this.getValue(attribute)) &&
      this.isEditable(attribute) &&
      this.character.educationStep?.attributes?.length < 3 &&
      (this.isRequiredAttributeRuleSatisfied() ||
        this.character.educationStep?.attributes?.length < 2 ||
        this.track.attributesRule?.attributes?.includes(attribute)) &&
      this.character.educationStep.attributes.filter((a) => a === attribute)
        .length < 2
    );
  }
  isRequiredAttributeRuleSatisfied() {
    if (this.track.attributesRule) {
      let result = false;
      this.track.attributesRule.attributes.forEach(
        (a) =>
          (result =
            result || this.character.educationStep.attributes.includes(a)),
      );
      return result;
    } else {
      return true;
    }
  }
  canDecrease(attribute: Attribute): boolean {
    return (
      this.isEditable(attribute) &&
      this.character.educationStep?.attributes?.includes(attribute)
    );
  }
  onIncrease(attribute: Attribute): void {
    store.dispatch(modifyCharacterAttribute(attribute, StepContext.Education));
  }
  onDecrease(attribute: Attribute): void {
    store.dispatch(
      modifyCharacterAttribute(attribute, StepContext.Education, false),
    );
  }
  get instructions() {
    return [];
  }
}

export class EducationPrimaryDisciplineController implements IDisciplineController {
  readonly character: Character;
  readonly track: TrackModel;

  constructor(character: Character, track: TrackModel) {
    this.character = character;
    this.track = track;
  }

  isShown(discipline: Department) {
    return this.track.majorDisciplines.includes(discipline);
  }
  isEditable(discipline: Department) {
    return true;
  }
  getValue(discipline: Department) {
    return this.character.departments[discipline];
  }
  canIncrease(discipline: Department) {
    return (
      this.character.educationStep?.primaryDiscipline == null &&
      this.character.departments[discipline] <
        Character.maxDepartment(this.character)
    );
  }
  canDecrease(discipline: Department) {
    return this.character.educationStep?.primaryDiscipline === discipline;
  }
  onIncrease(discipline: Department) {
    store.dispatch(
      modifyCharacterDiscipline(
        discipline,
        StepContext.Education,
        true,
        this.track.majorDisciplines,
      ),
    );
  }
  onDecrease(discipline: Department) {
    store.dispatch(
      modifyCharacterDiscipline(
        discipline,
        StepContext.Education,
        false,
        this.track.majorDisciplines,
      ),
    );
  }
}

export class EducationSecondaryDisciplineController implements IDisciplineController {
  readonly character: Character;
  readonly track: TrackModel;

  constructor(character: Character, track: TrackModel) {
    this.character = character;
    this.track = track;
  }

  isShown(discipline: Department) {
    if (this.character.educationStep?.primaryDiscipline != null) {
      return discipline !== this.character.educationStep?.primaryDiscipline;
    } else {
      return !this.track.majorDisciplines.includes(discipline);
    }
  }
  isEditable(discipline: Department) {
    return true;
  }
  getValue(discipline: Department) {
    return this.character.departments[discipline];
  }
  canIncrease(discipline: Department) {
    if (!this.character.canRaiseDepartmentValue(this.getValue(discipline))) {
      return false;
    } else if (
      this.character.educationStep?.disciplines.length === 3 &&
      this.character.educationStep?.decrementDisciplines?.length === 1
    ) {
      return false;
    } else if (
      this.character.educationStep?.disciplines.length === 2 &&
      this.character.educationStep?.decrementDisciplines?.length === 0
    ) {
      return false;
    } else if (this.character.educationStep.disciplines.includes(discipline)) {
      return false;
    } else if (this.isRequiredDisciplineRuleSatisfied()) {
      return true;
    } else if (this.track.skillsRule?.skills.includes(discipline)) {
      return true;
    } else if (
      this.track.skillsRule?.type === ImprovementRuleType.AT_LEAST_ONE
    ) {
      return this.character.educationStep?.disciplines.length === 0;
    } else {
      let need =
        this.track.skillsRule.skills.length - this.countRequiredDisciplines();
      return 2 - this.character.educationStep.disciplines.length > need;
    }
  }
  canDecrease(discipline: Department) {
    return (
      this.character.educationStep?.disciplines.includes(discipline) ||
      (this.track.skillsRule?.type === ImprovementRuleType.MAY_DECREMENT_ONE &&
        this.character.educationStep?.decrementDisciplines?.length === 0)
    );
  }
  isRequiredDisciplineRuleSatisfied() {
    if (
      this.track.skillsRule == null ||
      this.track.skillsRule.type === ImprovementRuleType.MAY_DECREMENT_ONE
    ) {
      return true;
    } else if (
      this.track.skillsRule.type === ImprovementRuleType.MUST_INCLUDE_ALL
    ) {
      return (
        this.countRequiredDisciplines() === this.track.skillsRule.skills.length
      );
    } else {
      return this.countRequiredDisciplines() >= 1;
    }
  }
  countRequiredDisciplines() {
    let count = this.track.skillsRule.skills.includes(
      this.character.educationStep.primaryDiscipline,
    )
      ? 1
      : 0;
    count += this.character.educationStep.disciplines.filter((d) =>
      this.track.skillsRule.skills.includes(d),
    ).length;
    return count;
  }
  onIncrease(discipline: Department) {
    store.dispatch(
      modifyCharacterDiscipline(discipline, StepContext.Education, true),
    );
  }
  onDecrease(discipline: Department) {
    store.dispatch(
      modifyCharacterDiscipline(discipline, StepContext.Education, false),
    );
  }
}
