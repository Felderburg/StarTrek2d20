
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

    items = [
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
}