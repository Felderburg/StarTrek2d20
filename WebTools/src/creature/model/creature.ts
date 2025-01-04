import { CharacterType } from "../../common/characterType";
import { Construct, Stereotype } from "../../common/construct";
import { TALENT_NAME_AQUATIC_LIQUID_ENVIRONMENT, TalentModel, TalentsHelper } from "../../helpers/talents";
import { CreatureType, CreatureTypeModel } from "./creatureType";
import { DietTypeModel } from "./diet";
import { HabitatModel } from "./habitat";

export class Creature extends Construct {

    habitat?: HabitatModel;
    creatureType?: CreatureTypeModel;
    diet?: DietTypeModel;

    constructor() {
        super(Stereotype.Creature);
        this.type = CharacterType.Creature;
    }

    get talents() {
        const result: TalentModel[] = [];
        if (this.creatureType?.id === CreatureType.Fish) {
            result.push(TalentsHelper.getTalent(TALENT_NAME_AQUATIC_LIQUID_ENVIRONMENT));
        }
        return result
    }

    getDistinctTalentNameList(): string[] {
        return this.talents.map(t => t.name);
    }
}