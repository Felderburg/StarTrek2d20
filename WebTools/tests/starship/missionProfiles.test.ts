import { test, expect, describe } from '@jest/globals'
import '../../src/helpers/species';
import { Starship } from '../../src/common/starship';
import { CharacterType } from '../../src/common/characterType';
import { Era } from '../../src/helpers/erasEnum';
import MissionProfiles from '../../src/helpers/missionProfiles';

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

function createStarship(type: CharacterType, version: number) {
    return Starship.createStandardStarship(Era.NextGeneration, type, version);
}

describe('MissionProfiles', () => {
    describe('getMissionProfiles', () => {
        test('returns 2e Core profiles with systems for a 2e Starfleet ship', () => {
            const profiles = MissionProfiles.instance.getMissionProfiles(createStarship(CharacterType.Starfleet, 2));

            expect(profiles.length).toBeGreaterThan(0);
            expect(profiles.every(p => p.systems.length > 0)).toBe(true);
            expect(profiles.some(p => p.type === CharacterType.KlingonWarrior)).toBe(false);
        });

        test('returns the Starfleet 2e profiles for a 2e Klingon Warrior ship', () => {
            const starfleetProfiles = MissionProfiles.instance.getMissionProfiles(createStarship(CharacterType.Starfleet, 2));
            const klingonProfiles = MissionProfiles.instance.getMissionProfiles(createStarship(CharacterType.KlingonWarrior, 2));

            expect(klingonProfiles.map(p => p.id)).toEqual(starfleetProfiles.map(p => p.id));
            expect(klingonProfiles.some(p => p.type === CharacterType.KlingonWarrior)).toBe(false);
        });

        test('returns Klingon Core profiles without systems for a 1e Klingon Warrior ship', () => {
            const profiles = MissionProfiles.instance.getMissionProfiles(createStarship(CharacterType.KlingonWarrior, 1));

            expect(profiles.length).toBeGreaterThan(0);
            expect(profiles.every(p => p.type === CharacterType.KlingonWarrior)).toBe(true);
            expect(profiles.every(p => p.systems.length === 0)).toBe(true);
        });

        test('returns 1e Core profiles for a 1e Starfleet ship', () => {
            const profiles = MissionProfiles.instance.getMissionProfiles(createStarship(CharacterType.Starfleet, 1));

            expect(profiles.length).toBeGreaterThan(0);
            expect(profiles.some(p => p.type === CharacterType.KlingonWarrior)).toBe(false);
        });
    });
});
