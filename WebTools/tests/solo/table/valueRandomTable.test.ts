import { test, expect, describe, jest } from '@jest/globals'
import { ValueRandomTable } from '../../../src/solo/table/valueRandomTable';

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
