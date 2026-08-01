import { test, expect, describe } from '@jest/globals'
import { Character, EnvironmentStep } from '../../src/common/character';
import { CharacterType } from '../../src/common/characterType';
import { Era } from '../../src/helpers/erasEnum';
import { Environment } from '../../src/helpers/environments';
import { Department } from '../../src/helpers/department';
import { PersonalWeapons } from '../../src/helpers/weapons';

function characterWithSecurityBonus(version: 1 | 2) {
    const character = Character.createMainCharacter(CharacterType.Starfleet, Era.NextGeneration, version);
    character.environmentStep = new EnvironmentStep(Environment.FrontierColony);
    character.environmentStep.discipline = Department.Security;
    return character;
}

describe('Character.getDiceForWeapon', () => {
    test('1e characters add the Security bonus to weapon dice', () => {
        const character = characterWithSecurityBonus(1);
        const phaser = PersonalWeapons.instance(1).phaser2;

        expect(character.departments[Department.Security]).toBeGreaterThan(0);
        expect(character.getDiceForWeapon(phaser)).toBe(phaser.dice + character.departments[Department.Security]);
    });

    test('2e characters do not add the Security bonus to weapon dice (#225)', () => {
        const character = characterWithSecurityBonus(2);
        const phaser = PersonalWeapons.instance(2).phaser2;

        expect(character.departments[Department.Security]).toBeGreaterThan(0);
        expect(character.getDiceForWeapon(phaser)).toBe(phaser.dice);
    });
});
