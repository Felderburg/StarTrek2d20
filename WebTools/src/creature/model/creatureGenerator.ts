import { Era } from "../../helpers/eras";
import { isSecondEdition } from "../../state/contextFunctions";
import { Creature } from "./creature";
import { createRandomCreatureType } from "./creatureType";
import { createRandomHabitat, Habitat, HabitatHelper } from "./habitat";

export const CreatureGenerator = (era: Era, habitat?: Habitat) => {
    const result = new Creature();
    result.version = isSecondEdition() ? 2 : 1;
    result.era = era;

    if (habitat == null) {
        habitat = createRandomHabitat();
    }

    result.habitat = HabitatHelper.instance.getTypeById(habitat);
    result.creatureType = createRandomCreatureType(habitat);

    return result;
}