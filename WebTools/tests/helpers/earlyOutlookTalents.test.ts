import { test, expect, describe } from '@jest/globals'
import { Character, SpeciesStep } from '../../src/common/character';
import { CharacterType } from '../../src/common/characterType';
import { SelectedTalent } from '../../src/common/selectedTalent';
import { Species } from '../../src/helpers/speciesEnum';
import { Source } from '../../src/helpers/sources';
import { setSources } from '../../src/state/contextActions';
import store from '../../src/state/store';
import { getEarlyOutlookTalents } from '../../src/helpers/earlyOutlookTalents';
import { TALENT_NAME_BRAK_LUL } from '../../src/helpers/talents';

const localStorageMock = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
};
Object.defineProperty(global, 'window', { value: { localStorage: localStorageMock }, writable: true });

const klingonWarriorHelper = (braklulAlreadySelected: boolean) => {
    const character = new Character();
    character.type = CharacterType.KlingonWarrior;
    character.version = 1;
    character.speciesStep = new SpeciesStep(Species.Klingon);
    if (braklulAlreadySelected) {
        character.speciesStep.talent = new SelectedTalent(TALENT_NAME_BRAK_LUL);
    }
    store.dispatch(setSources([Source.KlingonCore]));
    return character;
};

describe('Early outlook talents for a 1st-edition Klingon Warrior', () => {
    test('forces Brak’lul when it has not yet been selected', () => {
        const character = klingonWarriorHelper(false);
        const talents = getEarlyOutlookTalents(character);
        expect(talents).toHaveLength(1);
        expect(talents[0].name).toBe(TALENT_NAME_BRAK_LUL);
    });

    test('does not force Brak’lul when it has already been selected', () => {
        const character = klingonWarriorHelper(true);
        const talents = getEarlyOutlookTalents(character);
        expect(talents.some(t => t.name === TALENT_NAME_BRAK_LUL)).toBe(false);
        expect(talents.length).toBeGreaterThan(1);
    });
});
