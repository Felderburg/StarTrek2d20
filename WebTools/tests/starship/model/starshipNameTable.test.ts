import { test, expect, describe } from '@jest/globals'
import { Era } from '../../../src/helpers/eras';
import { StarshipRandomNameTable } from '../../../src/starship/model/starshipNameTable';
import { RandomStarshipCharacterType } from '../../../src/starship/model/randomStarshipCharacterTypes';
import { CharacterType } from '../../../src/common/characterType';

describe('testing name generator', () => {
    test('should produce name', () => {
        for (let i = 0; i < 100; i++) {
            let name = StarshipRandomNameTable(Era.NextGeneration, RandomStarshipCharacterType.Starfleet, CharacterType.Starfleet);
            expect(name).toBeDefined();
        }
    });
});