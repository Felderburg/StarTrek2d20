import { D20 } from "../../common/die";
import { SelectedTalent } from "../../common/selectedTalent";
import { Attribute, AttributesHelper } from "../../helpers/attributes";
import { TalentModel } from "../../helpers/talentModel";
import { TalentsHelper } from "../../helpers/talents";
import { CreatureType } from "./creatureType";
import { DietType } from "./diet";


export const generateRandomBasicCreatureTalent = () => {

    switch (D20.roll()) {
        case 1:
        case 2:
        case 3:
            return [];
        case 4:
            return [ toSelection(TalentsHelper.getTalent("Spiked Tail")) ];
        case 5:
            return [toSelection(TalentsHelper.getTalent("Camouflaged X")) ];
        case 6:
        case 7:
            return [ toSelection(TalentsHelper.getTalent("Sense Spectrum")) ];
        case 8:
        case 9:
            return [ toSelection(TalentsHelper.getTalent("Hyper Agile")) ];
        case 10:
            return [ toSelection(TalentsHelper.getTalent("Night Vision")) ];
        case 11:
        case 12:
            return [ toSelection(TalentsHelper.getTalent("Constantly Watching")) ];
        case 13:
        case 14:
            return [ toSelection(TalentsHelper.getTalent("Fast Recovery")) ];
        case 15:
        case 16:
            return [ toSelection(TalentsHelper.getTalent("Immune to Cold")) ];
        case 17:
            return [ toSelection(TalentsHelper.getTalent("Resilient")) ];
        case 18:
        case 19:
            return [ toSelection(TalentsHelper.getTalent("Sturdy (Special Rule)")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X")) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Resilient")) ];
                case 8:
                case 9:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile")) ];
                case 10:
                case 11:
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Constantly Watching")) ];
                case 13:
                case 14:
                    return [ toSelection(TalentsHelper.getTalent("Threat Gesture")) ];
                case 15:
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold")) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Ram")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Sturdy (Special Rule)")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile")) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Resilient")) ];
                case 8:
                case 9:
                    return [ toSelection(TalentsHelper.getTalent("Initiative X")) ];
                case 10:
                case 11:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X")) ];
                case 12:
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Threat Gesture")) ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Pain")) ];
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold")) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Ram")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Stealthy")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Natural Climber")) ];
                case 5:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile")) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Resilient")) ];
                case 8:
                    return [ toSelection(TalentsHelper.getTalent("Ambush Hunter")) ];
                case 9:
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Constantly Watching")) ];
                case 11:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X")) ];
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Instinctive Dodge")) ];
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Threat Gesture")) ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold")) ];
                case 16:
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Ram")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Stealthy")) ];
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

        case CreatureType.Bird:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    return [];
                case 9:
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Initiative X")) ];
                case 11:
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Ambush Hunter")) ];
                case 13:
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Night Vision")) ];
                case 16:
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Enhanced Attribute X"), "Blood Lust", 2, Attribute.Daring) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Mimicry"), "Sounds") ];
                case 20:
                    let result = appendWithNoDuplicates([], generateRandomCreatureTypeTalent(type));
                    result = appendWithNoDuplicates(result, generateRandomCreatureTypeTalent(type));
                    return result;
            }
            break;

        case CreatureType.Invertebrate:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                case 5:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X"), "Chitinous Shell", 2) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous"), "Poisonous") ];
                case 8:
                    return [ toSelection(TalentsHelper.getTalent("Flight"), "Insect-like Wings") ];
                case 9:
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous"), "Venemous") ];
                case 11:
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Wall Climber")) ];
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Web")) ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile")) ];
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Enhanced Attribute X"), "Precise", 1, Attribute.Control) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Sense Spectrum"), "360-degree Vision") ];
                case 18:
                    return [ toSelection(TalentsHelper.getTalent("Attach")) ];
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Whip-like Tail")) ];
                case 20:
                    let result = appendWithNoDuplicates([], generateRandomCreatureTypeTalent(type));
                    result = appendWithNoDuplicates(result, generateRandomCreatureTypeTalent(type));
                    return result;
            }
            break;

        case CreatureType.Mammal:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                case 5:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X"), "Thick Fur", 1) ];
                case 6:
                    return [ toSelection(TalentsHelper.getTalent("Tool User")) ];
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X"), "Bony Plates", 2) ];
                case 8:
                    return [toSelection(TalentsHelper.getTalent("Camouflaged X"), "Patterned Fur", 1) ];
                case 9:
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Flight"), "Leathery Wings") ];
                case 11:
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Sense Spectrum"), "Excellent Hearing") ];
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Sense Spectrum"), "Excellent Sense of Smell") ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile")) ];
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Enhanced Attribute X"), "Rage", 2, Attribute.Daring) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X")) ];
                case 18:
                    return [ toSelection(TalentsHelper.getTalent("Multi-Limbed"), "Prehensile Trunk") ];
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Stink Attack")) ];
                case 20:
                    let result = appendWithNoDuplicates([], generateRandomCreatureTypeTalent(type));
                    result = appendWithNoDuplicates(result, generateRandomCreatureTypeTalent(type));
                    return result;
            }
            break;

        case CreatureType.Fish:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                case 5:
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous")) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X")) ];
                case 8:
                    return [ toSelection(TalentsHelper.getTalent("Sense Spectrum")) ];
                case 9:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X")) ];
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Coordination")) ];
                case 11:
                    return [ toSelection(TalentsHelper.getTalent("Resilient")) ];
                case 12:
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X")) ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold")) ];
                case 16:
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Poison")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Stealthy")) ];
                case 20:
                    let result = appendWithNoDuplicates([], generateRandomCreatureTypeTalent(type));
                    result = appendWithNoDuplicates(result, generateRandomCreatureTypeTalent(type));
                    return result;
            }
            break;
        case CreatureType.Plant:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                case 5:
                case 6:
                    return [ toSelection(TalentsHelper.getTalent("Sturdy (Special Rule)")) ];
                case 7:
                case 8:
                    return [ toSelection(TalentsHelper.getTalent("Camouflaged X")) ];
                case 9:
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X"), "Thorny stem and roots") ];
                case 11:
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous"), "Poisonous") ];
                case 13:
                case 14:
                    return [ toSelection(TalentsHelper.getTalent("Entangling Vines")) ];
                case 15:
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Spore Attack")) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Resilient")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Pheromones (Creature)")) ];
                case 20:
                    let result = appendWithNoDuplicates([], generateRandomCreatureTypeTalent(type));
                    result = appendWithNoDuplicates(result, generateRandomCreatureTypeTalent(type));
                    return result;
            }
            break;
        case CreatureType.Reptile:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                case 5:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X"), "Scaly Hide", 1) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X"), "Hardened Shell", 3) ];
                case 8:
                case 9:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X"), "Bone Plates", 2) ];
                case 10:
                case 11:
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous"), "Poisonous") ];
                case 12:
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Flight"), "Leathery Wings") ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile")) ];
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Fast Recovery")) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold")) ];
                case 18:
                    return [ toSelection(TalentsHelper.getTalent("Corrosive Spit")) ];
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Enhanced Attribute X"), undefined, 1, Attribute.Control) ];
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

