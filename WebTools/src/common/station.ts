import { Department } from '../helpers/department';
import type { Era } from '../helpers/erasEnum';
import type { MissionProfile } from '../helpers/missionProfiles';
import { MissionProfiles } from '../helpers/missionProfiles';
import { PointAllocator } from '../helpers/pointAllocator';
import { StationFrame, StationFrameAppearance } from '../helpers/stationFrame';
import { StationFrameModel } from '../helpers/stationFrameModel';
import { System } from '../helpers/systems';
import {
  TALENT_NAME_ABLATIVE_ARMOUR,
  TALENT_NAME_IMPROVED_HULL_INTEGRITY,
} from '../helpers/talents';
import type { Weapon } from '../helpers/weapons';
import { WeaponType } from '../helpers/weapons';
import type { CharacterType } from './characterType';
import { CharacterTypeModel } from './characterType';
import { Construct, Stereotype } from './construct';
import { SelectedTalent } from './selectedTalent';

export class CustomStationSpaceframeStep {
  public static readonly MIN_SCALE = 3;

  scale: number = CustomStationSpaceframeStep.MIN_SCALE;
  departments: number[] = [];
  systems: number[] = [];
  appearance?: StationFrameAppearance;

  get type() {
    return StationFrame.Custom;
  }

  copy() {
    const result = new CustomStationSpaceframeStep();
    result.scale = this.scale;
    result.appearance = this.appearance;
    result.departments = [...this.departments];
    result.systems = [...this.systems];
    return result;
  }

  static create(scale: number = CustomStationSpaceframeStep.MIN_SCALE) {
    const frameStep = new CustomStationSpaceframeStep();
    frameStep.scale = scale;
    frameStep.systems = PointAllocator.allocatePointsEvenly(
      Station.totalAvailableSystemPointsForScale(frameStep.scale),
    );
    frameStep.departments = PointAllocator.allocatePointsEvenly(
      Station.totalAvailableDepartmentPointsForScale(frameStep.scale),
    );

    return frameStep;
  }
}

export class StandardStationSpaceframeStep {
  readonly type: StationFrame;

  constructor(type: StationFrame) {
    this.type = type;
  }

  get model() {
    return StationFrameModel.getById(this.type);
  }

  get scale() {
    return this.model.scale;
  }

  get systems() {
    return this.model.systems;
  }

  get departments() {
    return this.model.departments;
  }

  get appearance(): StationFrameAppearance | undefined {
    switch (this.type) {
      case StationFrame.InternationalSpaceStation:
        return StationFrameAppearance.InternationalSpaceStation;
      case StationFrame.UnitedEarthStarfleetConstructionSlip:
        return StationFrameAppearance.Drydock;
      case StationFrame.KClassBorderOutpost:
        return StationFrameAppearance.KClassBorderOutpost;
      case StationFrame.RegulaClassMultipurposeStation:
        return StationFrameAppearance.RegulaClassMultipurposeStation;
      case StationFrame.Spacedock:
      case StationFrame.FederationStarbase:
        return StationFrameAppearance.Spacedock;
      case StationFrame.TerakNorType:
        return StationFrameAppearance.TerakNorType;
      case StationFrame.NarendraStationType:
        return StationFrameAppearance.NarendraStationType;
      case StationFrame.FederationSubspaceCommunicationsRelay:
        return StationFrameAppearance.FederationSubspaceCommunicationsRelay;
      case StationFrame.FederationListeningPost:
        return StationFrameAppearance.FederationCommunicationsArray;
      default:
        return StationFrameAppearance.Spacedock;
    }
  }

  copy() {
    return new StandardStationSpaceframeStep(this.type);
  }
}

export class StationMissionProfileStep {
  public readonly type: MissionProfile;
  public talent?: SelectedTalent;

  constructor(missionProfile: MissionProfile) {
    this.type = missionProfile;
  }

  copy() {
    const result = new StationMissionProfileStep(this.type);
    result.talent = this.talent?.copy();
    return result;
  }

  get model() {
    return MissionProfiles.instance.getStationMissionProfileByType(this.type);
  }
}

export class Station extends Construct {
  stationFrameStep: CustomStationSpaceframeStep | StandardStationSpaceframeStep;
  missionProfileStep?: StationMissionProfileStep;
  traits: string[] = [];
  weapons: Weapon[] = [];
  additionalTalents: SelectedTalent[] = [];

