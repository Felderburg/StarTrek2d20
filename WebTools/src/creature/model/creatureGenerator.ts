import { D20 } from "../../common/die";
import { SelectedTalent } from "../../common/selectedTalent";
import { AttributesHelper } from "../../helpers/attributes";
import { Era } from "../../helpers/eras";
import { TALENT_NAME_FLIGHT, TalentModel } from "../../helpers/talents";
import { isSecondEdition } from "../../state/contextFunctions";
import { Creature } from "./creature";
import { creatureNameGenerator } from "./creatureNameGenerator";
import { CreatureSizeHelper, generateRandomCreatureSize } from "./creatureSize";
import { generateRandomBasicCreatureTalent, generateRandomCreatureDietTalent, generateRandomCreatureTypeTalent } from "./creatureTalents";
import { createRandomCreatureType, CreatureType, CreatureTypeHelper } from "./creatureType";
import { createRandomDiet, DietTypeHelper } from "./diet";
import { createRandomHabitat, Habitat, HabitatHelper } from "./habitat";
import { generateRandomLocomotionType } from "./locomotion";
import { generateRandomNaturalAttacks } from "./naturalAttacks";

export const CreatureGenerator = (era: Era, habitat?: Habitat, creatureType?: CreatureType) => {
    const result = new Creature();
    result.name = creatureNameGenerator();
    result.version = isSecondEdition() ? 2 : 1;
    result.era = era;

    if (habitat == null) {
        habitat = createRandomHabitat();
    }

    result.habitat = HabitatHelper.instance.getTypeById(habitat);
    if (creatureType == null) {
        creatureType = createRandomCreatureType(habitat);
    }
    result.creatureType = CreatureTypeHelper.instance.getTypeById(creatureType);

    let diet = createRandomDiet();
    result.diet = DietTypeHelper.instance.getTypeById(diet);

    let size = generateRandomCreatureSize();
    result.size = CreatureSizeHelper.instance.getTypeById(size);

    result.naturalAttacks = generateRandomNaturalAttacks(diet);

    result.locomotion = generateRandomLocomotionType(creatureType, habitat);

    if (result.creatureType?.id === CreatureType.Bird && D20.roll() <= 15) {
        result.additionalTalents.push(new SelectedTalent(TALENT_NAME_FLIGHT));
    } else if (result.creatureType?.id === CreatureType.Bird) {
        result.additionalTraits.push("Flightless");
    }

    addAllTalents(result, generateRandomBasicCreatureTalent());
    if (result.diet) {
        addAllTalents(result, generateRandomCreatureDietTalent(result.diet.id));
    }
    if (result.creatureType) {
        addAllTalents(result, generateRandomCreatureTypeTalent(result.creatureType.id));
    }

    return result;
}

const addAllTalents = (creature: Creature, talents: TalentModel[]) => {
    talents.forEach(t => {
        const selectedTalent = new SelectedTalent(t.name);
        selectedTalent.x = determineXIfNecessary(t);
        selectedTalent.attribute = determineAttributeIfNecessary(t);
        if (!creature.hasTalent(t.name)) {
            creature.additionalTalents.push(selectedTalent);
        }
    });

}

const determineAttributeIfNecessary = (talent: TalentModel) => {
    if (talent.nameWithoutBracketedPart === "Enhanced Attribute X") {
        const attributes = AttributesHelper.getAllAttributes();
        return attributes[Math.floor(Math.random() * attributes.length)];
    } else {
        return undefined;
    }
}

const determineXIfNecessary = (talent: TalentModel) => {
    if (talent.isXQualified) {
        if (talent.nameWithoutBracketedPart === "Initiative X") {
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