import { test, expect, describe } from '@jest/globals'
import { Species } from '../../src/helpers/speciesEnum';

describe('Species enum', () => {
    test('includes core species', () => {
        expect(Species.Human).toBeDefined();
        expect(Species.Vulcan).toBeDefined();
        expect(Species.Klingon).toBeDefined();
        expect(Species.Romulan).toBeDefined();
    });

    test('values are numbers', () => {
        expect(typeof Species.Human).toBe("number");
        expect(typeof Species.Betazoid).toBe("number");
    });
});