const toSelection = (talent: TalentModel, additionalInformation?: string, x?: number, attribute?: Attribute) => {
    const selectedTalent = new SelectedTalent(talent.name);
    selectedTalent.x = determineXIfNecessary(talent, x);
    selectedTalent.attribute = determineAttributeIfNecessary(talent, attribute);
    selectedTalent.additionalInformation = additionalInformation;
    return selectedTalent;
}

const determineAttributeIfNecessary = (talent: TalentModel, attribute?: Attribute) => {
    if (talent.nameWithoutBracketedPart === "Enhanced Attribute X") {
        if (attribute != null) {
            return attribute;
        } else {
            const attributes = AttributesHelper.getAllAttributes();
            return attributes[Math.floor(Math.random() * attributes.length)];
        }
    } else {
        return undefined;
    }
}

const determineXIfNecessary = (talent: TalentModel, x?: number) => {
    if (talent.isXQualified) {
        if (x != null) {
            return x;
        } else if (talent.nameWithoutBracketedPart === "Initiative X") {
            const roll = D20.roll();
            if (roll >= 1 && roll <= 15) {
                return 2;
            } else if (roll >= 16 && roll <= 19) {
                return 3;
            } else if (roll >= 20) {
                return 4;
            }
        } else {
            const roll = D20.roll();
            if (roll >= 1 && roll <= 12) {
                return 1;
            } else if (roll >= 13 && roll <= 18) {
                return 2;
            } else if (roll >= 19) {
                return 3;
            }
        }
    } else {
        return undefined;
    }
}

const appendWithNoDuplicates = (array1: SelectedTalent[], array2: SelectedTalent[]) => {
    let result = [...array1];

    array2.forEach(t => {
        if (result.filter(i => i.talent === t.talent).length) {
            result.push(t);
        }
    });

    return result;
}