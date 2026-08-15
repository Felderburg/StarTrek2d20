import { test, expect, describe } from '@jest/globals';
import { Era } from '../../src/helpers/erasEnum';

describe('Era enum', () => {
  test('includes all eras', () => {
    expect(Era.Enterprise).toBe(0);
    expect(Era.OriginalSeries).toBe(1);
    expect(Era.NextGeneration).toBe(2);
    expect(Era.PicardProdigy).toBe(3);
    expect(Era.Discovery32).toBe(4);
  });
});
