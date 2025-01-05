import { Era } from "../../helpers/eras";
import { isSecondEdition } from "../../state/contextFunctions";
import { Creature } from "./creature";
import { CreatureSizeHelper, generateRandomCreatureSize } from "./creatureSize";
import { createRandomCreatureType, CreatureTypeHelper } from "./creatureType";
import { createRandomDiet, DietTypeHelper } from "./diet";
import { createRandomHabitat, Habitat, HabitatHelper } from "./habitat";
import { generateRandomNaturalAttacks } from "./naturalAttacks";

export const CreatureGenerator = (era: Era, habitat?: Habitat) => {
    const result = new Creature();
    result.version = isSecondEdition() ? 2 : 1;
    result.era = era;

    if (habitat == null) {
        habitat = createRandomHabitat();
    }

    result.habitat = HabitatHelper.instance.getTypeById(habitat);
    let creatureType = createRandomCreatureType(habitat);
    result.creatureType = CreatureTypeHelper.instance.getTypeById(creatureType);

    let diet = createRandomDiet();
    result.diet = DietTypeHelper.instance.getTypeById(diet);

    let size = generateRandomCreatureSize();
    result.size = CreatureSizeHelper.instance.getTypeById(size);

    result.naturalAttacks = generateRandomNaturalAttacks(diet);

    return result;
}