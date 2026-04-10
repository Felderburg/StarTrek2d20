import i18next from "i18next";
import { Department } from "../helpers/department";
import { MissionPodModel } from "../helpers/missionPods";
import { MissionProfileModel } from "../helpers/missionProfiles";
import { SpaceframeModel } from "../helpers/spaceframeModel";
import { allSystems, System } from "../helpers/systems";
import { TALENT_NAME_ABLATIVE_ARMOUR, TALENT_NAME_ABUNDANT_PERSONNEL, TALENT_NAME_IMPROVED_HULL_INTEGRITY, TALENT_NAME_MINELAYER, TALENT_NAME_MISSION_POD, TalentModel } from "../helpers/talents";
import StarshipWeaponRegistry, { Weapon, WeaponType } from "../helpers/weapons";
import { CharacterType } from "./characterType";
import { Construct, Stereotype } from "./construct";
import { makeKey } from "./translationKey";
import { Era } from "../helpers/eras";
import { IWeaponDiceProvider } from "./iWeaponDiceProvider";
import { ServiceRecord, ServiceRecordModel } from "../starship/model/serviceRecord";
import { DepartmentsHelper } from "../helpers/department";
import { SelectedTalent } from "./selectedTalent";
import { StarshipAdvancementChoice } from "./starshipAdvancementChoice";
import { SpaceframeVariant } from "../helpers/spaceframeVariant";
import { SpaceframeAppearance } from "../helpers/spaceframeAppearance";
import { BuildPoints } from "../starship/model/buildPoints";

export class SimpleStats {
    departments: number[];
    systems: number[];
    className: string = "";
    scale: number = 0;
    weapons: Weapon[];

    constructor() {
        this.departments = [0, 0, 0, 0, 0, 0];
        this.systems = [0, 0, 0, 0, 0, 0];
    }
}

export enum ShipBuildType {
    Pod, Shuttlecraft, Runabout, Starship
}

export const refitCalculator = (starship: Starship) => {
    if (starship.buildType === ShipBuildType.Starship && starship?.serviceYear && starship?.spaceframeModel?.serviceYearForRefitCalculation) {
        if (starship.serviceYear >= 2400 && starship.spaceframeModel.serviceYearForRefitCalculation >= 2400) {
            return Math.max(0, Math.floor((starship.serviceYear - starship.spaceframeModel.serviceYearForRefitCalculation) / 50));
        } else if (starship.serviceYear < 2400 && starship.spaceframeModel.serviceYearForRefitCalculation < 2400) {
            return Math.max(0, Math.floor((starship.serviceYear - starship.spaceframeModel.serviceYearForRefitCalculation) / 10));
        } else if (starship.serviceYear > starship.spaceframeModel.serviceYearForRefitCalculation) {
            let remainder = starship.spaceframeModel.serviceYearForRefitCalculation % 10;
            let inflectionYear = 2400 + (remainder === 0 ? 0 : (remainder - 10));
            let result = Math.floor((starship.serviceYear - inflectionYear) / 50)
                + Math.floor((inflectionYear - starship.spaceframeModel.serviceYearForRefitCalculation) / 10);
            return Math.max(0, result);
        } else {
            return 0;
        }

    } else {
        return 0;
    }
}

export class MissionProfileStep {
    readonly type: MissionProfileModel;
    system: System;
    talent?: SelectedTalent;

    constructor(type: MissionProfileModel) {
        this.type = type;
    }

    copy() {
        let result = new MissionProfileStep(this.type);
        result.system = this.system;
        result.talent = this.talent?.copy();
        return result;
    }
}

export class SpaceframeStep {
    readonly model: SpaceframeModel;
    talents: SelectedTalent[] = [];
    variant?: SpaceframeVariant;
    appearance?: SpaceframeAppearance;

    constructor(model: SpaceframeModel) {
        this.model = model;
    }

    copy() {
        const result = new SpaceframeStep(this.model);
        result.talents = this.talents.map(t => t.copy());
        result.variant = this.variant;
        result.appearance = this.appearance;
        return result;
    }
}

export class ServiceRecordStep {
    readonly type: ServiceRecordModel;
    specialRule?: TalentModel;
    selection: string;
    system?: System;
    removedTalent?: string;
    selectedTalent?: SelectedTalent;

    constructor(type: ServiceRecordModel) {
        this.type = type;
    }

