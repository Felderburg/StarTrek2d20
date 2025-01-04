import { D20 } from "../../common/die";
import { Habitat } from "./habitat";

export enum CreatureType {
    Amphibian,
    Bird,
    Fish,
    Invertebrate,
    Mammal,
    Plant,
    Reptile,

}

export const createRandomCreatureType = (habitat: Habitat) => {

    switch (habitat) {
        case Habitat.Mountains:
        case Habitat.Desert:
        case Habitat.Hills:
        case Habitat.Plains:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                    return CreatureType.Invertebrate;
                case 5:
                case 6:
                case 7:
                case 8:
                    return CreatureType.Reptile;
                case 9:
                case 10:
                case 11:
                case 12:
                    return CreatureType.Mammal;
                case 13:
                case 14:
                case 15:
                case 16:
                    return CreatureType.Bird;
                case 17:
                case 18:
                case 19:
                case 20:
                    return CreatureType.Plant;
            }
            break;
        case Habitat.Swamp:
        case Habitat.River:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return CreatureType.Invertebrate;
                case 4:
                case 5:
                case 6:
                    return CreatureType.Reptile;
                case 7:
                case 8:
                case 9:
                    return CreatureType.Mammal;
                case 10:
                case 11:
                case 12:
                case 13:
                    return CreatureType.Amphibian;
                case 14:
                case 15:
                case 16:
                    return CreatureType.Bird;
                case 17:
                case 18:
                    return CreatureType.Plant;
                case 19:
                case 20:
                    return CreatureType.Fish;
            }
            break;
        case Habitat.Forest:
        case Habitat.Jungle:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                    return CreatureType.Invertebrate;
                case 4:
                case 5:
                case 6:
                    return CreatureType.Reptile;
                case 7:
                case 8:
                case 9:
                case 10:
                    return CreatureType.Mammal;
                case 11:
                case 12:
                case 13:
                case 14:
                    return CreatureType.Amphibian;
                case 15:
                case 16:
                case 17:
                    return CreatureType.Bird;
                case 18:
                case 19:
                case 20:
                    return CreatureType.Plant;
            }
            break;
        case Habitat.Ocean:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                    return CreatureType.Invertebrate;
                case 5:
                case 6:
                case 7:
                case 8:
                    return CreatureType.Mammal;
                case 9:
                case 10:
                case 11:
                case 12:
                    return CreatureType.Bird;
                case 13:
                case 14:
                case 15:
                case 16:
                    return CreatureType.Plant;
                case 17:
                case 18:
                case 19:
                case 20:
                    return CreatureType.Fish;
            }
            break;
        default:
            return null;
        }
}
