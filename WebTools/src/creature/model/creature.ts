import { CharacterType } from "../../common/characterType";
import { Construct, Stereotype } from "../../common/construct";
import { TALENT_NAME_AQUATIC_LIQUID_ENVIRONMENT, TalentModel, TalentsHelper } from "../../helpers/talents";
import { Weapon } from "../../helpers/weapons";
import { CreatureSizeModel } from "./creatureSize";
import { CreatureType, CreatureTypeModel } from "./creatureType";
import { DietTypeModel } from "./diet";
import { HabitatModel } from "./habitat";
import { NaturalAttacks, NaturalAttacksHelper } from "./naturalAttacks";

export class Creature extends Construct {

    habitat?: HabitatModel;
    creatureType?: CreatureTypeModel;
    diet?: DietTypeModel;
    size?: CreatureSizeModel;
    naturalAttacks?: NaturalAttacks;

    constructor() {
        super(Stereotype.Creature);
        this.type = CharacterType.Creature;
    }

    get attributes() {
        return [5, 5, 5, 5, 5, 5];
    }

    get departments() {
        return [0, 0, 0, 0, 0, 0];
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

    getRankForTalent() {
        return 1;
    }

    determineWeapons(): Weapon[] {
        const result: Weapon[] = [];
        if (this.naturalAttacks != null) {
            result.push(NaturalAttacksHelper.instance.getAttackById(this.naturalAttacks));
        }

        return result;
    }

    getAllTraits() {
        return "Creature";
    }
}