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
}