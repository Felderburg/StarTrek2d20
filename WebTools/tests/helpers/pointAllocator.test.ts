import { test, expect, describe } from '@jest/globals'
import PointAllocator from '../../src/helpers/pointAllocator';

describe('testing point allocator', () => {
    test('should assign points randomly', () => {
        for (let i = 0; i < 100; i++) {
            const points = PointAllocator.allocatePointsRandomly(66);
            expect(points[0]).toBeLessThanOrEqual(12);
            expect(points[1]).toBeLessThanOrEqual(12);
            expect(points[2]).toBeLessThanOrEqual(12);
            expect(points[3]).toBeLessThanOrEqual(12);
            expect(points[4]).toBeLessThanOrEqual(12);
            expect(points[5]).toBeLessThanOrEqual(12);
        }
    });
});