  constructor() {
    super(Stereotype.Station);
  }

  public static create(
    type: CharacterType,
    version: number,
    era: Era,
  ): Station {
    const result = new Station();
    result.version = version;
    result.era = era;
    result.type = type;

    result.stationFrameStep = CustomStationSpaceframeStep.create();
    return result;
  }

  public copy() {
    const result = new Station();
    result.type = this.type;
    result.version = this.version;
    result.era = this.era;
    result.name = this.name;
    result.traits = this.traits == null ? [] : [...this.traits];
    result.missionProfileStep = this.missionProfileStep?.copy();
    result.stationFrameStep = this.stationFrameStep?.copy();
    result.weapons = [...this.weapons];
    result.additionalTalents = this.additionalTalents?.map((t) => t.copy());
    return result;
  }

  get systems(): number[] {
    return this.stationFrameStep?.systems ?? [0, 0, 0, 0, 0, 0];
  }

  get departments(): number[] {
    return this.stationFrameStep?.departments ?? [0, 0, 0, 0, 0, 0];
  }

  get resistance() {
    if (this.version === 1) {
      let base = this.scale;
      if (this.hasTalent(TALENT_NAME_ABLATIVE_ARMOUR)) {
        base += 2;
      }
      if (this.hasTalent(TALENT_NAME_IMPROVED_HULL_INTEGRITY)) {
        base += 1;
      }
      return base;
    } else {
      let base = Math.ceil(this.scale / 2);
      const structure = this.systems[System.Structure];
      if (this.hasTalent(TALENT_NAME_ABLATIVE_ARMOUR)) {
        base += 2;
      }
      if (this.hasTalent(TALENT_NAME_IMPROVED_HULL_INTEGRITY)) {
        base += 1;
      }
      if (structure >= 13) {
        return base + 4;
      } else if (structure >= 11) {
        return base + 3;
      } else if (structure >= 9) {
        return base + 2;
      } else if (structure >= 7) {
        return base + 1;
      } else {
        return base;
      }
    }
  }

  get baseTraits(): string[] {
    const type = CharacterTypeModel.getByType(this.type);
    if (type != null) {
      return [type.name + ' Station'];
    } else {
      return [];
    }
  }

  get scale(): number {
    return this.stationFrameStep?.scale ?? 1;
  }

  get crewSupport(): number {
    return this.scale;
  }

  get shields() {
    if (this.departments) {
      let base =
        this.systems[System.Structure] + this.departments[Department.Security];
      if (this.version > 1) {
        base += this.scale;
      }
      if (this.hasTalent('Enhanced Defense Grid')) {
        base += Math.floor(this.scale / 2);
      }
      const advanced = this.talents.filter(
        (t) => t.name === 'Advanced Shields',
      );
      if (advanced.length > 0) {
        base += 5 * advanced.length;
      }
      return base;
    } else {
      return undefined;
    }
  }

  get power() {
    let power = this.systems[System.Engines];
    const bonus = this.talents.filter((t) => t.name === 'Secondary Reactors');
    if (power != null && bonus.length > 0) {
      power += 5 * bonus.length;
    }
    return power;
  }

  get maxSystemValue(): number {
    return this.totalAvailableSystemPoints - 5;
  }

  get maxDepartmentValue(): number {
    return this.scale <= 12 ? 5 : 25;
  }

  get sumSystemPoints(): number {
    return this.systems.reduce((a, b) => a + b, 0);
  }

  get sumDepartmentPoints(): number {
    return this.departments.reduce((a, b) => a + b, 0);
  }

  get totalAvailableSystemPoints(): number {
    return Station.totalAvailableSystemPointsForScale(this.scale);
  }

  get totalAvailableDepartmentPoints(): number {
    return Station.totalAvailableDepartmentPointsForScale(this.scale);
  }

  get isMineLayer(): boolean {
    return false;
  }

  get allTraits() {
    return this.baseTraits.concat(this.traits);
  }

  get allTraitsAsString() {
    return this.allTraits?.join(', ') || '';
  }

  get freeTalentSlots() {
    let slots = Math.floor(this.scale / 2);
    if (this.stationFrameStep?.type === StationFrame.Custom) {
      slots -= 1;
    } else {
      const model = (this.stationFrameStep as StandardStationSpaceframeStep)
        .model;
      slots -= model.talents.length;
    }
    return slots;
  }

