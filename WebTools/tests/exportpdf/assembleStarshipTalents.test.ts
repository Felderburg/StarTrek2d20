import { test, expect, describe } from '@jest/globals'
import '../../src/helpers/species';
import { Starship } from '../../src/common/starship';
import { CharacterType } from '../../src/common/characterType';
import { Era } from '../../src/helpers/erasEnum';
import { SelectedTalent } from '../../src/common/selectedTalent';
import { TALENT_NAME_CUSTOM_TALENT } from '../../src/helpers/talents';
import { assembleStarshipTalents } from '../../src/exportpdf/generatedsheet';
import { ReadableTalentModel } from '../../src/exportpdf/talentWriter';

jest.mock('i18next', () => {
    const mockI18n: any = (key: string) => key;
    mockI18n.t = (key: string) => key;
    mockI18n.use = function () { return this; };
    mockI18n.init = function () { return this; };
    mockI18n.on = function () { return this; };
    mockI18n.changeLanguage = function () { return Promise.resolve(); };
    return mockI18n;
});

jest.mock('../../src/state/store', () => {
    const core2ndEdition = 1;
    return {
        getState: () => ({ context: { sources: [core2ndEdition] } }),
        dispatch: () => undefined,
    };
});

function customTalent(name: string, description: string) {
    const talent = new SelectedTalent(TALENT_NAME_CUSTOM_TALENT);
    talent.customTalentName = name;
    talent.customTalentDescription = description;
    return talent;
}

function shipWithMixedCustomAndStandardTalents() {
    const starship = Starship.createStandardStarship(Era.NextGeneration, CharacterType.Starfleet, 2);
    starship.additionalTalents = [
        customTalent('Advanced Transporters', 'Custom description one'),
        customTalent('Anti-Cloak Sensors', 'Custom description two'),
        customTalent('Backup EPS Conduits', 'Custom description three'),
        new SelectedTalent('High-Intensity Energy Weapons'),
        new SelectedTalent('Improved Power Systems'),
        customTalent('Rapid Fire Torpedo Launcher', 'Custom description four'),
    ];
    return starship;
}

describe('assembleStarshipTalents (#326)', () => {
    test('includes every custom talent, not just the first one', () => {
        const starship = shipWithMixedCustomAndStandardTalents();
        const talents = assembleStarshipTalents(starship, false) as ReadableTalentModel[];

        const names = talents.map(t => t.talent.localizedName);
        expect(names).toContain('High-Intensity Energy Weapons');
        expect(names).toContain('Improved Power Systems');

        const customNames = talents
            .filter(t => t.talent.name === TALENT_NAME_CUSTOM_TALENT)
            .map(t => t.customTalentName);
        expect(customNames).toEqual([
            'Advanced Transporters',
            'Anti-Cloak Sensors',
            'Backup EPS Conduits',
            'Rapid Fire Torpedo Launcher',
        ]);
    });

    test('returns all six talents of a simplified-build ship', () => {
        const starship = shipWithMixedCustomAndStandardTalents();
        const talents = assembleStarshipTalents(starship, false);

        expect(talents.length).toBe(6);
    });
});
