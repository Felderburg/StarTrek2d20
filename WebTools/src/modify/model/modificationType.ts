import i18next from 'i18next';
import { makeKey } from '../../common/translationKey';

export enum ModificationType {
  Reputation,
  CharacterAdvancement,
  Promotion,
  Demotion,
  LogEntry,
  GeneralEdit,
  VersionUpgrade,
}

export class ModificationModel {
  readonly name: string;
  readonly type: ModificationType;

  constructor(type: ModificationType, name: string) {
    this.name = name;
    this.type = type;
  }

  get localizedName() {
    return i18next.t(
      makeKey('ModificationType.name.', ModificationType[this.type]),
    );
  }
}

export class Modifications {
  static singleton: Modifications;

  private items: ModificationModel[] = [
    new ModificationModel(ModificationType.LogEntry, 'Log Entry'),
    new ModificationModel(ModificationType.Reputation, 'Reputation'),
    new ModificationModel(
      ModificationType.CharacterAdvancement,
      'Character Advancement',
    ),
    new ModificationModel(ModificationType.Promotion, 'Promotion'),
    new ModificationModel(ModificationType.Demotion, 'Demotion'),
    new ModificationModel(ModificationType.GeneralEdit, 'General Edit'),
    new ModificationModel(ModificationType.VersionUpgrade, 'Version Upgrade'),
  ];

  static get instance() {
    if (Modifications.singleton == null) {
      Modifications.singleton = new Modifications();
    }
    return Modifications.singleton;
  }

  getItems() {
    return this.items;
  }
}
