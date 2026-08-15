import { test, expect, describe } from '@jest/globals';
import { createRandomValue } from '../../src/common/randomValueGenerator';

describe('random value generator', () => {
  test('returns a string', () => {
    expect(typeof createRandomValue()).toBe('string');
  });

  test('returns default length of 6', () => {
    expect(createRandomValue().length).toBe(6);
  });

  test('returns custom length', () => {
    expect(createRandomValue(10).length).toBe(10);
    expect(createRandomValue(4).length).toBe(4);
    expect(createRandomValue(1).length).toBe(1);
  });

  test('only contains alphanumeric characters', () => {
    const result = createRandomValue(100);
    expect(result).toMatch(/^[0-9A-Z]+$/);
  });

  test('generates different values on successive calls', () => {
    const a = createRandomValue();
    const b = createRandomValue();
    expect(a).not.toBe(b);
  });
});
