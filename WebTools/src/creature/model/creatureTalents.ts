import { D20 } from "../../common/die";
import { TalentModel, TalentsHelper } from "../../helpers/talents";
import { CreatureType } from "./creatureType";
import { DietType } from "./diet";


export const generateRandomBasicCreatureTalent = () => {

    switch (D20.roll()) {
        case 1:
        case 2:
        case 3:
            return [];
        case 4:
            return [ TalentsHelper.getTalent("Spiked Tail (Special Rule, Creature)") ];
        case 5:
            return [TalentsHelper.getTalent("Camouflaged X (Special Rule, Creature)") ];
        case 6:
        case 7:
            return [ TalentsHelper.getTalent("Sense Spectrum (Special Rule, Creature)") ];
        case 8:
        case 9:
            return [ TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)") ];
        case 10:
            return [ TalentsHelper.getTalent("Night Vision (Special Rule, Creature)") ];
        case 11:
        case 12:
            return [ TalentsHelper.getTalent("Constantly Watching") ];
        case 13:
        case 14:
            return [ TalentsHelper.getTalent("Fast Recovery (Special Rule, Creature)") ];
        case 15:
        case 16:
            return [ TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)") ];
        case 17:
            return [ TalentsHelper.getTalent("Resilient (Special Rule, Creature)") ];
        case 18:
        case 19:
            return [ TalentsHelper.getTalent("Sturdy (Special Rule, Creature)") ];
        case 20:
            let result = appendWithNoDuplicates([], generateRandomBasicCreatureTalent());
            result = appendWithNoDuplicates(result, generateRandomBasicCreatureTalent());
            return result;
    }
}

export const generateRandomCreatureDietTalent = (diet: DietType) => {
    switch (diet) {

        case DietType.Herbivore:
        case DietType.Energy:
        case DietType.PsychicEnergy:
        case DietType.MineralsOrMetal:

            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                case 5:
                    return [ TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)") ];
                case 6:
                case 7:
                    return [ TalentsHelper.getTalent("Resilient (Special Rule, Creature)") ];
                case 8:
                case 9:
                    return [ TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)") ];
                case 10:
                case 11:
                case 12:
                    return [ TalentsHelper.getTalent("Constantly Watching") ];
                case 13:
                case 14:
                    return [ TalentsHelper.getTalent("Threat Gesture (Special Rule, Creature)") ];
                case 15:
                case 16:
                    return [ TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)") ];
                case 17:
                    return [ TalentsHelper.getTalent("Ram (Special Rule, Creature)") ];
                case 18:
                case 19:
                    return [ TalentsHelper.getTalent("Sturdy (Special Rule, Creature)") ];
                case 20:
                    let result = appendWithNoDuplicates([], generateRandomCreatureDietTalent(diet));
                    result = appendWithNoDuplicates(result, generateRandomCreatureDietTalent(diet));
                    return result;
            }
            break;
        case DietType.Carnivore:

            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                case 5:
                    return [ TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)") ];
                case 6:
                case 7:
                    return [ TalentsHelper.getTalent("Resilient (Special Rule, Creature)") ];
                case 8:
                case 9:
                    return [ TalentsHelper.getTalent("Initiative X (Special Rule, Creature)") ];
                case 10:
                case 11:
                    return [ TalentsHelper.getTalent("Menacing X (Special Rule, Creature)") ];
                case 12:
                case 13:
                    return [ TalentsHelper.getTalent("Threat Gesture (Special Rule, Creature)") ];
                case 14:
                case 15:
                    return [ TalentsHelper.getTalent("Immune to Pain (Special Rule, Creature)") ];
                case 16:
                    return [ TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)") ];
                case 17:
                    return [ TalentsHelper.getTalent("Ram (Special Rule, Creature)") ];
                case 18:
                case 19:
                    return [ TalentsHelper.getTalent("Stealthy (Special Rule, Creature)") ];
                case 20:
                    let result = appendWithNoDuplicates([], generateRandomCreatureDietTalent(diet));
                    result = appendWithNoDuplicates(result, generateRandomCreatureDietTalent(diet));
                    return result;
            }
            break;

        case DietType.Omnivore:

            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                    return [ TalentsHelper.getTalent("Natural Climber (Special Rule, Creature)") ];
                case 5:
                    return [ TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)") ];
                case 6:
                case 7:
                    return [ TalentsHelper.getTalent("Resilient (Special Rule, Creature)") ];
                case 8:
                    return [ TalentsHelper.getTalent("Ambush Hunter (Special Rule, Creature)") ];
                case 9:
                case 10:
                    return [ TalentsHelper.getTalent("Constantly Watching") ];
                case 11:
                    return [ TalentsHelper.getTalent("Menacing X (Special Rule, Creature)") ];
                case 12:
                    return [ TalentsHelper.getTalent("Instinctive Dodge (Special Rule, Creature)") ];
                case 13:
                    return [ TalentsHelper.getTalent("Threat Gesture (Special Rule, Creature)") ];
                case 14:
                case 15:
                    return [ TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)") ];
                case 16:
                case 17:
                    return [ TalentsHelper.getTalent("Ram (Special Rule, Creature)") ];
                case 18:
                case 19:
                    return [ TalentsHelper.getTalent("Stealthy (Special Rule, Creature)") ];
                case 20:
                    let result = appendWithNoDuplicates([], generateRandomCreatureDietTalent(diet));
                    result = appendWithNoDuplicates(result, generateRandomCreatureDietTalent(diet));
                    return result;
            }
            break;
        default:
            return [];
    }
}


export const generateRandomCreatureTypeTalent = (type: CreatureType) => {

    switch (type) {

        case CreatureType.Fish:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                case 5:
                    return [ TalentsHelper.getTalent("Toxic, Poisonous or Venomous (Special Rule, Creature)") ];
                case 6:
                case 7:
                    return [ TalentsHelper.getTalent("Menacing X (Special Rule, Creature)") ];
                case 8:
                    return [ TalentsHelper.getTalent("Sense Spectrum (Special Rule, Creature)") ];
                case 9:
                    return [ TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)") ];
                case 10:
                    return [ TalentsHelper.getTalent("Coordination") ];
                case 11:
                    return [ TalentsHelper.getTalent("Resilient (Special Rule, Creature)") ];
                case 12:
                case 13:
                    return [ TalentsHelper.getTalent("Menacing X (Special Rule, Creature)") ];
                case 14:
                case 15:
                    return [ TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)") ];
                case 16:
                case 17:
                    return [ TalentsHelper.getTalent("Immune to Poison (Special Rule, Creature)") ];
                case 18:
                case 19:
                    return [ TalentsHelper.getTalent("Stealthy (Special Rule, Creature)") ];
                case 20:
                    let result = appendWithNoDuplicates([], generateRandomCreatureTypeTalent(type));
                    result = appendWithNoDuplicates(result, generateRandomCreatureTypeTalent(type));
                    return result;
            }
        break;
        default:
            return [];
    }

}


const appendWithNoDuplicates = (array1: TalentModel[], array2: TalentModel[]) => {
    let result = [...array1];

    array2.forEach(t => {
        if (result.filter(i => i.name === t.name).length) {
            result.push(t);
        }
    });

    return result;
}