import { D20 } from "../../common/die";
import { CreatureType } from "./creatureType";
import { Habitat } from "./habitat";

export enum LocomotionType {
    Legs,
    Slithering,
    Wings,
    Tentacles,
    Fins,
    Flippers,
    Roots
}

export class LocomotionTypeModel {

    id: LocomotionType;
    private name: string;

    constructor(id: LocomotionType, name: string) {
        this.id = id;
        this.name = name;
    }

    get localizedName() {
        return this.name;
    }
}

export class LocomotionModel {

    type: LocomotionTypeModel;
    count: number

    constructor(type: LocomotionTypeModel, count?: number) {
        this.type = type;
        this.count = count;
    }

    get description() {
        return this.count === undefined
            ? this.type.localizedName
            : (this.count + " " + this.type.localizedName);
    }
}

export class LocomotionTypeHelper {
    private static _instance: LocomotionTypeHelper;

    private items = [
        new LocomotionTypeModel(LocomotionType.Legs, "Legs"),
        new LocomotionTypeModel(LocomotionType.Slithering, "Slithering"),
        new LocomotionTypeModel(LocomotionType.Wings, "Wings"),
        new LocomotionTypeModel(LocomotionType.Tentacles, "Tentacles"),
        new LocomotionTypeModel(LocomotionType.Fins, "Fins"),
        new LocomotionTypeModel(LocomotionType.Flippers, "Flippers"),
        new LocomotionTypeModel(LocomotionType.Roots, "Roots"),
    ]

    static get instance() {
        if (LocomotionTypeHelper._instance == null) {
            LocomotionTypeHelper._instance = new LocomotionTypeHelper();
        }
        return LocomotionTypeHelper._instance;
    }

    getTypes() {
        return this.items;
    }

    getTypeById(id: LocomotionType) {
        let items = this.items.filter(h => h.id === id);
        return items?.length ? items[0] : undefined;
    }

    getTypeByIdName(name: string) {
        let items = this.items.filter(h => LocomotionType[h.id] === name);
        return items?.length ? items[0] : undefined;
    }
}

export const generateRandomLocomotionType = (type: CreatureType, habitat: Habitat) => {

    switch (type) {
        case CreatureType.Invertebrate:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Slithering))];
                case 5:
                case 6:
                case 7:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Tentacles), 2 + Math.floor(D20.roll() / 2))];
                case 8:
                case 9:
                case 10:
                case 11:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 4)];
                case 12:
                case 13:
                case 14:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 6)];
                case 15:
                case 16:
                case 17:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 8)];
                case 18:
                case 19:
                case 20:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 12)];
            }
            break;
        case CreatureType.Mammal:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(
                            habitat === Habitat.Ocean
                                ? LocomotionType.Flippers
                                : LocomotionType.Legs), 2)];
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(
                            habitat === Habitat.Ocean
                                ? LocomotionType.Flippers
                                : LocomotionType.Legs), 4)];
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(
                            habitat === Habitat.Ocean
                                ? LocomotionType.Flippers
                                : LocomotionType.Legs), 6)];
            }
            break;
        case CreatureType.Bird:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    return [
                        new LocomotionModel(
                            LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 2),
                        new LocomotionModel(
                            LocomotionTypeHelper.instance.getTypeById(LocomotionType.Wings), 4)];
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                    return [
                        new LocomotionModel(
                            LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 2),
                        new LocomotionModel(
                            LocomotionTypeHelper.instance.getTypeById(LocomotionType.Wings), 2)];
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                    return [
                        new LocomotionModel(
                            LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 4),
                        new LocomotionModel(
                            LocomotionTypeHelper.instance.getTypeById(LocomotionType.Wings), 2)];
            }
            break;
        case CreatureType.Reptile:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Slithering))];
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 2)];
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 4)];
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Legs), 6)];
            }
            break;
        case CreatureType.Amphibian:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Slithering))];
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Tentacles), 2 + Math.floor(D20.roll() / 2))];
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                    return [new LocomotionModel(
                            LocomotionTypeHelper.instance.getTypeById(
                                (habitat === Habitat.Ocean || habitat === Habitat.River)
                                    ? LocomotionType.Flippers
                                    : LocomotionType.Legs), 4)];
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(
                            (habitat === Habitat.Ocean || habitat === Habitat.River)
                                ? LocomotionType.Flippers
                                : LocomotionType.Legs), 6)];
            }
            break;
        case CreatureType.Plant: {
            return [new LocomotionModel(
                LocomotionTypeHelper.instance.getTypeById(LocomotionType.Roots), 2 + Math.floor(D20.roll() / 2))];
        }
        case CreatureType.Fish:
            switch (D20.roll()) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Fins), 2)];
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                    return [new LocomotionModel(
                        LocomotionTypeHelper.instance.getTypeById(LocomotionType.Fins), 4)];
            }
            break;
        default:
            return [];
    }
}