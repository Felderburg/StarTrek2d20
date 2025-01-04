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
    Energy,
    Gelatinous,
}

export class CreatureTypeModel {

    id: CreatureType;
    private name: string;

    constructor(id: CreatureType, name: string) {
        this.id = id;
        this.name = name;
    }

    get localizedName() {
        return this.name;
    }
}

export class CreatureTypeHelper {
    private static _instance: CreatureTypeHelper;

    private items = [
        new CreatureTypeModel(CreatureType.Amphibian, "Amphibian"),
        new CreatureTypeModel(CreatureType.Bird, "Bird"),
        new CreatureTypeModel(CreatureType.Fish, "Fish"),
        new CreatureTypeModel(CreatureType.Invertebrate, "Invertebrate"),
        new CreatureTypeModel(CreatureType.Mammal, "Mammal"),
        new CreatureTypeModel(CreatureType.Plant, "Plant"),
        new CreatureTypeModel(CreatureType.Reptile, "Reptile"),
        new CreatureTypeModel(CreatureType.Energy, "Energy"),
        new CreatureTypeModel(CreatureType.Gelatinous, "Gelloid"),

    ]

    static get instance() {
        if (CreatureTypeHelper._instance == null) {
            CreatureTypeHelper._instance = new CreatureTypeHelper();
        }
        return CreatureTypeHelper._instance;
    }

    getTypes() {
        return this.items;
    }

    getTypeById(id: CreatureType) {
        let items = this.items.filter(h => h.id === id);
        return items?.length ? items[0] : undefined;
    }

    getTypeByIdName(name: string) {
        let items = this.items.filter(h => CreatureType[h.id] === name);
        return items?.length ? items[0] : undefined;

    }
}


export const createRandomCreatureType = (habitat: Habitat) => {

    switch (habitat) {
        case Habitat.Desert:
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
                case 9:
                    return CreatureType.Reptile;
                case 10:
                case 11:
                case 12:
                    return CreatureType.Mammal;
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                    return CreatureType.Bird;
                case 18:
                case 19:
                    return CreatureType.Gelatinous;
                case 20:
                    return CreatureType.Energy;
            }
            break;
        case Habitat.Mountains:
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
                    return CreatureType.Amphibian;
                case 13:
                case 14:
                case 15:
                    return CreatureType.Bird;
                case 16:
                case 17:
                    return CreatureType.Plant;
                case 18:
                case 19:
                    return CreatureType.Fish;
                case 20:
                    return CreatureType.Gelatinous
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
                    return CreatureType.Invertebrate;
                case 4:
                case 5:
                case 6:
                case 7:
                    return CreatureType.Mammal;
                case 8:
                case 9:
                case 10:
                    return CreatureType.Bird;
                case 11:
                case 12:
                case 13:
                case 14:
                    return CreatureType.Plant;
                case 15:
                case 16:
                case 17:
                case 18:
                    return CreatureType.Fish;
                case 19:
                    return CreatureType.Gelatinous;
                case 20:
                    return CreatureType.Energy;
            }
            break;
        case Habitat.UpperAtmosphere:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    return CreatureType.Invertebrate;
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    return CreatureType.Bird;
                case 11:
                case 12:
                case 13:
                case 14:
                    return CreatureType.Mammal;
                case 15:
                case 16:
                case 17:
                case 18:
                    return CreatureType.Reptile;
                case 19:
                    return CreatureType.Gelatinous;
                case 20:
                    return CreatureType.Energy;
            }
            break;
        case Habitat.Space:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    return CreatureType.Invertebrate;
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    return CreatureType.Mammal;
                case 11:
                case 12:
                case 13:
                case 14:
                    return CreatureType.Reptile;
                case 15:
                case 16:
                case 17:
                    return CreatureType.Gelatinous;
                case 18:
                case 19:
                case 20:
                    return CreatureType.Energy;
            }
            break;
        default:
            return null;
        }
}
