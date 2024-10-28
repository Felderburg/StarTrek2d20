import { test, expect, describe } from '@jest/globals'
import { randomStarshipEvent } from '../../../src/starship/model/randomStarshipEvent';
import { IServiceYearProvider } from '../../../src/common/serviceYearProvider';

class MockSpaceframe implements IServiceYearProvider {
    serviceYear: number = 2365;
}

describe('testing event selector', () => {
    test('should produce event', () => {
        let model = new MockSpaceframe();

        for (let i = 0; i < 20; i++) {
            let event = randomStarshipEvent(model, 2385);
            expect(event).toBeDefined();
        }
    });
});