import { CharacterType } from "../../common/characterType";
import { Construct, Stereotype } from "../../common/construct";
import { CreatureType } from "./creatureType";
import { HabitatModel } from "./habitat";

export class Creature extends Construct {

    habitat?: HabitatModel;
    creatureType?: CreatureType;

    constructor() {
        super(Stereotype.Creature);
        this.type = CharacterType.Creature;
    }
}