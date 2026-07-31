import { test, expect, describe, jest } from '@jest/globals'
import { ValueRandomTable, randomUniqueValue } from '../../../src/solo/table/valueRandomTable';

describe('ValueRandomTable', () => {
    test('returns a string', () => {
        const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
        const result = ValueRandomTable();
        expect(typeof result).toBe('string');
        spy.mockRestore();
    });

    test('can return the same value on successive rolls', () => {
        const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
        const first = ValueRandomTable();
        const second = ValueRandomTable();
        expect(first).toBe(second);
        spy.mockRestore();
    });
});

describe('randomUniqueValue', () => {
    test('returns a string', () => {
        const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
        const result = randomUniqueValue([]);
        expect(typeof result).toBe('string');
        spy.mockRestore();
    });

    test('rerolls when the rolled value is already assigned', () => {
        // With the default store, ValueRandomTable uses StandardValuesTable.
        // Math.random 0.5 rolls an 11, and 0.6 rolls a 13.
        const assigned = "Push me too far and you’ll see my ugly side";
        const rerolled = "Seeking to find myself far from home";

        // ValueRandomTable consumes two random values per attempt
        // (an unused outer roll and the StandardValuesTable roll).
        const randomValues = [0.5, 0.5, 0.5, 0.6];
        const spy = jest.spyOn(Math, 'random').mockImplementation(() => randomValues.shift());
        const result = randomUniqueValue([assigned]);
        expect(result).toBe(rerolled);
        spy.mockRestore();
    });

    test('never returns a value already assigned', () => {
        const assigned = ["A good mystery is irresistible", "Act with confidence, even if you don’t feel confident"];
        let calls = 0;
        const spy = jest.spyOn(Math, 'random').mockImplementation(() => {
            calls = (calls + 1) % 1000;
            return calls / 1000;
        });
        for (let i = 0; i < 50; i++) {
            const result = randomUniqueValue(assigned);
            expect(assigned).not.toContain(result);
        }
        spy.mockRestore();
    });
});
