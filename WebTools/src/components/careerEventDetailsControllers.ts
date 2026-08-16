import type { CareerEventStep, Character } from '../common/character';
import type { Attribute } from '../helpers/attributes';
import type { Department } from '../helpers/department';
import type { StepContext } from '../state/characterActions';
import {
  modifyCharacterAttribute,
  modifyCharacterDiscipline,
} from '../state/characterActions';
import { store } from '../state/store';
import type { IAttributeController } from './attributeController';
import type { IDisciplineController } from './disciplineListComponent';

export class CareerEventDisciplineController implements IDisciplineController {
  readonly character: Character;
  readonly careerEventStep: CareerEventStep;
  readonly context: StepContext;
  readonly disciplines: Department[];

  constructor(
    character: Character,
    careerEventStep: CareerEventStep,
    context: StepContext,
    disciplines: Department[],
  ) {
    this.character = character;
    this.disciplines = disciplines;
    this.context = context;
    this.careerEventStep = careerEventStep;
  }

  isShown(discipline: Department) {
    return this.disciplines.includes(discipline);
  }
  isEditable(discipline: Department): boolean {
    return true;
  }
  getValue(discipline: Department): number {
    return this.character.departments[discipline];
  }
  canIncrease(discipline: Department): boolean {
    return (
      this.character.canRaiseDepartmentValue(this.getValue(discipline)) &&
      this.careerEventStep.discipline == null
    );
  }
  canDecrease(discipline: Department): boolean {
    return this.careerEventStep?.discipline === discipline;
  }
  onIncrease(discipline: Department): void {
    store.dispatch(modifyCharacterDiscipline(discipline, this.context, true));
  }
  onDecrease(discipline: Department): void {
    store.dispatch(modifyCharacterDiscipline(discipline, this.context, false));
  }
}

export class CareerEventAttributeController implements IAttributeController {
  readonly character: Character;
  readonly careerEventStep: CareerEventStep;
  readonly context: StepContext;
  readonly attributes: Attribute[];

  constructor(
    character: Character,
    careerEventStep: CareerEventStep,
    context: StepContext,
    attributes: Attribute[],
  ) {
    this.character = character;
    this.attributes = attributes;
    this.context = context;
    this.careerEventStep = careerEventStep;
  }

  isShown(attribute: Attribute) {
    return this.attributes.includes(attribute);
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
      this.careerEventStep.attribute == null
    );
  }
  canDecrease(attribute: Attribute): boolean {
    return this.careerEventStep?.attribute === attribute;
  }
  onIncrease(attribute: Attribute): void {
    store.dispatch(modifyCharacterAttribute(attribute, this.context, true));
  }
  onDecrease(attribute: Attribute): void {
    store.dispatch(modifyCharacterAttribute(attribute, this.context, false));
  }
  get instructions() {
    return [];
  }
}
