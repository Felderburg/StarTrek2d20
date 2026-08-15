import i18next from 'i18next';
import { CharacterType } from '../common/characterType';
import { SelectedTalent } from '../common/selectedTalent';
import { MissionProfile } from './missionProfiles';
import { StationFrame } from './stationFrame';
import { TalentModel } from './talentModel';
import { TalentsHelper } from './talents';
import StarshipWeaponRegistry, { Weapon } from './weapons';
import { makeKey } from '../common/translationKey';
import { System } from './systems';

export class MissionProfileConfiguration {
  readonly profile: MissionProfile;
  readonly talent?: string;

  constructor(profile: MissionProfile, talent?: string) {
    this.profile = profile;
    this.talent = talent;
  }
}

export class StationFrameModel {
  private static TYPES: StationFrameModel[];

  private static initializeType() {
    if (this.TYPES == null) {
      this.TYPES = [
        new StationFrameModel(
          StationFrame.InternationalSpaceStation,
          CharacterType.Federation,
          [9, 7, 6, 9, 7, 3],
          [1, 1, 1, 3, 4, 3],
          3,
          [],
          [TalentsHelper.getTalent('Advanced Research Facilities')],
          new MissionProfileConfiguration(
            MissionProfile.ResearchStation,
            'Advanced Research Facilities',
          ),
        ),
        new StationFrameModel(
          StationFrame.UnitedEarthStarfleetConstructionSlip,
          CharacterType.Federation,
          [9, 10, 5, 9, 12, 5],
          [1, 2, 1, 5, 2, 2],
          6,
          [
            StarshipWeaponRegistry.getWeaponByName('Phaser Banks', 2),
            StarshipWeaponRegistry.getWeaponByName('Tractor Beam', 2),
          ],
          [
            TalentsHelper.getTalent('Drydock'),
            TalentsHelper.getTalent('Secondary Reactors'),
          ],
          new MissionProfileConfiguration(
            MissionProfile.DrydockShipRepairStation,
            'Drydock',
          ),
        ),
        new StationFrameModel(
          StationFrame.KClassBorderOutpost,
          CharacterType.Federation,
          [8, 6, 8, 10, 9, 9],
          [2, 2, 2, 2, 2, 3],
          6,
          [
            StarshipWeaponRegistry.getWeaponByName('Phaser Banks', 2),
            StarshipWeaponRegistry.getWeaponByName('Photon Torpedoes', 2),
            StarshipWeaponRegistry.getWeaponByName('Tractor Beam', 2),
          ],
          [
            TalentsHelper.getTalent('Fast Targeting Systems'),
            TalentsHelper.getTalent('Improved Shield Recharge'),
            TalentsHelper.getTalent('Secondary Reactors'),
          ],
          new MissionProfileConfiguration(
            MissionProfile.LogisticalAndTacticalSupportStation,
            'Drydock',
          ),
        ),
        new StationFrameModel(
          StationFrame.RegulaClassMultipurposeStation,
          CharacterType.Federation,
          [10, 10, 8, 8, 10, 3],
          [1, 1, 1, 2, 5, 3],
          6,
          [
            StarshipWeaponRegistry.getWeaponByName('Phaser Banks', 2),
            StarshipWeaponRegistry.getWeaponByName('Tractor Beam', 2),
          ],
          [
            TalentsHelper.getTalent('High-Resolution Sensors'),
            TalentsHelper.getTalent('Secondary Reactors'),
          ],
          new MissionProfileConfiguration(
            MissionProfile.ResearchStation,
            'High-Resolution Sensors',
          ),
          new MissionProfileConfiguration(
            MissionProfile.AdministrationAndBureaucracyStation,
          ),
        ),
        new StationFrameModel(
          StationFrame.Spacedock,
          CharacterType.Starfleet,
          [15, 13, 10, 13, 15, 12],
          [6, 4, 4, 6, 5, 5],
          16,
          [
            StarshipWeaponRegistry.getWeaponByName('Phaser Banks', 2),
            StarshipWeaponRegistry.getWeaponByName('Phaser Cannons', 2),
            StarshipWeaponRegistry.getWeaponByName('Phaser Arrays', 2),
            StarshipWeaponRegistry.getWeaponByName('Photon Torpedoes', 2),
            StarshipWeaponRegistry.getWeaponByName('Tractor Beam', 2),
          ],
          [
            TalentsHelper.getTalent('Command Ship'),
            TalentsHelper.getTalent('Drydock'),
            TalentsHelper.getTalent('Docking Capacity'),
            TalentsHelper.getTalent('Enhanced Defense Grid'),
            TalentsHelper.getTalent('Repair Crews'),
            SelectedTalent.createWithMultiple(
              TalentsHelper.getTalent('Secondary Reactors').name,
              2,
            ),
            TalentsHelper.getTalent('Sturdy Construction'),
          ],
          new MissionProfileConfiguration(
            MissionProfile.AdministrationAndBureaucracyStation,
            'Command Ship',
          ),
        ),
        new StationFrameModel(
          StationFrame.FederationStarbase,
          CharacterType.Starfleet,
          [12, 11, 10, 13, 12, 10],
          [5, 2, 3, 5, 5, 5],
          12,
          [
            StarshipWeaponRegistry.getWeaponByName('Phaser Cannons', 2),
            StarshipWeaponRegistry.getWeaponByName('Phaser Arrays', 2),
            StarshipWeaponRegistry.getWeaponByName('Photon Torpedoes', 2),
            StarshipWeaponRegistry.getWeaponByName('Tractor Beam', 2),
          ],
          [
            TalentsHelper.getTalent('Enhanced Defense Grid'),
            TalentsHelper.getTalent('Rugged Design'),
            TalentsHelper.getTalent('Secondary Reactors'),
          ],
        ),
        new StationFrameModel(
          StationFrame.TerakNorType,
          CharacterType.Cardassian,
          [12, 11, 11, 10, 14, 12],
          [5, 3, 4, 5, 4, 4],
          12,
          [
            StarshipWeaponRegistry.getWeaponByName('Phaser Cannons', 2),
            StarshipWeaponRegistry.getWeaponByName('Phaser Arrays', 2),
            StarshipWeaponRegistry.getWeaponByName('Photon Torpedoes', 2),
            StarshipWeaponRegistry.getWeaponByName('Tractor Beam', 2),
          ],
          [
            TalentsHelper.getTalent('Advanced Sickbay'),
            TalentsHelper.getTalent('Docking Capacity'),
            TalentsHelper.getTalent('Firebase'),
            TalentsHelper.getTalent('Rapid-Fire Torpedo Launcher'),
            TalentsHelper.getTalent('Repair Crews'),
            TalentsHelper.getTalent('Sturdy Construction'),
          ],
          new MissionProfileConfiguration(
            MissionProfile.BorderEnforcementStation,
            'Rapid-Fire Torpedo Launcher',
          ),
        ),
        new StationFrameModel(
          StationFrame.NarendraStationType,
          CharacterType.Federation,
          [11, 11, 10, 14, 14, 11],
          [5, 4, 4, 5, 6, 4],
          13,
          [
            StarshipWeaponRegistry.getWeaponByName('Phaser Banks', 2),
            StarshipWeaponRegistry.getWeaponByName('Phaser Arrays', 2),
            StarshipWeaponRegistry.getWeaponByName('Photon Torpedoes', 2),
            StarshipWeaponRegistry.getWeaponByName('Tractor Beam', 2),
          ],
          [
            TalentsHelper.getTalent('Advanced Sickbay'),
            TalentsHelper.getTalent('Docking Capacity'),
            TalentsHelper.getTalent('Firebase'),
            TalentsHelper.getTalent('Rapid-Fire Torpedo Launcher'),
            TalentsHelper.getTalent('Repair Crews'),
            TalentsHelper.getTalent('Sturdy Construction'),
          ],
          new MissionProfileConfiguration(
            MissionProfile.DiplomaticRelationsStation,
          ),
        ),
        new StationFrameModel(
          StationFrame.FederationListeningPost,
          CharacterType.Federation,
          [8, 8, 9, 12, 9, 10],
          [2, 1, 4, 1, 4, 1],
          8,
          [
            StarshipWeaponRegistry.getWeaponByName('Phaser Banks', 2),
            StarshipWeaponRegistry.getWeaponByName('Photon Torpedoes', 2),
            StarshipWeaponRegistry.getWeaponByName('Tractor Beam', 2),
          ],
          [
            TalentsHelper.getTalent('Electronic Warfare Systems'),
            TalentsHelper.getTalent('High-Resolution Sensors'),
            SelectedTalent.createWithSystem(
              TalentsHelper.getTalent('Redundant Systems').name,
              System.Comms,
            ),
          ],
          new MissionProfileConfiguration(
            MissionProfile.BorderEnforcementStation,
            'Electronic Warfare Systems',
          ),
          new MissionProfileConfiguration(
            MissionProfile.IntelligenceSpecialOperationsStation,
            'Electronic Warfare Systems',
          ),
          new MissionProfileConfiguration(
            MissionProfile.PoliticalOperationsStation,
          ),
        ),
        new StationFrameModel(
          StationFrame.FederationSubspaceCommunicationsRelay,
          CharacterType.Federation,
          [14, 11, 7, 8, 6, 4],
          [5, 1, 1, 1, 4, 1],
          6,
          [
            StarshipWeaponRegistry.getWeaponByName('Phaser Arrays', 2),
            StarshipWeaponRegistry.getWeaponByName('Tractor Beam', 2),
          ],
          [
            SelectedTalent.createWithSystem(
              TalentsHelper.getTalent('Redundant Systems').name,
              System.Comms,
            ),
            TalentsHelper.getTalent('Secondary Reactors'),
          ],
          new MissionProfileConfiguration(
            MissionProfile.CommunicationHubStation,
          ),
        ),
      ];
    }
  }

