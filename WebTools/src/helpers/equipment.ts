import i18next from 'i18next';
import { makeKey } from '../common/translationKey';

export enum EquipmentType {
  Uniform,
  Clothing,
  ArmouredVest,
  BodyArmour,
  EnvironmentSuit,
  PersonalForceField,

  Communicator,
  Tricorder,
  MedKit,
  EngineeringKit,
  OrionMultiKey,

  UshaanTor,

  Other,
}

export class EquipmentModel {
  readonly type: EquipmentType;
  readonly name: string;
  readonly description?: string;
  readonly protection?: number;

  constructor(
    type: EquipmentType,
    name: string,
    description?: string,
    protection?: number,
  ) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.protection = protection;
  }

  get localizedName() {
    if (this.type === EquipmentType.Other) {
      return this.name;
    } else {
      const key = makeKey('Equipment.', EquipmentType[this.type]);
      const result = i18next.t(key);
      return result === key ? this.name : result;
    }
  }

  get isArmour() {
    return [
      EquipmentType.ArmouredVest,
      EquipmentType.BodyArmour,
      EquipmentType.PersonalForceField,
      EquipmentType.EnvironmentSuit,
    ].includes(this.type);
  }
}

export class EquipmentHelper {
  static singleton: EquipmentHelper;

  static get instance() {
    if (EquipmentHelper.singleton == null) {
      EquipmentHelper.singleton = new EquipmentHelper();
    }
    return EquipmentHelper.singleton;
  }

  public items = [
    new EquipmentModel(EquipmentType.Uniform, 'Uniform'),
    new EquipmentModel(EquipmentType.Clothing, 'Clothing'),
    new EquipmentModel(
      EquipmentType.ArmouredVest,
      'Armoured Vest',
      undefined,
      1,
    ),
    new EquipmentModel(EquipmentType.BodyArmour, 'Body Armour', undefined, 2),
    new EquipmentModel(
      EquipmentType.EnvironmentSuit,
      'Environment Suit',
      undefined,
      1,
    ),
    new EquipmentModel(
      EquipmentType.PersonalForceField,
      'Personal Force Field',
      undefined,
      3,
    ),
    new EquipmentModel(
      EquipmentType.Communicator,
      'Communicator',
      'A communicator is a communications device used by many species for person-to-person, inter-ship communications.',
    ),
    new EquipmentModel(
      EquipmentType.Tricorder,
      'Tricorder',
      'A tricorder is an advanced multi-function hand held computing and scanning device used to gather, analyze, and record data, with many specialized abilities which made it an asset to crews aboard starships and space stations as well as on away missions.',
    ),
    new EquipmentModel(
      EquipmentType.MedKit,
      'MedKit',
      'Medkits, also known as medikits or medical kits, are pouches used by Starfleet medical practitioners and officers that contained medical equipment for landing parties and away teams. ',
    ),
    new EquipmentModel(
      EquipmentType.EngineeringKit,
      'Engineering Kit',
      'An engineering kit is a collection of tools used in engineering.',
    ),
    new EquipmentModel(
      EquipmentType.OrionMultiKey,
      'Orion Multi-Key',
      'The Orion multi-key is a traditional tool of Orion pirates. A short truncheon with a heavy head bearing four extendable prongs, it had a variety of functions including weapon, lock pick, and bottle opener.',
    ),
    new EquipmentModel(EquipmentType.UshaanTor, 'Ushaan-Tor ice pick'),
  ];

  public findByType(type: EquipmentType): EquipmentModel | undefined {
    const results = this.items.filter((e) => e.type === type);
    return results.length > 0 ? results[0] : undefined;
  }

  public findByTypeName(type: string): EquipmentModel | undefined {
    const results = this.items.filter((e) => EquipmentType[e.type] === type);
    return results.length > 0 ? results[0] : undefined;
  }
}
