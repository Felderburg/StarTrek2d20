import i18next from 'i18next';
import { makeKey } from '../../common/translationKey';
import { CharacterType } from '../../common/characterType';
import { Source } from '../../helpers/sources';

export enum ServiceRecord {
  AgingRelic,
  DependableWorkhorse,
  Legendary,
  HopeShip,
  Prototype,
  SurvivorOfX,

  // Continuing Mission
  GarbageScow,
  LuckyShip,
  TheShipThatWontDie,
  GhostShip,
  HappyShip,

  // Romulan (Continuing Mission STA)
  Disavowed,
  Loyalist,
  Terror,

  // Technical Manual
  AnomalyMagnet,
  BroughtOutOfMothballs,
  LongTermMission,
  MajorRefit,
  StateOfTheArt,
}

export const allServiceRecords = (): ServiceRecord[] => {
  return Object.keys(ServiceRecord)
    .filter((item) => {
      return !isNaN(Number(item));
    })
    .map((item) => Number(item));
};

export class ServiceRecordModel {
  type: ServiceRecord;
  specialRule: string;
  starshipType?: CharacterType;
  source: Source;

  constructor(
    type: ServiceRecord,
    specialRule: string,
    source: Source = Source.Core2ndEdition,
    starshipType?: CharacterType,
  ) {
    this.type = type;
    this.specialRule = specialRule;
    this.starshipType = starshipType;
    this.source = source;
  }

  get name() {
    const key = makeKey('ServiceRecord.', ServiceRecord[this.type]);
    return i18next.t(key);
  }

  get description() {
    const key = makeKey(
      'ServiceRecord.',
      ServiceRecord[this.type],
      '.description',
    );
    return i18next.t(key);
  }
}

export class ServiceRecordList {
  private static _instance: ServiceRecordList;

  readonly records: ServiceRecordModel[] = [
    new ServiceRecordModel(ServiceRecord.AgingRelic, 'Larger Crew'),
    new ServiceRecordModel(ServiceRecord.DependableWorkhorse, 'Reliable'),
    new ServiceRecordModel(ServiceRecord.Legendary, 'Prestigious Posting'),
    new ServiceRecordModel(ServiceRecord.HopeShip, 'Mission of Mercy'),
    new ServiceRecordModel(ServiceRecord.Prototype, 'Experimental Vessel'),
    new ServiceRecordModel(ServiceRecord.SurvivorOfX, 'Ready for Battle'),

    new ServiceRecordModel(
      ServiceRecord.AnomalyMagnet,
      'Encounter the Strange (Service Record)',
      Source.TechnicalManual,
    ),
    new ServiceRecordModel(
      ServiceRecord.BroughtOutOfMothballs,
      'The Last Generation (Service Record)',
      Source.TechnicalManual,
    ),
    new ServiceRecordModel(
      ServiceRecord.LongTermMission,
      'Far from Home (Service Record)',
      Source.TechnicalManual,
    ),
    new ServiceRecordModel(
      ServiceRecord.MajorRefit,
      'Upgraded Systems (Service Record)',
      Source.TechnicalManual,
    ),
    new ServiceRecordModel(
      ServiceRecord.StateOfTheArt,
      'Peak Performance (Service Record)',
      Source.TechnicalManual,
    ),

    new ServiceRecordModel(
      ServiceRecord.GarbageScow,
      'Jury-Rigged (Service Record)',
      Source.ContinuingMissions,
    ),
    new ServiceRecordModel(
      ServiceRecord.LuckyShip,
      'Lucky (Service Record)',
      Source.ContinuingMissions,
    ),
    new ServiceRecordModel(
      ServiceRecord.TheShipThatWontDie,
      'Refuses to Die (Service Record)',
      Source.ContinuingMissions,
    ),
    new ServiceRecordModel(
      ServiceRecord.GhostShip,
      'Premonitions (Service Record)',
      Source.ContinuingMissions,
    ),
    new ServiceRecordModel(
      ServiceRecord.HappyShip,
      'Efficiency (Service Record)',
      Source.ContinuingMissions,
    ),

    new ServiceRecordModel(
      ServiceRecord.Disavowed,
      'Any Knowledge of Your Actions',
      Source.ContinuingMissions,
      CharacterType.Romulan,
    ),
    new ServiceRecordModel(
      ServiceRecord.Loyalist,
      'Once More Unto the Breach',
      Source.ContinuingMissions,
      CharacterType.Romulan,
    ),
    new ServiceRecordModel(
      ServiceRecord.Terror,
      'Dreaded',
      Source.ContinuingMissions,
      CharacterType.Romulan,
    ),
  ];

  static get instance() {
    if (ServiceRecordList._instance == null) {
      ServiceRecordList._instance = new ServiceRecordList();
    }
    return ServiceRecordList._instance;
  }

  getByType(type: ServiceRecord) {
    const result = this.records.filter((s) => s.type === type);
    return result.length > 0 ? result[0] : undefined;
  }
}
