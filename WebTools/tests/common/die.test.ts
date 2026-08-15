import { test, expect, describe } from '@jest/globals';
import { D20, D6 } from '../../src/common/die';

describe('testing D20 rolls', () => {
  test('should always be between 1 and 20', () => {
    let min = 999,
      max = 0;
    for (let i = 0; i < 100; i++) {
      const roll = D20.roll();
      min = Math.min(min, roll);
      max = Math.max(max, roll);
    }

    expect(min >= 1).toBeTruthy();
    expect(max <= 20).toBeTruthy();
  });

  test('single roll returns number between 1 and 20', () => {
    for (let i = 0; i < 50; i++) {
      const roll = D20.roll();
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(20);
    }
  });

  test('multiple rolls sum correctly', () => {
    for (let i = 0; i < 20; i++) {
      const roll = D20.roll(2);
      expect(roll).toBeGreaterThanOrEqual(2);
      expect(roll).toBeLessThanOrEqual(40);
    }
  });
});

describe('testing D6 rolls', () => {
  test('rollFace returns D6RollResult', () => {
    const result = D6.rollFace();
    expect(result).toBeDefined();
    expect(typeof result.value).toBe('number');
  });

  test('rollFace value is 0, 1, or 2', () => {
    const validValues = [0, 1, 2];
    for (let i = 0; i < 50; i++) {
      const result = D6.rollFace();
      expect(validValues).toContain(result.value);
    }
  });

  test('isEffect is boolean', () => {
    for (let i = 0; i < 50; i++) {
      const result = D6.rollFace();
      expect(typeof result.isEffect).toBe('boolean');
    }
  });

  test('value 2 means no effect', () => {
    for (let i = 0; i < 50; i++) {
      const result = D6.rollFace();
      if (result.value === 2) {
        expect(result.isEffect).toBeFalsy();
      }
    }
  });

  test('value 0 means no effect', () => {
    for (let i = 0; i < 50; i++) {
      const result = D6.rollFace();
      if (result.value === 0) {
        expect(result.isEffect).toBeFalsy();
      }
    }
  });
});
