import { D20 } from "../../common/die";
import { SelectedTalent } from "../../common/selectedTalent";
import { Attribute, AttributesHelper } from "../../helpers/attributes";
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
            return [ toSelection(TalentsHelper.getTalent("Spiked Tail (Special Rule, Creature)")) ];
        case 5:
            return [toSelection(TalentsHelper.getTalent("Camouflaged X (Special Rule, Creature)")) ];
        case 6:
        case 7:
            return [ toSelection(TalentsHelper.getTalent("Sense Spectrum (Special Rule, Creature)")) ];
        case 8:
        case 9:
            return [ toSelection(TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)")) ];
        case 10:
            return [ toSelection(TalentsHelper.getTalent("Night Vision (Special Rule, Creature)")) ];
        case 11:
        case 12:
            return [ toSelection(TalentsHelper.getTalent("Constantly Watching")) ];
        case 13:
        case 14:
            return [ toSelection(TalentsHelper.getTalent("Fast Recovery (Special Rule, Creature)")) ];
        case 15:
        case 16:
            return [ toSelection(TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)")) ];
        case 17:
            return [ toSelection(TalentsHelper.getTalent("Resilient (Special Rule, Creature)")) ];
        case 18:
        case 19:
            return [ toSelection(TalentsHelper.getTalent("Sturdy (Special Rule, Creature)")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)")) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Resilient (Special Rule, Creature)")) ];
                case 8:
                case 9:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)")) ];
                case 10:
                case 11:
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Constantly Watching")) ];
                case 13:
                case 14:
                    return [ toSelection(TalentsHelper.getTalent("Threat Gesture (Special Rule, Creature)")) ];
                case 15:
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)")) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Ram (Special Rule, Creature)")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Sturdy (Special Rule, Creature)")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)")) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Resilient (Special Rule, Creature)")) ];
                case 8:
                case 9:
                    return [ toSelection(TalentsHelper.getTalent("Initiative X (Special Rule, Creature)")) ];
                case 10:
                case 11:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X (Special Rule, Creature)")) ];
                case 12:
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Threat Gesture (Special Rule, Creature)")) ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Pain (Special Rule, Creature)")) ];
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)")) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Ram (Special Rule, Creature)")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Stealthy (Special Rule, Creature)")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Natural Climber (Special Rule, Creature)")) ];
                case 5:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)")) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Resilient (Special Rule, Creature)")) ];
                case 8:
                    return [ toSelection(TalentsHelper.getTalent("Ambush Hunter (Special Rule, Creature)")) ];
                case 9:
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Constantly Watching")) ];
                case 11:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X (Special Rule, Creature)")) ];
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Instinctive Dodge (Special Rule, Creature)")) ];
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Threat Gesture (Special Rule, Creature)")) ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)")) ];
                case 16:
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Ram (Special Rule, Creature)")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Stealthy (Special Rule, Creature)")) ];
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

        case CreatureType.Invertebrate:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return [];
                case 4:
                case 5:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)"), "Chitinous Shell", 2) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous (Special Rule, Creature)"), "Poisonous") ];
                case 8:
                    return [ toSelection(TalentsHelper.getTalent("Flight (Special Rule, Creature)"), "Insect-like Wings") ];
                case 9:
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous (Special Rule, Creature)"), "Venemous") ];
                case 11:
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Wall Climber (Special Rule, Creature)")) ];
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Web (Special Rule, Creature)")) ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)")) ];
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Enhanced Attribute X (Special Rule, Creature)"), "Precise", 1, Attribute.Control) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Sense Spectrum (Special Rule, Creature)"), "360-degree Vision") ];
                case 18:
                    return [ toSelection(TalentsHelper.getTalent("Attach (Special Rule, Creature)")) ];
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Whip-like Tail (Special Rule, Creature)")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)"), "Thick Fur", 1) ];
                case 6:
                    return [ toSelection(TalentsHelper.getTalent("Tool User (Special Rule, Creature)")) ];
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)"), "Bony Plates", 2) ];
                case 8:
                    return [toSelection(TalentsHelper.getTalent("Camouflaged X (Special Rule, Creature)"), "Patterned Fur", 1) ];
                case 9:
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Flight (Special Rule, Creature)"), "Leathery Wings") ];
                case 11:
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Sense Spectrum (Special Rule, Creature)"), "Excellent Hearing") ];
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Sense Spectrum (Special Rule, Creature)"), "Excellent Sense of Smell") ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)")) ];
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Enhanced Attribute X (Special Rule, Creature)"), "Rage", 2, Attribute.Daring) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X (Special Rule, Creature)")) ];
                case 18:
                    return [ toSelection(TalentsHelper.getTalent("Multi-Limbed (Special Rule, Creature)"), "Prehensile Trunk") ];
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Stink Attack (Special Rule, Creature)")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous (Special Rule, Creature)")) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X (Special Rule, Creature)")) ];
                case 8:
                    return [ toSelection(TalentsHelper.getTalent("Sense Spectrum (Special Rule, Creature)")) ];
                case 9:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)")) ];
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Coordination (Special Rule, Creature)")) ];
                case 11:
                    return [ toSelection(TalentsHelper.getTalent("Resilient (Special Rule, Creature)")) ];
                case 12:
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Menacing X (Special Rule, Creature)")) ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)")) ];
                case 16:
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Poison (Special Rule, Creature)")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Stealthy (Special Rule, Creature)")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Sturdy (Special Rule, Creature)")) ];
                case 7:
                case 8:
                    return [ toSelection(TalentsHelper.getTalent("Camouflaged X (Special Rule, Creature)")) ];
                case 9:
                case 10:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)"), "Thorny stem and roots") ];
                case 11:
                case 12:
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous (Special Rule, Creature)"), "Poisonous") ];
                case 13:
                case 14:
                    return [ toSelection(TalentsHelper.getTalent("Entangling Vines (Special Rule, Creature)")) ];
                case 15:
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Spore Attack (Special Rule, Creature)")) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Resilient (Special Rule, Creature)")) ];
                case 18:
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Pheromones (Special Rule, Creature)")) ];
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
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)"), "Scaly Hide", 1) ];
                case 6:
                case 7:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)"), "Hardened Shell", 3) ];
                case 8:
                case 9:
                    return [ toSelection(TalentsHelper.getTalent("Natural Protection X (Special Rule, Creature)"), "Bone Plates", 2) ];
                case 10:
                case 11:
                    return [ toSelection(TalentsHelper.getTalent("Toxic, Poisonous or Venomous (Special Rule, Creature)"), "Poisonous") ];
                case 12:
                case 13:
                    return [ toSelection(TalentsHelper.getTalent("Flight (Special Rule, Creature)"), "Leathery Wings") ];
                case 14:
                case 15:
                    return [ toSelection(TalentsHelper.getTalent("Hyper Agile (Special Rule, Creature)")) ];
                case 16:
                    return [ toSelection(TalentsHelper.getTalent("Fast Recovery (Special Rule, Creature)")) ];
                case 17:
                    return [ toSelection(TalentsHelper.getTalent("Immune to Cold (Special Rule, Creature)")) ];
                case 18:
                    return [ toSelection(TalentsHelper.getTalent("Corrosive Spit (Special Rule, Creature)")) ];
                case 19:
                    return [ toSelection(TalentsHelper.getTalent("Enhanced Attribute X (Special Rule, Creature)"), undefined, 1, Attribute.Control) ];
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