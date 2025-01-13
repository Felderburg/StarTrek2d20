import { test, expect, describe } from '@jest/globals'
import { creatureNameGenerator } from '../../../src/creature/model/creatureNameGenerator';

describe('test name generation', () => {
    test('should generate a name', () => {

        let name = creatureNameGenerator();

        expect(name?.length).toBeGreaterThan(0);
    });
});