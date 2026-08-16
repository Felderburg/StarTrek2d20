import { Era } from '../helpers/erasEnum';
import type { Weapon } from '../helpers/weapons';
import { CharacterType } from './characterType';
import type { IConstruct } from './iconstruct';
import type { IWeaponDiceProvider } from './iWeaponDiceProvider';

export enum Stereotype {
  MainCharacter,
  SoloCharacter,
  SupportingCharacter,
  Npc,

  Starship,
  SimpleStarship,
  SoloStarship,

  Station,

  Creature,
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

  determineWeapons(): Weapon[] {
    return [];
  }

  hasTalent(talentName: string) {
    return false;
  }

  getDiceForWeapon(weapon: Weapon) {
    return weapon.dice;
  }
}
