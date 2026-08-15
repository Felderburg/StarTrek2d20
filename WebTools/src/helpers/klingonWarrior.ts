import { CharacterType } from '../common/characterType';

/**
 * True when the construct is a first-edition Klingon Warrior. First-edition
 * Klingon Warriors use their own variant tables (career events, mission
 * profiles, environments), so the branch is a recurring domain concept.
 */
export const isKlingonWarrior1e = (type: CharacterType, version: number) =>
  type === CharacterType.KlingonWarrior && version === 1;

/**
 * True when the construct's type is the Klingon Warrior character type.
 * (Does not include the broader AlliedMilitary / Klingon Defence Force case
 * covered by Character.isKlingonWarrior().)
 */
export const isKlingonWarriorType = (type: CharacterType | undefined) =>
  type === CharacterType.KlingonWarrior;
