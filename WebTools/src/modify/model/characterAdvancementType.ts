import i18next from 'i18next';
import { makeKey } from '../../common/translationKey';

export enum CharacterAdvancementType {
  Adjustment,
  Milestone,
  CharacterArc,
}

export class CharacterAdvancementModel {
  readonly name: string;
  readonly type: CharacterAdvancementType;

  constructor(type: CharacterAdvancementType, name: string) {
    this.name = name;
    this.type = type;
  }

  get localizedName() {
    return i18next.t(
      makeKey('CharacterAdvancementType.', CharacterAdvancementType[this.type]),
    );
  }
}

export class CharacterAdvancements {
  static singleton: CharacterAdvancements;

  private items: CharacterAdvancementModel[] = [
    new CharacterAdvancementModel(
      CharacterAdvancementType.Adjustment,
      'Adjustment',
    ),
    new CharacterAdvancementModel(
      CharacterAdvancementType.Milestone,
      'Milestone',
    ),
    new CharacterAdvancementModel(
      CharacterAdvancementType.CharacterArc,
      'Character Arc',
    ),
  ];

  static get instance() {
    if (CharacterAdvancements.singleton == null) {
      CharacterAdvancements.singleton = new CharacterAdvancements();
    }
    return CharacterAdvancements.singleton;
  }

  getItems() {
    return [this.items[0]];
  }
}
