import { test, expect, describe } from '@jest/globals'
import { Character } from '../../src/common/character';
import { CharacterType } from '../../src/common/characterType';
import { Era } from '../../src/helpers/erasEnum';
import { Source } from '../../src/helpers/sources';
import { setSources } from '../../src/state/contextActions';
import store from '../../src/state/store';
import { TalentsHelper } from '../../src/helpers/talents';

const localStorageMock = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
};
Object.defineProperty(global, 'window', { value: { localStorage: localStorageMock }, writable: true });

describe('Supporting Character talents', () => {
    test('Constant Presence is available to a supporting character', () => {
        const supporting = Character.createSupportingCharacter(Era.NextGeneration, 1);
        store.dispatch(setSources([Source.PlayersGuide]));
        const talents = TalentsHelper.getAllAvailableTalentsForCharacter(supporting);
        expect(talents.some(t => t.name === 'Constant Presence')).toBe(true);
    });

    test('Constant Presence is not available to a main character', () => {
        const main = Character.createMainCharacter(CharacterType.Starfleet, Era.NextGeneration, 1);
        store.dispatch(setSources([Source.PlayersGuide]));
        const talents = TalentsHelper.getAllAvailableTalentsForCharacter(main);
        expect(talents.some(t => t.name === 'Constant Presence')).toBe(false);
    });
});
