﻿import i18next from 'i18next';
import { CharacterType } from '../common/characterType';
import { Starship } from '../common/starship';
import { IConstructPrerequisite, SourcePrerequisite } from './prerequisite';
import { Source } from './sources';
import {TalentsHelper, TalentModel} from './talents';
import { makeKey } from '../common/translationKey';
import { allSystems, System } from './systems';

export enum MissionProfile {
    StrategicAndDiplomatic,
    PathfinderAndReconaissance,
    TechnicalTestBed,
    Tactical,
    ScientificAndSurvey,
    CrisisAndEmergencyResponse,
    MultiroleExplorer,
    HouseGuard,
    ProjectEscalante,
    Battlecruiser,
    ReserveFleet,

    CivilianMerchantMarine,
    ColonySupport,
    EntertainmentPleasureShip,
    EspionageIntelligence,
    Flagship,
    LogisticalQuartermaster,
    Patrol,
    Warship
}

export class MissionProfileModel {
    id: MissionProfile;
    private name: string;
    departments: number[];
    systems: System[];
    talents: TalentModel[];
    traits: string;
    notes: string;
    prerequisites: IConstructPrerequisite<Starship>[];
    type: CharacterType;

    constructor(id: MissionProfile, name: string, departments: number[],
        talents: TalentModel[], type?: CharacterType, systems: System[] = [],
        traits: string = "", notes: string = "",
        ...prerequisites: IConstructPrerequisite<Starship>[]) {
        this.id = id;
        this.name = name;
        this.departments = departments;
        this.talents = talents;
        this.notes = notes;
        this.prerequisites = prerequisites;
        this.type = type;
        this.traits = traits;
        this.systems = systems;
    }

    public isPrerequisitesFulfilled(starship) {
        let result = true;
        this.prerequisites.forEach(p => {
            result = result && p.isPrerequisiteFulfilled(starship);
        });
        return result;
    }

    get localizedName() {
        const prefix = this.type === CharacterType.KlingonWarrior ? "MissionProfile.klingon." : "MissionProfile.default.";
        const key = makeKey(prefix, MissionProfile[this.id]);
        let result = i18next.t(key);
        return result === key ? this.name : result;
    }

    get localizedDescription() {
        const prefix = this.type === CharacterType.KlingonWarrior ? "MissionProfile.klingon." : "MissionProfile.default.";
        const key = makeKey(prefix, MissionProfile[this.id], ".description");
        let result = i18next.t(key);
        return result === key ? "" : result;
    }
}

