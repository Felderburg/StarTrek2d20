import { test, expect, describe } from '@jest/globals'
import { Sector, SectorCoordinates } from '../../../src/mapping/table/sector';

describe('SectorCoordinates', () => {
    test('stores coordinates', () => {
        const coords = new SectorCoordinates(1.5, 2.5, 3.5);
        expect(coords.x).toBe(1.5);
        expect(coords.y).toBe(2.5);
        expect(coords.z).toBe(3.5);
    });

    test('description formats correctly', () => {
        const coords = new SectorCoordinates(1.5, 2.5, 3.5);
        expect(coords.description).toBe("1.50, 2.50, 3.50");
    });

    test('distanceFromOrigin for origin', () => {
        const coords = new SectorCoordinates(0, 0, 0);
        expect(coords.distanceFromOrigin).toBe(0);
    });

    test('distanceFromOrigin for positive coordinates', () => {
        const coords = new SectorCoordinates(3, 4, 0);
        expect(coords.distanceFromOrigin).toBe(5);
    });

    test('distanceFromOrigin for negative coordinates', () => {
        const coords = new SectorCoordinates(-3, -4, 0);
        expect(coords.distanceFromOrigin).toBe(5);
    });
});

describe('Sector', () => {
    test('constructor creates sector with prefix', () => {
        const sector = new Sector("SCT");
        expect(sector.prefix).toBe("SCT");
    });

    test('id starts with prefix', () => {
        const sector = new Sector("ALPHA");
        expect(sector.id.startsWith("ALPHA-")).toBeTruthy();
    });

    test('simpleName defaults to id', () => {
        const sector = new Sector("TEST");
        expect(sector.simpleName).toBe(sector.id);
    });

    test('name returns simpleName when set', () => {
        const sector = new Sector("TEST");
        sector.simpleName = "My Sector";
        expect(sector.name).toBe("My Sector");
    });

    test('name returns id when simpleName is empty', () => {
        const sector = new Sector("TEST");
        sector.simpleName = "";
        expect(sector.name).toBe(sector.id);
    });

    test('plainText includes sector name', () => {
        const sector = new Sector("TEST");
        expect(sector.plainText).toContain("Sector: ");
    });

    test('sortedSystems returns empty for no systems', () => {
        const sector = new Sector("TEST");
        expect(sector.sortedSystems).toEqual([]);
    });
});
