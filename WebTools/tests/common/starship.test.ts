import { test, expect, describe } from '@jest/globals'
import '../../src/helpers/species';
import { Starship } from '../../src/common/starship';
import { CharacterType } from '../../src/common/characterType';
import { Era } from '../../src/helpers/erasEnum';
import { SpaceframeHelper } from '../../src/helpers/spaceframes';
import { Spaceframe } from '../../src/helpers/spaceframeEnum';

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
    const core2ndEdition = 1; // Source.Core2ndEdition
    return {
        getState: () => ({ context: { sources: [core2ndEdition] } }),
        dispatch: () => undefined,
    };
});

function mirandaSpaceframe(frame: Spaceframe) {
    return SpaceframeHelper.instance().getSpaceframe(frame);
}

function createMiranda(frame: Spaceframe, serviceYear: number, version: number) {
    const ship = Starship.createStandardStarship(Era.NextGeneration, CharacterType.Starfleet, version);
    ship.spaceframeModel = mirandaSpaceframe(frame);
    ship.serviceYear = serviceYear;
    return ship;
}

describe('Miranda class refit schedule', () => {
    test('2e Miranda uses the 2274 redesign date as its refit baseline', () => {
        expect(mirandaSpaceframe(Spaceframe.Miranda_2E).serviceYearForRefitCalculation).toBe(2274);
    });

    test('2e Miranda has 9 refits at the default 2371 service year', () => {
        expect(createMiranda(Spaceframe.Miranda_2E, 2371, 2).numberOfRefits).toBe(9);
    });

    test('1e Core Miranda already uses the 2274 redesign date as its service year', () => {
        expect(mirandaSpaceframe(Spaceframe.Miranda).serviceYear).toBe(2274);
        expect(createMiranda(Spaceframe.Miranda, 2371, 1).numberOfRefits).toBe(9);
    });

    test('Utopia Planitia Miranda uses the 2264 launch date as its refit baseline', () => {
        expect(mirandaSpaceframe(Spaceframe.Miranda_UP).serviceYearForRefitCalculation).toBe(2264);
        expect(createMiranda(Spaceframe.Miranda_UP, 2371, 1).numberOfRefits).toBe(10);
    });

    test('non-Miranda spaceframes use their service year as the refit baseline', () => {
        expect(mirandaSpaceframe(Spaceframe.Oberth).serviceYearForRefitCalculation)
            .toBe(mirandaSpaceframe(Spaceframe.Oberth).serviceYear);
    });
});