  id: StationFrame;
  type: CharacterType;
  systems: number[];
  departments: number[];
  scale: number;
  weapons: Weapon[];
  talents: (TalentModel | SelectedTalent)[];

  missionProfiles: MissionProfileConfiguration[] = [];

  constructor(
    id: StationFrame,
    type: CharacterType,
    systems: number[],
    departments: number[],
    scale: number,
    weapons: Weapon[],
    talents: (TalentModel | SelectedTalent)[],
    ...missionProfiles: MissionProfileConfiguration[]
  ) {
    this.id = id;
    this.type = type;
    this.systems = systems;
    this.departments = departments;
    this.scale = scale;
    this.weapons = weapons;
    this.talents = talents;
    this.missionProfiles = missionProfiles;
  }

  get localizedName() {
    return i18next.t(makeKey('StationFrame.', StationFrame[this.id]));
  }

  public static getAllTypes() {
    this.initializeType();
    return StationFrameModel.TYPES;
  }

  public static getById(type: StationFrame) {
    this.initializeType();
    const frames = StationFrameModel.TYPES.filter((f) => type === f.id);
    return frames?.length ? frames[0] : undefined;
  }

  public static getByIdName(typeName: string) {
    this.initializeType();
    const frames = StationFrameModel.TYPES.filter(
      (f) => typeName === StationFrame[f.id],
    );
    return frames?.length ? frames[0] : undefined;
  }
}
