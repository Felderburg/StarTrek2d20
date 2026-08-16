import { test, expect, describe } from '@jest/globals';
import { Eras } from '../../src/helpers/eras';
import { Era } from '../../src/helpers/erasEnum';

describe('testing era helper', () => {
  test('should find era by name', () => {
    const era = Eras.instance.getEraByName('NextGeneration');
    expect(era).toBe(Era.NextGeneration);

    const era2 = Eras.instance.getEraByName('Enterprise');
    expect(era2).toBe(Era.Enterprise);
  });
});
