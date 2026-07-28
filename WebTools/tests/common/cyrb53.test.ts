import { test, expect, describe } from '@jest/globals'
import { cyrb53 } from '../../src/common/cyrb53';

describe('cyrb53 hash function', () => {
    test('returns consistent hash for same input', () => {
        expect(cyrb53("test")).toBe(cyrb53("test"));
    });

    test('returns different hash for different inputs', () => {
        expect(cyrb53("hello")).not.toBe(cyrb53("world"));
    });

    test('returns a number', () => {
        expect(typeof cyrb53("anything")).toBe("number");
    });

    test('handles empty string', () => {
        expect(cyrb53("")).toBeGreaterThanOrEqual(0);
    });

    test('uses seed parameter', () => {
        expect(cyrb53("test", 0)).not.toBe(cyrb53("test", 1));
    });

    test('same seed gives same result', () => {
        expect(cyrb53("test", 42)).toBe(cyrb53("test", 42));
    });

    test('handles unicode characters', () => {
        expect(cyrb53("Klingon")).toBeGreaterThanOrEqual(0);
        expect(cyrb53("")).toBeGreaterThanOrEqual(0);
    });
});
