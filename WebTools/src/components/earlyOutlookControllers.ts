import { Character } from '../common/character';
import type { Department } from '../helpers/department';
import type { EarlyOutlookModel } from '../helpers/upbringings';
import {
  StepContext,
  modifyCharacterDiscipline,
} from '../state/characterActions';
import { store } from '../state/store';
import type { IDisciplineController } from './disciplineListComponent';

export class EarlyOutlookDiscplineController implements IDisciplineController {
  readonly character: Character;
  readonly earlyOutlook: EarlyOutlookModel;

  constructor(character: Character, earlyOutlook: EarlyOutlookModel) {
    this.character = character;
    this.earlyOutlook = earlyOutlook;
  }

  isShown(discipline: Department) {
    return this.earlyOutlook.disciplines.includes(discipline);
  }
  isEditable(discipline: Department) {
    return this.earlyOutlook.disciplines.length >= 1;
  }
  getValue(discipline: Department) {
    return this.character.departments[discipline];
  }
  canIncrease(discipline: Department) {
    return (
      this.character.upbringingStep?.discipline == null &&
      this.character.departments[discipline] <
        Character.maxDepartment(this.character)
    );
  }
  canDecrease(discipline: Department) {
    return this.character.upbringingStep?.discipline === discipline;
  }
  onIncrease(discipline: Department) {
    store.dispatch(
      modifyCharacterDiscipline(discipline, StepContext.EarlyOutlook, true),
    );
  }
  onDecrease(discipline: Department) {
    store.dispatch(
      modifyCharacterDiscipline(discipline, StepContext.EarlyOutlook, false),
    );
  }
}