class MissionProfiles {
    private _profiles2e: { [id: number]: MissionProfileModel } = {
        [MissionProfile.Battlecruiser]: new MissionProfileModel(
            MissionProfile.Battlecruiser,
            "Battlecruiser",
            [2, 2, 3, 2, 2, 1],
            [
                TalentsHelper.getTalent("Ablative Armor"),
                TalentsHelper.getTalent("Command Ship"),
                TalentsHelper.getTalent("Fast Targeting Systems"),
                TalentsHelper.getTalent("Improved Damage Control"),
                TalentsHelper.getTalent("Rapid-Fire Torpedo Launcher"),
            ],
            undefined,
            [System.Weapons],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.CrisisAndEmergencyResponse]: new MissionProfileModel(
            MissionProfile.CrisisAndEmergencyResponse,
            "Crisis and Emergency Response",
            [2, 2, 2, 1, 3, 2],
            [
                TalentsHelper.getTalent("Advanced Sickbay"),
                TalentsHelper.getTalent("Emergency Medical Hologram"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Modular Laboratories"),
            ],
            undefined,
            [System.Sensors],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.EspionageIntelligence]: new MissionProfileModel(
            MissionProfile.EspionageIntelligence,
            "Espionage / Intelligence",
            [2, 2, 3, 1, 3, 1],
            [
                TalentsHelper.getTalent("Electronic Warfare Systems"),
                TalentsHelper.getTalent("High-Resolution Sensors"),
                TalentsHelper.getTalent("Improved Reaction Control System"),
                TalentsHelper.getTalent("Slim Sensor Silhouette"),
            ],
            undefined,
            [System.Sensors],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.Flagship]: new MissionProfileModel(
            MissionProfile.Flagship,
            "Flagship",
            [3, 1, 3, 2, 2, 1],
            [
                TalentsHelper.getTalent("Command Ship"),
                TalentsHelper.getTalent("Dedicated Subspace Transceiver Array"),
                TalentsHelper.getTalent("Diplomatic Suites"),
                TalentsHelper.getTalent("Redundant Systems [Communications]"),
            ],
            undefined,
            [System.Comms],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.MultiroleExplorer]: new MissionProfileModel(
            MissionProfile.MultiroleExplorer,
            "Multirole Explorer",
            [2, 2, 2, 2, 2, 2],
            [
                TalentsHelper.getTalent("Improved Hull Integrity"),
                TalentsHelper.getTalent("Improved Power Systems"),
                TalentsHelper.getTalent("Redundant Systems"),
                TalentsHelper.getTalent("Rugged Design"),
                TalentsHelper.getTalent("Secondary Reactors"),
            ],
            undefined,
            [...allSystems()],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.PathfinderAndReconaissance]: new MissionProfileModel(
            MissionProfile.PathfinderAndReconaissance,
            "Pathfinder and Reconnaissance Operations",
            [2, 3, 2, 2, 2, 1],
            [
                TalentsHelper.getTalent("Improved Reaction Control System"),
                TalentsHelper.getTalent("Improved Warp Drive"),
                TalentsHelper.getTalent("Rugged Design"),
                TalentsHelper.getTalent("High-Resolution Sensors"),
            ],
            undefined,
            [System.Engines],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.Patrol]: new MissionProfileModel(
            MissionProfile.Patrol,
            "Patrol",
            [1, 3, 3, 1, 2, 2],
            [
                TalentsHelper.getTalent("Fast Targeting Systems"),
                TalentsHelper.getTalent("High-Resolution Sensors"),
                TalentsHelper.getTalent("Improved Power Systems"),
            ],
            undefined,
            [System.Sensors],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.ScientificAndSurvey]: new MissionProfileModel(
            MissionProfile.ScientificAndSurvey,
            "Scientific and Survey Operations",
            [2, 1, 1, 3, 3, 2],
            [
                TalentsHelper.getTalent("Advanced Research Facilities"),
                TalentsHelper.getTalent("Advanced Sensor Suites"),
                TalentsHelper.getTalent("High-Resolution Sensors"),
                TalentsHelper.getTalent("Modular Laboratories"),
            ],
            undefined,
            [System.Computer],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.StrategicAndDiplomatic]: new MissionProfileModel(
            MissionProfile.StrategicAndDiplomatic,
            "Strategic and Diplomatic Operations",
            [2, 2, 2, 1, 3, 2],
            [
                TalentsHelper.getTalent("Command Ship"),
                TalentsHelper.getTalent("Diplomatic Suites"),
                TalentsHelper.getTalent("Electronic Warfare Systems"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
            ],
            undefined,
            [System.Comms],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.Tactical]: new MissionProfileModel(
            MissionProfile.Tactical,
            "Tactical Operations",
            [2, 2, 3, 2, 1, 2],
            [
                TalentsHelper.getTalent("Ablative Armor"),
                TalentsHelper.getTalent("Fast Targeting Systems"),
                TalentsHelper.getTalent("Improved Damage Control"),
                TalentsHelper.getTalent("Improved Impulse Drive"),
            ],
            undefined,
            [System.Weapons],
            undefined,
            undefined,
            new SourcePrerequisite(Source.Core2ndEdition)),
        [MissionProfile.CivilianMerchantMarine]: new MissionProfileModel(
            MissionProfile.CivilianMerchantMarine,
            "Civilian Merchant Marines",
            [1, 2, 2, 3, 1, 2],
            [
                TalentsHelper.getTalent("Backup EPS Conduits"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Improved Power Systems"),
                TalentsHelper.getTalent("Rugged Design"),
            ],
            undefined,
            [System.Structure],
            undefined,
            undefined,
            new SourcePrerequisite(Source.GmToolkit2e)),
        [MissionProfile.ColonySupport]: new MissionProfileModel(
            MissionProfile.ColonySupport,
            "Colony Support",
            [2, 1, 2, 2, 2, 3],
            [
                TalentsHelper.getTalent("Advanced Sickbay"),
                TalentsHelper.getTalent("Advanced Transporters"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("High-Power Tractor Beam"),
            ],
            undefined,
            [System.Engines],
            undefined,
            undefined,
            new SourcePrerequisite(Source.GmToolkit2e)),
        [MissionProfile.LogisticalQuartermaster]: new MissionProfileModel(
            MissionProfile.LogisticalQuartermaster,
            "Logistical/Quartermaster",
            [3, 2, 2, 3, 1, 1],
            [
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Improved Warp Drive"),
                TalentsHelper.getTalent("Rugged Design"),
            ],
            undefined,
            [System.Engines],
            undefined,
            undefined,
            new SourcePrerequisite(Source.GmToolkit2e)),
        [MissionProfile.ReserveFleet]: new MissionProfileModel(
            MissionProfile.ReserveFleet,
            "Reserve Fleet",
            [1, 2, 3, 3, 1, 2],
            [
                TalentsHelper.getTalent("Advanced Sickbay"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Improved Hull Integrity"),
                TalentsHelper.getTalent("Secondary Reactors"),
            ],
            undefined,
            [System.Structure],
            undefined,
            undefined,
            new SourcePrerequisite(Source.GmToolkit2e)),
        [MissionProfile.TechnicalTestBed]: new MissionProfileModel(
            MissionProfile.TechnicalTestBed,
            "Technical Testbed",
            [1, 2, 2, 3, 2, 2],
            [
                TalentsHelper.getTalent("Advanced Shields"),
                TalentsHelper.getTalent("Improved Impulse Drive"),
                TalentsHelper.getTalent("Improved Power Systems"),
                TalentsHelper.getTalent("Improved Warp Drive"),
            ],
            undefined,
            [System.Engines],
            undefined,
            undefined,
            new SourcePrerequisite(Source.GmToolkit2e)),

    }



    private _profiles: { [id: number]: MissionProfileModel } = {
        [MissionProfile.StrategicAndDiplomatic]: new MissionProfileModel(
            MissionProfile.StrategicAndDiplomatic,
            "Strategic and Diplomatic Operations",
            [3, 1, 2, 2, 2, 2],
            [
                TalentsHelper.getTalent("Command Ship"),
                TalentsHelper.getTalent("Diplomatic Suites"),
                TalentsHelper.getTalent("Electronic Warfare Systems"),
                TalentsHelper.getTalent("Extensive Shuttlebays")
            ]),
        [MissionProfile.PathfinderAndReconaissance]: new MissionProfileModel(
            MissionProfile.PathfinderAndReconaissance,
            "Pathfinder and Reconnaissance Operations",
            [2, 3, 2, 2, 2, 1],
            [
                TalentsHelper.getTalent("Improved Reaction Control System"),
                TalentsHelper.getTalent("Improved Warp Drive"),
                TalentsHelper.getTalent("Rugged Design")
            ]),
        [MissionProfile.TechnicalTestBed]: new MissionProfileModel(
            MissionProfile.TechnicalTestBed,
            "Technical Test-Bed",
            [1, 2, 2, 3, 2, 2],
            [
                TalentsHelper.getTalent("Additional Propulsion System"),
                TalentsHelper.getTalent("Advanced Shields"),
                TalentsHelper.getTalent("Backup EPS Conduits"),
                TalentsHelper.getTalent("High-Resolution Sensors"),
                TalentsHelper.getTalent("Improved Power Systems"),
                TalentsHelper.getTalent("Improved Warp Drive")
            ]),
        [MissionProfile.Tactical]: new MissionProfileModel(
            MissionProfile.Tactical,
            "Tactical Operations",
            [2, 2, 3, 2, 1, 2],
            [
                TalentsHelper.getTalent("Ablative Armor"),
                TalentsHelper.getTalent("Fast Targeting Systems"),
                TalentsHelper.getTalent("Improved Damage Control"),
                TalentsHelper.getTalent("Quantum Torpedoes"),
                TalentsHelper.getTalent("Improved Impulse Drive"),
                TalentsHelper.getTalent("Expanded Munitions")
            ]),
        [MissionProfile.ScientificAndSurvey]: new MissionProfileModel(
            MissionProfile.ScientificAndSurvey,
            "Scientific and Survey Operations",
            [2, 2, 1, 2, 3, 2],
            [
                TalentsHelper.getTalent("Advanced Research Facilities"),
                TalentsHelper.getTalent("Advanced Sensor Suites"),
                TalentsHelper.getTalent("High-Resolution Sensors"),
                TalentsHelper.getTalent("Modular Laboratories")
            ]),
        [MissionProfile.CrisisAndEmergencyResponse]: new MissionProfileModel(
            MissionProfile.CrisisAndEmergencyResponse,
            "Crisis and Emergency Response",
            [2, 2, 2, 1, 2, 3],
            [
                TalentsHelper.getTalent("Advanced Sickbay"),
                TalentsHelper.getTalent("Emergency Medical Hologram"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Modular Laboratories")
            ]),
        [MissionProfile.MultiroleExplorer]: new MissionProfileModel(
            MissionProfile.MultiroleExplorer,
            "Multirole Explorer",
            [2, 2, 2, 2, 2, 2],
            [
                TalentsHelper.getTalent("Improved Hull Integrity"),
                TalentsHelper.getTalent("Improved Power Systems"),
                TalentsHelper.getTalent("Rugged Design"),
                TalentsHelper.getTalent("Redundant Systems"),
                TalentsHelper.getTalent("Secondary Reactors")
            ]),
        [MissionProfile.ProjectEscalante]: new MissionProfileModel(
            MissionProfile.ProjectEscalante,
            "Project Escalante",
            [3, 1, 1, 2, 3, 2],
            [
                TalentsHelper.getTalent("Expanded Connectivity")
            ],
            undefined,
            [],
            "Expanded sensor footprint, Prototype",
            "Used in the adventure \"Plague of Arias\"",
            new SourcePrerequisite(Source.TheseAreTheVoyages)),
        [MissionProfile.Battlecruiser]: new MissionProfileModel(
            MissionProfile.Battlecruiser,
            "Battlecruiser",
            [2, 2, 3, 2, 2, 1],
            [
                TalentsHelper.getTalent("Ablative Armor"),
                TalentsHelper.getTalent("Command Ship"),
                TalentsHelper.getTalent("Fast Targeting Systems"),
                TalentsHelper.getTalent("Improved Damage Control"),
                TalentsHelper.getTalent("Rapid-Fire Torpedo Launcher"),
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.DiscoveryCampaign, Source.UtopiaPlanitia)),
        [MissionProfile.ReserveFleet]: new MissionProfileModel(
            MissionProfile.ReserveFleet,
            "Reserve Fleet",
            [1, 2, 1, 3, 2, 3],
            [
                TalentsHelper.getTalent("Advanced Sickbay"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Improved Hull Integrity"),
                TalentsHelper.getTalent("Secondary Reactors"),
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.DiscoveryCampaign, Source.UtopiaPlanitia)),
        [MissionProfile.CivilianMerchantMarine]: new MissionProfileModel(
            MissionProfile.CivilianMerchantMarine,
            "Civilian Merchant Marine",
            [1, 2, 1, 3, 1, 3],
            [
                TalentsHelper.getTalent("Backup EPS Conduits"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Improved Power Systems"),
                TalentsHelper.getTalent("Rugged Design"),
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.UtopiaPlanitia)),
        [MissionProfile.ColonySupport]: new MissionProfileModel(
            MissionProfile.ColonySupport,
            "Colony Support",
            [2, 1, 1, 2, 3, 3],
            [
                TalentsHelper.getTalent("Advanced Sickbay"),
                TalentsHelper.getTalent("Advanced Transporters"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("High-Power Tractor Beam"),
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.UtopiaPlanitia)),
        [MissionProfile.EntertainmentPleasureShip]: new MissionProfileModel(
            MissionProfile.EntertainmentPleasureShip,
            "Entertainment/Pleasure Ship",
            [3, 2, 2, 1, 1, 3],
            [
                TalentsHelper.getTalent("Advanced Sickbay"),
                TalentsHelper.getTalent("Diplomatic Suites"),
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.UtopiaPlanitia)),
        [MissionProfile.EspionageIntelligence]: new MissionProfileModel(
            MissionProfile.EspionageIntelligence,
            "Espionage/Intelligence",
            [2, 2, 3, 1, 3, 1],
            [
                TalentsHelper.getTalent("Electronic Warfare Systems"),
                TalentsHelper.getTalent("High-Resolution Sensors"),
                TalentsHelper.getTalent("Improved Reaction Control System"),
                TalentsHelper.getTalent("Slim Sensor Silhouette"),
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.UtopiaPlanitia)),
        [MissionProfile.Flagship]: new MissionProfileModel(
            MissionProfile.Flagship,
            "Flagship",
            [3, 1, 3, 2, 2, 1],
            [
                TalentsHelper.getTalent("Command Ship"),
                TalentsHelper.getTalent("Dedicated Subspace Transceiver Array"),
                TalentsHelper.getTalent("Diplomatic Suites"),
                TalentsHelper.getTalent("Redundant Systems [Communications]"),
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.UtopiaPlanitia)),
        [MissionProfile.LogisticalQuartermaster]: new MissionProfileModel(
            MissionProfile.LogisticalQuartermaster,
            "Logistical/Quartermaster",
            [3, 2, 1, 3, 1, 2],
            [
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Improved Warp Drive"),
                TalentsHelper.getTalent("Rugged Design"),
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.UtopiaPlanitia)),
        [MissionProfile.Patrol]: new MissionProfileModel(
            MissionProfile.Patrol,
            "Patrol",
            [1, 3, 3, 1, 2, 2],
            [
                TalentsHelper.getTalent("Fast Targeting Systems"),
                TalentsHelper.getTalent("High-Resolution Sensors"),
                TalentsHelper.getTalent("Improved Power Systems"),
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.UtopiaPlanitia)),
        [MissionProfile.Warship]: new MissionProfileModel(
            MissionProfile.Warship,
            "Warship",
            [2, 2, 3, 3, 1, 1],
            [
                TalentsHelper.getTalent("Ablative Armor"),
                TalentsHelper.getTalent("Fast Targeting Systems"),
                TalentsHelper.getTalent("Improved Damage Control"),
                TalentsHelper.getTalent("Expanded Munitions"),
                TalentsHelper.getTalent("Rapid-Fire Torpedo Launcher")
            ],
            undefined,
            [],
            "",
            "",
            new SourcePrerequisite(Source.UtopiaPlanitia)),

    };

    private _klingonProfiles: { [id: number]: MissionProfileModel } = {
        [MissionProfile.CrisisAndEmergencyResponse]: new MissionProfileModel(
            MissionProfile.CrisisAndEmergencyResponse,
            "Crisis Response and Interception",
            [2, 2, 2, 3, 1, 2],
            [
                TalentsHelper.getTalent("Advanced Medical Ward"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Improved Impulse Drive"),
                TalentsHelper.getTalent("Improved Warp Drive")
            ],
            CharacterType.KlingonWarrior),
        [MissionProfile.MultiroleExplorer]: new MissionProfileModel(
            MissionProfile.MultiroleExplorer,
            "Multirole Battle Cruiser",
            [2, 2, 2, 2, 2, 2],
            [
                TalentsHelper.getTalent("Improved Damage Control"),
                TalentsHelper.getTalent("Improved Hull Integrity"),
                TalentsHelper.getTalent("Redundant Systems"),
                TalentsHelper.getTalent("Secondary Reactors")
            ],
            CharacterType.KlingonWarrior),
        [MissionProfile.PathfinderAndReconaissance]: new MissionProfileModel(
            MissionProfile.PathfinderAndReconaissance,
            "Intelligence and Reconnaissance Operations",
            [2, 2, 2, 2, 3, 1],
            [
                TalentsHelper.getTalent("Electronic Warfare Systems"),
                TalentsHelper.getTalent("Improved Reaction Control System"),
                TalentsHelper.getTalent("Improved Warp Drive"),
                TalentsHelper.getTalent("High-Resolution Sensors")
            ],
            CharacterType.KlingonWarrior),
        [MissionProfile.ScientificAndSurvey]: new MissionProfileModel(
            MissionProfile.ScientificAndSurvey,
            "Scientific and Survey Operations",
            [2, 1, 2, 2, 3, 2],
            [
                TalentsHelper.getTalent("Advanced Medical Ward"),
                TalentsHelper.getTalent("Advanced Research Facilities"),
                TalentsHelper.getTalent("Advanced Sensor Suites"),
                TalentsHelper.getTalent("Modular Laboratories")
            ],
            CharacterType.KlingonWarrior),
        [MissionProfile.StrategicAndDiplomatic]: new MissionProfileModel(
            MissionProfile.StrategicAndDiplomatic,
            "Strategic and Diplomatic Operations",
            [3, 1, 2, 2, 2, 2],
            [
                TalentsHelper.getTalent("Command Ship"),
                TalentsHelper.getTalent("Extensive Shuttlebays"),
                TalentsHelper.getTalent("Rugged Design")
            ],
            CharacterType.KlingonWarrior),
        [MissionProfile.Warship]: new MissionProfileModel(
            MissionProfile.Warship,
            "Warship",
            [2, 2, 3, 3, 1, 1],
            [
                TalentsHelper.getTalent("Ablative Armor"),
                TalentsHelper.getTalent("Fast Targeting Systems"),
                TalentsHelper.getTalent("Improved Damage Control"),
                TalentsHelper.getTalent("Quantum Torpedoes"),
                TalentsHelper.getTalent("Rapid-Fire Torpedo Launcher"),
                TalentsHelper.getTalent("Expanded Munitions")
            ],
            CharacterType.KlingonWarrior),
        [MissionProfile.HouseGuard]: new MissionProfileModel(
            MissionProfile.HouseGuard,
            "House Guard",
            [2, 2, 2, 3, 2, 1],
            [
                TalentsHelper.getTalent("Backup EPS Conduits"),
                TalentsHelper.getTalent("Improved Power Systems"),
                TalentsHelper.getTalent("Redundant Systems"),
                TalentsHelper.getTalent("Rugged Design")
            ],
            CharacterType.KlingonWarrior),
            //[MissionProfile.StrategicAndDiplomatic]: new MissionProfileModel(
        //    "",
        //    [],
        //    []),
    };

    getMissionProfiles(starship: Starship) {
        let profiles: MissionProfileModel[] = [];
        let list = this._profiles2e;
        if (starship.version === 1) {
            list = (starship.type === CharacterType.KlingonWarrior && starship.version === 1)
                ? this._klingonProfiles
                : this._profiles;
        } else if (starship.type === CharacterType.Civilian) {
            list = {
                [MissionProfile.CrisisAndEmergencyResponse]: this._profiles2e[MissionProfile.CrisisAndEmergencyResponse],
                [MissionProfile.EntertainmentPleasureShip]: this._profiles2e[MissionProfile.EntertainmentPleasureShip],
                [MissionProfile.CivilianMerchantMarine]: this._profiles2e[MissionProfile.CivilianMerchantMarine],
                [MissionProfile.ColonySupport]: this._profiles2e[MissionProfile.ColonySupport],
                [MissionProfile.TechnicalTestBed]: this._profiles2e[MissionProfile.TechnicalTestBed],
                [MissionProfile.ScientificAndSurvey]: this._profiles2e[MissionProfile.ScientificAndSurvey],
            }
        }
        for (let profile of Object.values(list)) {
            if (profile && profile.isPrerequisitesFulfilled(starship)) {
                profiles.push(profile);
            }
        };

        profiles.sort((p1, p2) => {
            return p1.localizedName.localeCompare(p2.localizedName);
        })

        return profiles;
    }

    getMissionProfileByName(profile: string, type: CharacterType, version: number) {
        let list = this._profiles2e;
        if (version === 1) {
            list = (type === CharacterType.KlingonWarrior && version === 1)
                ? this._klingonProfiles
                : this._profiles;
        }
        let result = null;
        for (let id in list) {
            if (profile === MissionProfile[id]) {
                result = list[id];
                break;
            }
        }
        return result;
    }
}

export const MissionProfileHelper = new MissionProfiles();