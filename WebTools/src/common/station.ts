import { Department } from "../helpers/department";
import { Era } from "../helpers/eras";
import { MissionProfile } from "../helpers/missionProfiles";
import PointAllocator from "../helpers/pointAllocator";
import { System } from "../helpers/systems";
import { Weapon } from "../helpers/weapons";
import { CharacterType } from "./characterType";
import { Construct, Stereotype } from "./construct";

export class CustomStationSpaceframeStep {

    public static readonly MIN_SCALE = 3;

    scale: number = CustomStationSpaceframeStep.MIN_SCALE;
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
    traits: string[] = [];
    weapons: Weapon[] = [];

    constructor() {
        super(Stereotype.Station);
    }

    public static create(type: CharacterType, version: number, era: Era): Station {
        let result = new Station();
        result.version = version;
        result.era = era;
        result.type = type;

        let frameStep = new CustomStationSpaceframeStep();
        frameStep.scale = CustomStationSpaceframeStep.MIN_SCALE;
        frameStep.systems = PointAllocator.allocatePointsEvenly(Station.totalAvailableSystemPointsForScale(frameStep.scale));
        frameStep.departments = PointAllocator.allocatePointsEvenly(Station.totalAvailableDepartmentPointsForScale(frameStep.scale));

        result.stationFrameStep = frameStep;

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
        result.weapons = [...this.weapons];
        return result;
    }

    get systems(): number[] {
        return this.stationFrameStep?.systems ?? [0, 0, 0, 0, 0, 0];
    }

    get departments(): number[] {
        return this.stationFrameStep?.departments ?? [0, 0, 0, 0, 0, 0];
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

    get maxSystemValue(): number {
        return 15;
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

    static totalAvailableSystemPointsForScale(scale: number): number {
        return Math.min(38 + (3 * Math.max(scale-2)), 78);
    }

    static totalAvailableDepartmentPointsForScale(scale: number): number {
        return Math.min(13 + (3 * Math.max(0, scale-8)), 30);
    }

    determineWeapons() {
        return this.weapons;
    }
}