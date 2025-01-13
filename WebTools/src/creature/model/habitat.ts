import { D20 } from "../../common/die";

export enum Habitat {

    Caves,
    Desert,
    Forest,
    Hills,
    Jungle,
    Mountains,
    Ocean,
    Plains,
    River,
    Space,
    Swamp,
    UpperAtmosphere,
}

export class HabitatModel {

    id: Habitat;
    private name: string;

    constructor(id: Habitat, name: string) {
        this.id = id;
        this.name = name;
    }

    get localizedName() {
        return this.name;
    }
}

export class HabitatHelper {
    private static _instance: HabitatHelper;

    private items = [
        new HabitatModel(Habitat.Caves, "Caves"),
        new HabitatModel(Habitat.Desert, "Desert"),
        new HabitatModel(Habitat.Forest, "Forest"),
        new HabitatModel(Habitat.Hills, "Hills"),
        new HabitatModel(Habitat.Jungle, "Jungle"),
        new HabitatModel(Habitat.Mountains, "Mountains"),
        new HabitatModel(Habitat.Ocean, "Ocean"),
        new HabitatModel(Habitat.Plains, "Plains"),
        new HabitatModel(Habitat.River, "River"),
        new HabitatModel(Habitat.Space, "Space"),
        new HabitatModel(Habitat.Swamp, "Swamp"),
        new HabitatModel(Habitat.UpperAtmosphere, "Upper Atmosphere"),
    ]

    static get instance() {
        if (HabitatHelper._instance == null) {
            HabitatHelper._instance = new HabitatHelper();
        }
        return HabitatHelper._instance;
    }

    getTypes() {
        return this.items;
    }

    getTypeById(id: Habitat) {
        let items = this.items.filter(h => h.id === id);
        return items?.length ? items[0] : undefined;
    }

    getTypeByIdName(name: string) {
        let items = this.items.filter(h => Habitat[h.id] === name);
        return items?.length ? items[0] : undefined;

    }
}

export const createRandomHabitat = () => {

    switch (D20.roll()) {
        case 1:
        case 2:
            return Habitat.Caves;
        case 3:
        case 4:
            return Habitat.Desert;
        case 5:
        case 6:
            return Habitat.Forest;
        case 7:
        case 8:
            return Habitat.Hills;
        case 9:
        case 10:
            return Habitat.Jungle;
        case 11:
        case 12:
            return Habitat.Mountains;
        case 13:
        case 14:
            return Habitat.Ocean;
        case 15:
        case 16:
            return Habitat.Plains;
        case 17:
            return Habitat.Space;
        case 18:
        case 19:
            return Habitat.Swamp;
        case 20:
            return Habitat.UpperAtmosphere;
    }
}