    get trait() {
        const key = makeKey("ServiceRecord.", ServiceRecord[this.type.type], ".trait");
        let result = i18next.t(key, { "X": this.selection?.length ? this.selection : "X" });
        if (result === key) {
            return this.type.name;
        } else {
            return result;
        }
    }

    copy() {
        let result = new ServiceRecordStep(this.type);
        result.specialRule = this.specialRule;
        result.selection = this.selection;
        result.system = this.system;
        result.removedTalent = this.removedTalent;
        result.selectedTalent = this.selectedTalent?.copy();
        return result;
    }
}

export class ShipBuildTypeModel {
    readonly name: string;
    readonly type: ShipBuildType;
    readonly scale: number;

    private static TYPES: ShipBuildTypeModel[] = [
        new ShipBuildTypeModel("Pod", ShipBuildType.Pod, 1),
        new ShipBuildTypeModel("Shuttlecraft", ShipBuildType.Shuttlecraft, 1),
        new ShipBuildTypeModel("Runabout", ShipBuildType.Runabout, 2),
        new ShipBuildTypeModel("Starship", ShipBuildType.Starship)
    ];

    constructor(name: string, type: ShipBuildType, scale: number = 0) {
        this.name = name;
        this.type = type;
        this.scale = scale;
    }

    static allTypes() {
        return ShipBuildTypeModel.TYPES;
    }

    static getByType(type: ShipBuildType) {
        return ShipBuildTypeModel.TYPES[type];
    }
    get localizedName() {
        return i18next.t(makeKey("ShipBuildType.", ShipBuildType[this.type], ".name"));
    }
}

export class StarshipAdvancementStep {
    choice: StarshipAdvancementChoice;
    value: System|Department|SelectedTalent;
    removeValue: System|Department|SelectedTalent;

    copy() {
        let result = new StarshipAdvancementStep();
        result.choice = this.choice;
        if (this.value instanceof SelectedTalent) {
            result.value = (this.value as SelectedTalent).copy();
        } else {
            result.value = this.value;
        }
        if (this.removeValue instanceof SelectedTalent) {
            result.removeValue = (this.removeValue as SelectedTalent).copy();
        } else {
            result.removeValue = this.removeValue;
        }
        return result;
    }
}

export class Starship extends Construct implements IWeaponDiceProvider {
    stereotype: Stereotype = Stereotype.Starship;
    buildType: ShipBuildType = ShipBuildType.Starship;
    registry: string = "";
    traits: string = "";
    serviceYear?: number;
    spaceframeStep?: SpaceframeStep;
    missionPodModel?: MissionPodModel;
    missionProfileStep?: MissionProfileStep;
    additionalTalents: SelectedTalent[] = [];
    refits: System[] = [];
    simpleStats: SimpleStats;
    additionalWeapons: Weapon[] = [];
    serviceRecordStep?: ServiceRecordStep;
    advancementSteps: StarshipAdvancementStep[] = [];

    constructor() {
        super(Stereotype.Starship);
        this.name = "";
    }

    static createSoloStarship(era: Era = Era.NextGeneration) {
        const result = new Starship();
        result.stereotype = Stereotype.SoloStarship;
        result.era = era;
        return result;
    }

    static createStandardStarship(era: Era = Era.NextGeneration, type: CharacterType = CharacterType.Starfleet, version: number = 1) {
        const result = new Starship();
        result.stereotype = Stereotype.Starship;
        result.type = type;
        result.era = era;
        result.version = version;
        return result;
    }

    get spaceframeModel() {
        return this.spaceframeStep?.model;
    }

    set spaceframeModel(spaceframe: SpaceframeModel) {
        let original = this.spaceframeStep;
        this.spaceframeStep = new SpaceframeStep(spaceframe);
        if (!spaceframe?.isMissionPodAvailable) {
            this.missionPodModel = undefined;
        }
        if (original?.model?.isCustom && spaceframe.isCustom && original?.appearance != null) {
            this.spaceframeStep.appearance = original.appearance;
        }
    }

    get isSmallCraft() {
        return this.buildType === ShipBuildType.Pod || this.buildType === ShipBuildType.Shuttlecraft || this.buildType === ShipBuildType.Runabout;
    }

    get className() {
        if (this.spaceframeModel != null) {
            return this.spaceframeModel.name;
        } else if (this.simpleStats != null) {
            return this.simpleStats.className;
        } else {
            return undefined;
        }
    }

