import { Department } from "../helpers/department";
import { Era } from "../helpers/eras";
import { MissionProfile } from "../helpers/missionProfiles";
import { System } from "../helpers/systems";
import { CharacterType } from "./characterType";
import { Construct, Stereotype } from "./construct";

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

    scale: number;
    missionProfileStep?: StationMissionProfileStep;

    constructor(type: CharacterType, version: number, era: Era) {
        super(Stereotype.Station);
        this.version = version;
        this.era = era;
        this.type = type;
    }

    public static create(type: CharacterType, version: number, era: Era): Station {
        return new Station(type, version, era);
    }

    public copy() {
        let result = new Station(this.type, this.version, this.era);
        result.scale = this.scale;
        result.missionProfileStep = this.missionProfileStep?.copy();
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
}