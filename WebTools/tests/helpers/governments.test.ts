import { test, expect, describe } from '@jest/globals'
import Governments, { Government, Polity } from '../../src/helpers/governments';

describe('Government', () => {
    test('stores properties', () => {
        const gov = new Government("Federation", Polity.Federation, 0, 1, 2);
        expect(gov.name).toBe("Federation");
        expect(gov.type).toBe(Polity.Federation);
    });

    test('eras are stored', () => {
        const gov = new Government("Federation", Polity.Federation, 0, 1);
        expect(gov.eras).toContain(0);
        expect(gov.eras).toContain(1);
    });
});

describe('Governments helper', () => {
    test('has government options', () => {
        expect(Governments.options.length).toBeGreaterThan(0);
    });

    test('includes Federation', () => {
        const fed = Governments.options.filter(g => g.type === Polity.Federation);
        expect(fed.length).toBeGreaterThan(0);
        expect(fed[0].name).toBe("Federation");
    });

    test('includes Klingon', () => {
        const kli = Governments.options.filter(g => g.type === Polity.Klingon);
        expect(kli.length).toBeGreaterThan(0);
    });
});