    get localizedClassName() {
        if (this.spaceframeModel != null) {
            return this.spaceframeModel.localizedName;
        } else {
            return this.className;
        }
    }

    get power() {
        let power = this.getSystemValue(System.Engines);
        if (this.buildType !== ShipBuildType.Starship) {
            power = Math.ceil(power / 2);
        }
        let bonus = this.talents.filter(t => t.name === "Secondary Reactors");
        if (power != null && bonus.length > 0) {
            power += (5 * bonus.length);
        }
        return power;
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
            let structure = this.systems[System.Structure];
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

    get defaultTraits() {
        let trait = [];
        if (this.type === CharacterType.KlingonWarrior && this.buildType === ShipBuildType.Starship) {
            trait.push("Klingon Starship");
        } else if (this.type === CharacterType.Starfleet && this.buildType === ShipBuildType.Starship) {
            trait.push("Federation Starship");
        } else if (this.buildType !== ShipBuildType.Starship) {
            trait.push("Small Craft");
        }

        if (this.spaceframeModel) {
            this.spaceframeModel.additionalTraits.forEach(t => {
                if (trait.indexOf(t) < 0) {
                    trait.push(t);
                }
            });
        }
        if (this.version > 1 && this.localizedClassName?.length) {
            trait.push(this.localizedClassName);
        }
        if (this.serviceRecordStep) {
            trait.push(this.serviceRecordStep.trait);
        }
        if (this.missionProfileStep?.type?.traits?.length) {
            this.missionProfileStep.type.traits.split(", ").forEach(t => trait.push(t.trim()));
        }
        return trait;
    }

    get isMineLayer() {
        return this.version === 1 || this.hasTalent(TALENT_NAME_MINELAYER);
    }

    get numberOfTalents() {
        let result = this.scale;
        if (this.hasTalent("Efficiency")) {
            result = 5;
        }
        return result;
    }

    get freeTalentSlots() {
        if (this.stereotype === Stereotype.SoloStarship) {
            return this.numberOfTalents;
        } else if (this.buildType === ShipBuildType.Starship) {
            let numTalents = 0;

            if (this.spaceframeModel !== undefined) {
                numTalents = 1; // count the mission profile talent

                this.spaceframeModel.talentsEffectiveForDate(this.serviceYear).forEach(t => numTalents += (t.talentModel.specialRule ? 0 : (t.multiple ?? 1)));

                if (this.spaceframeModel.isMissionPodAvailable) {
                    numTalents += 2; // think about this in the context of the Fleet Carrier pod, which seems to have 3 talents
                }
            }

            return Math.max(0, this.numberOfTalents - numTalents);
        } else if (this.buildType === ShipBuildType.Pod) {
            return 0;
        } else if (this.buildType === ShipBuildType.Shuttlecraft) {
            return 1;
        } else {
            return 2;
        }
    }

    get crewSupport() {
        if (this.buildType === ShipBuildType.Starship) {
            let result = this.scale;
            if (this.hasTalent("Extensive Automation")) {
                result = Math.ceil(result / 2);
            }
            if (this.hasTalent("Larger Crew")) {
                result += 1;
            }
            if (this.hasTalent(TALENT_NAME_ABUNDANT_PERSONNEL)) {
                result *= 2;
            }
            if (this.hasTalent("Far from Home (Service Record)")) {
                result -= 1;
            }

            return result;
        } else {
            return 0;
        }
    }

    get smallCraftReadiness() {
        let result = this.scale - 1;
        if (this.hasTalent("Extensive Shuttlebays")) {
            result += (this.scale - 1);
        }
        if (this.hasTalent("Far from Home (Service Record)")) {
            result -= 1;
        }
        return result;
    }

    get numberOfRefits() {
        return refitCalculator(this) + (this.hasTalent("Experimental Vessel") ? 2 : 0);
    }

    getAllTraits() {
        let trait = this.defaultTraits.join(", ");
        if (this.traits) {
            if (trait.length > 0) {
                trait += ", ";
            }
            trait += this.traits;
        }
        return trait;
    }

    get allTraitsAsArray() {
        let traits = this.getAllTraits();
        return traits.split(',').map(t => t.trim()).filter(t => t?.length);
    }

    getBaseSystem(system: System) {
        let result = 0;
        if (this.spaceframeModel) {
            if (this.stereotype === Stereotype.SoloStarship) {
                result += this.spaceframeModel.soloStats?.systems[system];
            } else {
                result += this.spaceframeModel.systems[system];
                if (this.missionProfileStep?.system != null) {
                    result += (this.missionProfileStep?.system === system) ? 1 : 0;
                }
                if (this.spaceframeModel.isMissionPodAvailable && this.missionPodModel) {
                    result += this.missionPodModel.systems[system];
                }
            }
        } else if (this.simpleStats != null) {
            result = this.simpleStats.systems[system];
        }
        return result;
    }
    getSystemValue(system: System) {
        return this.systems[system];
    }

    getDistinctTalentNameList() {
        let result = [];
        this.talents.forEach(t => {
            if (result.indexOf(t.name) < 0) {
                result.push(t.name);
            }
        });
        return result
    }

    getRankForTalent(talentName: string) {
        let rank = 0;
        this.talents
            .filter(t => t.name === talentName)
            .forEach(t => {
                if (t.multiple != null) {
                    rank += t.multiple;
                } else {
                    rank += 1;
                }
            });
        return rank;
    }

    getQualifierForTalent(talentName: string) {
        if (talentName === TALENT_NAME_MISSION_POD && this.missionPodModel != null) {
            return this.missionPodModel.localizedName;
        } else {
            let shortenedList = this.talents.filter(t => t.name === talentName);
            return shortenedList.length > 0 ? shortenedList[0].additionalInformation : undefined;
        }
    }

    get talentsWithoutAdditional() {
        let result: SelectedTalent[] = [];
        if (this.spaceframeModel && this.stereotype !== Stereotype.SoloStarship) {
            this.spaceframeModel.talentsEffectiveForDate(this.serviceYear).forEach(t => {
                let overrides = this.spaceframeStep.talents.filter(st => st.name === t.name);
                if (overrides?.length) {
                    result.push(overrides[0]);
                } else {
                    result.push(t);
                }

            });
        }

        if (this.serviceRecordStep?.removedTalent != null) {
            // we should think about multiples
            result = result.filter(t => t.name !== this.serviceRecordStep?.removedTalent);
        }

        if (this.missionProfileStep?.talent && this.stereotype !== Stereotype.SoloStarship) {
            result.push(this.missionProfileStep.talent);
        }

        if (this.missionPodModel && this.stereotype !== Stereotype.SoloStarship) {
            this.missionPodModel.talents.forEach(t => {
                if (t instanceof SelectedTalent) {
                    result.push(t as SelectedTalent);
                } else {
                    result.push(new SelectedTalent(t.name));
                }
            });
        }

        if (this.serviceRecordStep?.specialRule) {
            let talent = new SelectedTalent(this.serviceRecordStep?.specialRule.name);
            if (this.serviceRecordStep?.system != null) {
                talent.system = this.serviceRecordStep?.system;
            }
            result.push(talent);

            if (this.serviceRecordStep?.selectedTalent != null) {
                result.push(this.serviceRecordStep.selectedTalent);
            }
        }
        return result;
    }

    get talents(): SelectedTalent[] {
        let result = this.talentsWithoutAdditional;
        this.additionalTalents.forEach(t => {
            result.push(t);
        });

        this.advancementSteps
            .filter(s => s.choice === StarshipAdvancementChoice.Talent && s.value != null)
            .forEach(s => {
                if (s.removeValue != null) {
                    let removedTalent = s.removeValue as SelectedTalent;
                    let index = -1;
                    result.forEach((t, i) => {
                        if (index === -1 &&
                            t.name === removedTalent.name &&
                            t.displayName === removedTalent.displayName) {
                            index = i;
                        }
                    });
                    if (index >= 0) {
                        result.splice(index, 1);
                        result.push(s.value as SelectedTalent);
                    }
                } else {
                    result.push(s.value as SelectedTalent);
                }
            });
        return result;
    }

    get rankedTalents(): SelectedTalent[] {
        let talents = this.talents;
        let duplicates = [];
        let result = [];
        talents.forEach(t => {
            if (t.talentModel.maxRank > 1 && !duplicates.includes(t.name)) {
                let temp = t.copy();
                temp.multiple = this.getRankForTalent(t.name);
                duplicates.push(t.name);
                result.push(temp);
            } else if (t.talentModel.maxRank === 1) {
                result.push(t);
            }
        });
        return result;
    }


    get talentsWithoutSpecialRules(): SelectedTalent[] {
        return this.talents?.filter(t => !t.talentModel.specialRule) ?? [];
    }

    private getNonSpaceframeTalentSelectionList() {
        let talents: Map<string, SelectedTalent> = new Map();
        if (this.missionProfileStep?.talent && this.stereotype !== Stereotype.SoloStarship) {
            this.addTalent(new SelectedTalent(this.missionProfileStep?.talent?.talent), talents);
        }

        this.additionalTalents.forEach(t => {
            this.addTalent(new SelectedTalent(t.name), talents);
        });
        if (this.missionPodModel && this.stereotype !== Stereotype.SoloStarship) {
            this.missionPodModel.talents.forEach(t => {
                this.addTalent(new SelectedTalent(t.name), talents);
            });
        }

        let result: SelectedTalent[] = [];
        talents.forEach((value: SelectedTalent) => result.push(value));
        return result;
    }

    hasNonSpaceframeTalent(talentName: string) {
        let talents = this.getNonSpaceframeTalentSelectionList().filter(t => t.name === talentName);
        return talents.length > 0;
    }

    hasTalent(talentName: string) {
        let talents = this.talents.filter(t => t.name === talentName);
        return talents.length > 0;
    }

    private addTalent(t: SelectedTalent, talents: Map<string, SelectedTalent>) {
        if (talents.get(t.name) != null) {
            let temp = talents.get(t.name);
            talents.set(t.name, new SelectedTalent(temp.talent));
        } else {
            talents.set(t.name, t);
        }
    }

    get shields() {
        if (this.departments) {
            let base = this.getSystemValue(System.Structure) + this.departments[Department.Security];
            if (this.version > 1) {
                base += this.scale;
            }
            if (this.buildType !== ShipBuildType.Starship) {
                base = this.power;
            }
            let advanced = this.talents.filter(t => t.name === "Advanced Shields");
            if (advanced.length > 0) {
                base += (5 * advanced.length);
            }
            return base;
        } else {
            return undefined;
        }
    }

    pruneExcessTalents() {
        if (this.stereotype === Stereotype.SoloStarship) {
            if (this.additionalTalents.length > this.spaceframeModel?.scale) {
                let excess = this.additionalTalents.length - this.spaceframeModel?.scale;
                this.additionalTalents.splice(0, excess);
                }
        } else if (this.freeTalentSlots < this.additionalTalents.length) {
            let excess = this.additionalTalents.length - this.freeTalentSlots;
            this.additionalTalents.splice(0, excess);
        }
    }

    refitsAsString() {
        let systems: System[] = allSystems();
        let refitString = "";
        if (this.refits) {
            systems.forEach(s => {
                let value = 0;
                this.refits.forEach(r => value += (r === s) ? 1 : 0);
                if (value > 0) {
                    if (refitString !== "") {
                        refitString += ", ";
                    }
                    refitString += "+" + value + " " + i18next.t(makeKey('Construct.system.', System[s]));
                }
            });
        }
        return refitString;
    }

    get weapons() {
        return this.determineWeapons();
    }

    determineWeapons(): Weapon[] {
        let result = [];
        const spaceframe = this.spaceframeModel;
        const weaponNames = this.additionalTalents.filter(t => t.weapon != null && typeof t.weapon === 'string')
            .map(t => t.weapon);

        let secondary = [];
        if (spaceframe) {
            for (var attack of spaceframe.attacks) {
                for (let weapon of (this.version === 1 ? StarshipWeaponRegistry.list : StarshipWeaponRegistry.list2e)) {
                    if (weapon.name === 'Spatial Torpedoes' && this.hasTalent('Nuclear Warheads')) {
                        // skip it
                    } else if (attack === weapon.name) {
                        result.push(weapon);
                    } else if (weaponNames.includes(weapon.name)) {
                        result.push(weapon);
                    } else if (attack.indexOf(weapon.name) >= 0) { // Tractor or Grappler
                        secondary.push(weapon);
                    } else if (this.hasTalent(weapon.name)) {
                        result.push(weapon);
                    }
                }
            }
        }

        result.push(...this.talents
            .filter(t => t.weapon != null && t.weapon instanceof Weapon)
            .map(t => t.weapon));

        if (this.additionalWeapons.length > 0) {
            this.additionalWeapons.forEach(w => result.push(w));
        }

        result.push(...secondary);

        let names = [];
        let weapons = [];
        result.forEach(w => {
            if (names.indexOf(w.name) >= 0) {
                // skip it
            } else {
                names.push(w.name);
                weapons.push(w);
            }
        });

        return weapons;
    }

    get systems() {
        let result = [0, 0, 0, 0, 0, 0];

        allSystems().forEach(system => {
            let base = this.getBaseSystem(system);
            this.refits.forEach(r => { if (r === system) base++});
            result[system] = base;
        });

        this.advancementSteps
            .filter(s => s.choice === StarshipAdvancementChoice.System && s.value != null)
            .forEach(s => {
                result[s.value as System] += 1;
                if (s.removeValue != null) {
                    result[s.removeValue as System] -= 1;
                }
            });

        return result;
    }

    get departments() {
        let result = [0, 0, 0, 0, 0, 0];
        if (this.spaceframeModel !== undefined) {
            const frame = this.spaceframeModel;
            const missionPod = this.missionPodModel;
            const profile = this.missionProfileStep?.type;

            if (this.stereotype === Stereotype.SoloStarship) {
                frame.soloStats?.departments.forEach((d, i) => {
                    result[i] = d;
                });
            } else {
                frame?.departments.forEach((d, i) => {
                    result[i] = d;
                });

                if (missionPod) {
                    missionPod.departments.forEach((d, i) => {
                        result[i] += d;
                    });
                }

                if (profile != null) {
                    profile.departments.forEach((d, i) => {
                        result[i] += d;
                    });
                }
            }
        } else if (this.simpleStats != null) {
            DepartmentsHelper.instance.getDepartments().forEach(d => result[d] = this.simpleStats.departments[d]);
        }

        this.advancementSteps
            .filter(s => s.choice === StarshipAdvancementChoice.Department && s.value != null)
            .forEach(s => {
                result[s.value as Department] += 1;
                if (s.removeValue != null) {
                    result[s.removeValue as Department] -= 1;
                }
            });

        return result;
    }

    get scale() {
        if (this.spaceframeModel != null) {
            return this.spaceframeModel.scale;
        } else if (this.simpleStats != null) {
            return this.simpleStats.scale;
        } else {
            return 0;
        }
    }

    getDiceForWeapon(weapon: Weapon) {

        if (weapon.isTractorOrGrappler) {
            let dice = this.scale - 1;

            if (this.hasTalent("High-Power Tractor Beam")) {
                dice += 2;
            }
            return dice;
        } else if (this.version === 1) {
            let security = this.departments[Department.Security];
            let dice = weapon.dice + security
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

            if (weapon.type === WeaponType.TORPEDO && this.hasTalent("Rapid-Fire Torpedo Launcher")) {
                dice += 1;
            }

            if (weapon.scaleApplies) {
                return dice + this.scale;
            } else {
                return dice;
            }
        }
    }

    getDiceForWeaponForRoll20(weapon: Weapon) {
        let dice = weapon.dice;
        if (weapon.isTractorOrGrappler) {
            dice = this.scale - 1;

            if (this.hasTalent("High-Power Tractor Beam")) {
                dice += 2;
            }
        }
        return dice;
    }

    get totalAvailableDepartmentPoints(): number {
        return BuildPoints.departmentPointsForType(this.buildType);
    }

    get totalAvailableSystemPoints(): number {
        return BuildPoints.systemPointsForType(this.buildType, this.spaceframeModel.serviceYear, this.type, this.scale);
    }

    public copy(): Starship {
        let result = new Starship();
        result.version = this.version;
        result.era = this.era;
        result.type = this.type;
        result.stereotype = this.stereotype;
        result.buildType = this.buildType;
        result.name = this.name;
        result.registry = this.registry;
        result.traits = this.traits;
        result.serviceYear = this.serviceYear;
        result.spaceframeStep = this.spaceframeStep?.copy();
        result.missionPodModel = this.missionPodModel;
        result.missionProfileStep = this.missionProfileStep?.copy();
        result.additionalTalents = [...this.additionalTalents];
        result.refits = [...this.refits];
        result.additionalWeapons = [...this.additionalWeapons];
        if (this.simpleStats != null) {
            result.simpleStats = new SimpleStats();
            result.simpleStats.className = this.simpleStats.className;
            result.simpleStats.departments = [...this.simpleStats.departments];
            result.simpleStats.systems = [...this.simpleStats.systems];
            result.simpleStats.scale = this.simpleStats.scale;
        }
        result.serviceRecordStep = this.serviceRecordStep?.copy();
        result.advancementSteps = this.advancementSteps.map(s => s.copy());
        return result;
    }
}

