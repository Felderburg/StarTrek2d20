import { Construct, Stereotype } from "./construct";

export class Station extends Construct {

    scale: number;

    constructor() {
        super(Stereotype.Station);
    }
}