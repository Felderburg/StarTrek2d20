import { D20 } from "../../common/die";

export enum DietType {
    Herbivore,
    Carnivore,
    Omnivore,
    MineralsOrMetal,
    Energy,
    PsychicEnergy,
}

export class DietTypeModel {

    id: DietType;
    private name: string;

    constructor(id: DietType, name: string) {
        this.id = id;
        this.name = name;
    }

    get localizedName() {
        return this.name;
    }
}

export class DietTypeHelper {
    private static _instance: DietTypeHelper;

    private items = [
        new DietTypeModel(DietType.Herbivore, "Herbivore"),
        new DietTypeModel(DietType.Carnivore, "Carnivore"),
        new DietTypeModel(DietType.Omnivore, "Omnivore"),
        new DietTypeModel(DietType.MineralsOrMetal, "Minerals or Metal"),
        new DietTypeModel(DietType.Energy, "Energy"),
        new DietTypeModel(DietType.PsychicEnergy, "Psychic Energy"),
    ];

    static get instance() {
        if (DietTypeHelper._instance == null) {
            DietTypeHelper._instance = new DietTypeHelper();
        }
        return DietTypeHelper._instance;
    }

    getTypes() {
        return this.items;
    }

    getTypeById(id: DietType) {
        let items = this.items.filter(h => h.id === id);
        return items?.length ? items[0] : undefined;
    }

    getTypeByIdName(name: string) {
        let items = this.items.filter(h => DietType[h.id] === name);
        return items?.length ? items[0] : undefined;
    }
}

export const createRandomDiet = () => {

    switch (D20.roll()) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            return DietType.Herbivore;
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            return DietType.Carnivore;
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
            return DietType.Omnivore;
        case 20:
            return createRandomEsotericDietType();
    }
}

export const createRandomEsotericDietType = () => {

    switch (D20.roll()) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            return DietType.Energy;
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
            return DietType.MineralsOrMetal;
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
            return DietType.PsychicEnergy;
    }
}