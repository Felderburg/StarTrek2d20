import { Department } from "../helpers/department";
import { Era } from "../helpers/eras";
import { MissionProfile } from "../helpers/missionProfiles";
import PointAllocator from "../helpers/pointAllocator";
import { StationFrame } from "../helpers/stationFrame";
import { StationFrameModel } from "../helpers/stationFrameModel";
import { System } from "../helpers/systems";
import { TALENT_NAME_ABLATIVE_ARMOUR, TALENT_NAME_IMPROVED_HULL_INTEGRITY } from "../helpers/talents";
import { Weapon } from "../helpers/weapons";
import { CharacterType } from "./characterType";
import { Construct, Stereotype } from "./construct";
import { SelectedTalent } from "./selectedTalent";

export class CustomStationSpaceframeStep {

    public static readonly MIN_SCALE = 3;

    scale: number = CustomStationSpaceframeStep.MIN_SCALE;
    departments: number[] = [];
    systems: number[] = [];

    get type() {
        return StationFrame.Custom;
    }

    copy() {
        let result = new CustomStationSpaceframeStep();
        result.scale = this.scale;
        result.departments = [...this.departments];
        result.systems = [...this.systems];
        return result;
    }

    static create(scale: number = CustomStationSpaceframeStep.MIN_SCALE) {
        let frameStep = new CustomStationSpaceframeStep();
        frameStep.scale = scale;
        frameStep.systems = PointAllocator.allocatePointsEvenly(Station.totalAvailableSystemPointsForScale(frameStep.scale));
        frameStep.departments = PointAllocator.allocatePointsEvenly(Station.totalAvailableDepartmentPointsForScale(frameStep.scale));

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
        let result = new StationMissionProfileStep(this.type);
        result.talent = this.talent?.copy();
        return result;
    }
}

export class Station extends Construct {

    stationFrameStep: CustomStationSpaceframeStep|StandardStationSpaceframeStep;
    missionProfileStep?: StationMissionProfileStep;
    traits: string[] = [];
    weapons: Weapon[] = [];
    additionalTalents: SelectedTalent[] = []

    constructor() {
        super(Stereotype.Station);
    }

    public static create(type: CharacterType, version: number, era: Era): Station {
        let result = new Station();
        result.version = version;
        result.era = era;
        result.type = type;

        result.stationFrameStep = CustomStationSpaceframeStep.create();
        return result;
    }

    public copy() {
        let result = new Station();
        result.type = this.type;
        result.version = this.version;
        result.era = this.era;
        result.name = this.name;
        result.traits = this.traits == null ? [] : [...this.traits];
        result.missionProfileStep = this.missionProfileStep?.copy();
        result.stationFrameStep = this.stationFrameStep?.copy();
        result.weapons = [...this.weapons];
        result.additionalTalents = this.additionalTalents?.map(t => t.copy());
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

    get scale(): number {
        return this.stationFrameStep?.scale ?? 1
    }

    get crewSupport(): number {
        return this.scale;
    }

    get shields() {
        if (this.departments) {
            let base = this.systems[System.Structure] + this.departments[Department.Security];
            if (this.version > 1) {
                base += this.scale;
            }
            if (this.hasTalent("Enhanced Defense Grid")) {
                base += Math.floor(this.scale / 2);
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

    get power() {
        let power = this.systems[System.Engines];
        let bonus = this.talents.filter(t => t.name === "Secondary Reactors");
        if (power != null && bonus.length > 0) {
            power += (5 * bonus.length);
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

    get traitsAsString() {
        return this.traits?.join(", ") || "";
    }

    get freeTalentSlots() {
        let slots = Math.floor(this.scale / 2);
        if (this.stationFrameStep?.type === StationFrame.Custom) {
            slots -= 1;
        } else {
            let model = (this.stationFrameStep as StandardStationSpaceframeStep).model;
            slots -= model.talents.length;
        }
        return slots;
    }

    get baseTalents(): SelectedTalent[] {
        let result = [];
        if (this.stationFrameStep instanceof StandardStationSpaceframeStep) {
            let model = this.stationFrameStep.model;
            model.talents.forEach(t => {
                if (t instanceof SelectedTalent) {
                    result.push(t);
                } else {
                    result.push(new SelectedTalent(t.name));
                }
            })
        }
        if (this.missionProfileStep?.talent) {
            result.push(this.missionProfileStep.talent);
        }
        return result;
    }

    hasBaseTalent(talentName: string) {
        let talents = this.baseTalents.filter(t => t.name === talentName);
        return talents.length > 0;
    }

    hasTalent(talentName: string) {
        let talents = this.talents.filter(t => t.name === talentName);
        return talents.length > 0;
    }

    static totalAvailableSystemPointsForScale(scale: number): number {
        return Math.min(38 + (3 * Math.max(scale-2)), 78);
    }

    static totalAvailableDepartmentPointsForScale(scale: number): number {
        return Math.min(13 + (3 * Math.max(0, scale-8)), 30);
    }

    determineWeapons() {
        let result = [];
        if (this.stationFrameStep instanceof StandardStationSpaceframeStep) {
            let model = this.stationFrameStep.model;
            result.push(...model.weapons);
        }
        let talentWeapons = this.additionalTalents.filter(t => t.weapon != null).map(t => t.weapon);

        result.push(...talentWeapons);
        result.push(...this.weapons);

        return result;
    }

    get talents(): SelectedTalent[] {
        let result = this.baseTalents;
        result.push(...this.additionalTalents);
        return result;
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

    getQualifierForTalent(name: string) {
        return "";
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

    getDistinctTalentNameList() {
        let result = [];
        this.talents.forEach(t => {
            if (!result.includes(t.name)) {
                result.push(t.name);
            }
        });
        return result;
    }
}