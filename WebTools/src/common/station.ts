import { Department } from "../helpers/department";
import { System } from "../helpers/systems";
import { Construct, Stereotype } from "./construct";

export class Station extends Construct {

    scale: number;

    constructor() {
        super(Stereotype.Station);
        this.version = 2;
    }

    public static create(): Station {
        return new Station();
    }

    public copy() {
        let result = new Station();
        result.scale = this.scale;
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