  get baseTalents(): SelectedTalent[] {
    const result = [];
    if (this.stationFrameStep instanceof StandardStationSpaceframeStep) {
      const model = this.stationFrameStep.model;
      model.talents.forEach((t) => {
        if (t instanceof SelectedTalent) {
          result.push(t);
        } else {
          result.push(new SelectedTalent(t.name));
        }
      });
    }
    if (this.missionProfileStep?.talent) {
      result.push(this.missionProfileStep.talent);
    }
    return result;
  }

  hasBaseTalent(talentName: string) {
    const talents = this.baseTalents.filter((t) => t.name === talentName);
    return talents.length > 0;
  }

  hasTalent(talentName: string) {
    const talents = this.talents.filter((t) => t.name === talentName);
    return talents.length > 0;
  }

  static totalAvailableSystemPointsForScale(scale: number): number {
    return Math.min(38 + 3 * Math.max(scale - 2), 78);
  }

  static totalAvailableDepartmentPointsForScale(scale: number): number {
    return Math.min(13 + 3 * Math.max(0, scale - 8), 30);
  }

  determineWeapons() {
    const result = [];
    if (this.stationFrameStep instanceof StandardStationSpaceframeStep) {
      const model = this.stationFrameStep.model;
      result.push(...model.weapons);
    }
    const talentWeapons = this.additionalTalents
      .filter((t) => t.weapon != null)
      .map((t) => t.weapon);

    result.push(...talentWeapons);
    result.push(...this.weapons);

    return result;
  }

  get talents(): SelectedTalent[] {
    const result = this.baseTalents;
    result.push(...this.additionalTalents);
    return result;
  }

  getRankForTalent(talentName: string) {
    let rank = 0;
    this.talents
      .filter((t) => t.name === talentName)
      .forEach((t) => {
        if (t.multiple != null) {
          rank += t.multiple;
        } else {
          rank += 1;
        }
      });
    return rank;
  }

  getQualifierForTalent(name: string) {
    return '';
  }

  get rankedTalents(): SelectedTalent[] {
    const talents = this.talents;
    const duplicates = [];
    const result = [];
    talents.forEach((t) => {
      if (t.talentModel.maxRank > 1 && !duplicates.includes(t.name)) {
        const temp = t.copy();
        temp.multiple = this.getRankForTalent(t.name);
        duplicates.push(t.name);
        result.push(temp);
      } else if (t.talentModel.maxRank === 1) {
        result.push(t);
      }
    });
    return result;
  }

  getDistinctTalentNameList() {
    const result = [];
    this.talents.forEach((t) => {
      if (!result.includes(t.name)) {
        result.push(t.name);
      }
    });
    return result;
  }

  getDiceForWeapon(weapon: Weapon) {
    if (weapon.isTractorOrGrappler) {
      let dice = this.scale - 1;

      if (this.hasTalent('High-Power Tractor Beam')) {
        dice += 2;
      }
      return dice;
    } else if (this.version === 1) {
      const security = this.departments[Department.Security];
      let dice = weapon.dice + security;
      if (weapon.scaleApplies) {
        dice += this.scale;
      }
      return dice;
    } else {
      let dice = weapon.dice;

      if (this.systems[System.Weapons] >= 13) {
        dice += 4;
      } else if (this.systems[System.Weapons] >= 11) {
        dice += 3;
      } else if (this.systems[System.Weapons] >= 9) {
        dice += 2;
      } else if (this.systems[System.Weapons] >= 7) {
        dice += 1;
      }

      if (
        weapon.type === WeaponType.TORPEDO &&
        this.hasTalent('Rapid-Fire Torpedo Launcher')
      ) {
        dice += 1;
      }

      if (weapon.scaleApplies) {
        return dice + this.scale;
      } else {
        return dice;
      }
    }
  }

  get dockingPorts() {
    if (this.scale < 9) {
      return 0;
    } else {
      let ports = Math.floor(this.scale / 2);

      if (this.hasTalent('Docking Capacity')) {
        const rank = this.getRankForTalent('Docking Capacity');
        ports = 1 + Math.floor((rank * this.scale) / 2);
      }

      return ports;
    }
  }

  get dockingScale() {
    if (this.scale < 9) {
      return 0;
    } else {
      let scale = Math.floor(this.scale / 2);

      if (this.hasTalent('Docking Capacity')) {
        const rank = this.getRankForTalent('Docking Capacity');
        scale += 2 * rank;
      }

      return scale;
    }
  }
}
