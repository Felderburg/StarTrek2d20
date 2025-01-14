import { Era } from "../helpers/eras";
import { Weapon } from "../helpers/weapons";
import { CharacterType } from "./characterType";
import { IConstruct } from "./iconstruct";
import { IWeaponDiceProvider } from "./iWeaponDiceProvider";

export enum ConstructType {
    Character,
    Starship
}

export enum Stereotype {
    MainCharacter,
    SoloCharacter,
    SupportingCharacter,
    Npc,

    Starship,
    SimpleStarship,
    SoloStarship,

    Creature
}

export abstract class Construct implements IConstruct, IWeaponDiceProvider {
    public stereotype: Stereotype;
    public name?: string;
    public type: CharacterType = CharacterType.Starfleet;
    public era: Era = Era.NextGeneration;

    // which version of rules are we using?
    public version: number = 1;

    constructor(stereotype: Stereotype) {
        this.stereotype = stereotype;
    }

    determineWeapons() : Weapon[] {
        return [];
    }

    hasTalent(talentName: string) {
        return false;
    }

    getDiceForWeapon(weapon: Weapon) {
        return weapon.dice;
    }
}
