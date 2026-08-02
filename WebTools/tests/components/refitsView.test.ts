import { test, expect, describe, jest } from '@jest/globals'
import { RefitsView } from '../../src/components/refitsView';
import { System } from '../../src/helpers/systems';

function createMockStarship(baseValues: number[], currentValues: number[]) {
    return {
        getBaseSystem: (system: System) => baseValues[system],
        getSystemValue: (system: System) => currentValues[system],
    } as any;
}

function createRefits(starship: any, refits: System[], points: number) {
    const props = {
        starship,
        refits,
        points,
        t: ((key: string) => key) as any,
        i18n: {} as any,
        tReady: true,
    };
    const instance = new RefitsView(props as any);
    (instance as any).forceUpdate = jest.fn();
    return instance;
}

describe('Refits', () => {
    describe('currentValue', () => {
        test('returns starship system value', () => {
            const starship = createMockStarship([0, 0, 0, 0, 0, 0], [3, 4, 5, 2, 1, 6]);
            const refits = createRefits(starship, [], 0);
            expect(refits.currentValue(System.Comms)).toBe(3);
            expect(refits.currentValue(System.Weapons)).toBe(6);
        });
    });

    describe('showDecrease', () => {
        test('returns true when current exceeds base', () => {
            const starship = createMockStarship([3, 0, 0, 0, 0, 0], [4, 0, 0, 0, 0, 0]);
            const refits = createRefits(starship, [System.Comms], 1);
            expect(refits.showDecrease(System.Comms)).toBe(true);
        });

        test('returns false when current equals base', () => {
            const starship = createMockStarship([3, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0]);
            const refits = createRefits(starship, [], 0);
            expect(refits.showDecrease(System.Comms)).toBe(false);
        });
    });

    describe('showIncrease', () => {
        test('returns true when system refit count below 2 and points remain', () => {
            const starship = createMockStarship([0, 0, 0, 0, 0, 0], [5, 0, 0, 0, 0, 0]);
            const refits = createRefits(starship, [System.Computer], 3);
            expect(refits.showIncrease(System.Comms)).toBe(true);
        });

        test('returns false when no refit points remain', () => {
            const starship = createMockStarship([0, 0, 0, 0, 0, 0], [5, 0, 0, 0, 0, 0]);
            const refits = createRefits(starship, [System.Comms, System.Weapons, System.Engines], 3);
            expect(refits.showIncrease(System.Comms)).toBe(false);
        });

        test('returns false when system already has 2 refits', () => {
            const starship = createMockStarship([0, 0, 0, 0, 0, 0], [11, 0, 0, 0, 0, 0]);
            const refits = createRefits(starship, [System.Comms, System.Comms], 3);
            expect(refits.showIncrease(System.Comms)).toBe(false);
        });

        test('allows increase with 1 refit already on the system', () => {
            const starship = createMockStarship([0, 0, 0, 0, 0, 0], [10, 3, 3, 3, 3, 3]);
            const refits = createRefits(starship, [System.Comms], 3);
            expect(refits.showIncrease(System.Comms)).toBe(true);
        });

        test('allows increase on different systems independently', () => {
            const starship = createMockStarship([0, 0, 0, 0, 0, 0], [5, 5, 5, 5, 5, 5]);
            const refits = createRefits(starship, [System.Comms, System.Comms], 3);
            expect(refits.showIncrease(System.Comms)).toBe(false);
            expect(refits.showIncrease(System.Weapons)).toBe(true);
            expect(refits.showIncrease(System.Engines)).toBe(true);
        });
    });
});
