import { Department } from "../helpers/department";
import { Era } from "../helpers/eras";
import { MissionProfile } from "../helpers/missionProfiles";
import { System } from "../helpers/systems";
import { CharacterType } from "./characterType";
import { Construct, Stereotype } from "./construct";

export class CustomStationSpaceframeStep {

    scale: number;
    departments: number[] = [];
    systems: number[] = [];

    copy() {
        let result = new CustomStationSpaceframeStep();
        result.scale = this.scale;
        result.departments = [...this.departments];
        result.systems = [...this.systems];
        return result;
    }
}

export class StationMissionProfileStep {
    public readonly type: MissionProfile;

    constructor(missionProfile: MissionProfile) {
        this.type = missionProfile;
    }

    copy() {
        let result = new StationMissionProfileStep(this.type);
        return result;
    }
}

export class Station extends Construct {

    stationFrameStep: CustomStationSpaceframeStep;
    missionProfileStep?: StationMissionProfileStep;
    traits: string[] = []

    constructor() {
        super(Stereotype.Station);
    }

    public static create(type: CharacterType, version: number, era: Era): Station {
        let result = new Station();
        result.version = version;
        result.era = era;
        result.type = type;
        return result;
    }

    public copy() {
        let result = new Station();
        result.type = this.type;
        result.version = this.version;
        result.era = this.era;
        result.name = this.name;
        result.traits = [...this.traits];
        result.missionProfileStep = this.missionProfileStep?.copy();
        result.stationFrameStep = this.stationFrameStep?.copy();
        return result;
    }

    get systems(): number[] {
        return [];
    }

    get departments(): number[] {
        return [];
    }

    get resistance(): number {
        return this.scale;
    }

    get scale(): number {
        return this.stationFrameStep?.scale ?? 1
    }

    get crewSupport(): number {
        return this.scale;
    }

    get shields(): number {
        return this.systems[System.Structure] + this.departments[Department.Security];
    }

    get power(): number {
        return this.systems[System.Engines];
    }

    get totalAvailableSystemPoints(): number {
        return Math.min(38 + (3 * Math.max(this.scale-2)), 78);
    }

    get totalAvailableDepartmentPoints(): number {
        return Math.min(13 + (3 * Math.max(0, this.scale-8)), 30);
    }

    get traitsAsString() {
        return this.traits?.join(", ") || "";
    }
}