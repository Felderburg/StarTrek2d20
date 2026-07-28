import { test, expect, describe } from '@jest/globals'
import AllyHelper, { AlliedMilitary, AlliedMilitaryType, allAlliedMilitaryTypes } from '../../src/helpers/alliedMilitary';
import { Species } from '../../src/helpers/speciesEnum';
import { Era } from '../../src/helpers/erasEnum';

describe('AlliedMilitary', () => {
    test('stores properties', () => {
        const am = new AlliedMilitary("Test", AlliedMilitaryType.Maco, [Species.Human], Era.Enterprise);
        expect(am.name).toBe("Test");
        expect(am.type).toBe(AlliedMilitaryType.Maco);
        expect(am.species).toContain(Species.Human);
    });

    test('eras are stored', () => {
        const am = new AlliedMilitary("Test", AlliedMilitaryType.Other, [], Era.Enterprise, Era.NextGeneration);
        expect(am.eras).toContain(Era.Enterprise);
        expect(am.eras).toContain(Era.NextGeneration);
    });
});

describe('allAlliedMilitaryTypes', () => {
    test('returns all types', () => {
        const types = allAlliedMilitaryTypes();
        expect(types.length).toBeGreaterThan(0);
        expect(types).toContain(AlliedMilitaryType.Maco);
        expect(types).toContain(AlliedMilitaryType.KlingonDefenceForce);
    });
});

describe('AllyHelper', () => {
    test('singleton', () => {
        expect(AllyHelper.instance).toBe(AllyHelper.instance);
    });

    test('options has entries', () => {
        expect(AllyHelper.instance.options.length).toBeGreaterThan(0);
    });

    test('findOption finds by type', () => {
        const option = AllyHelper.instance.findOption(AlliedMilitaryType.KlingonDefenceForce);
        expect(option).toBeDefined();
        expect(option.name).toBe("Klingon Defence Force");
    });

    test('findOption returns undefined for unknown', () => {
        expect(AllyHelper.instance.findOption(999 as AlliedMilitaryType)).toBeUndefined();
    });

    test('findTypeByName finds by name', () => {
        const type = AllyHelper.instance.findTypeByName("Maco");
        expect(type).toBe(AlliedMilitaryType.Maco);
    });

    test('findTypeByName returns undefined for unknown', () => {
        expect(AllyHelper.instance.findTypeByName("Nonexistent")).toBeUndefined();
    });

    test('selectOptions filters by era', () => {
        const options = AllyHelper.instance.selectOptions(Era.Enterprise, true);
        expect(options.length).toBeGreaterThan(0);
        options.forEach(o => expect(o.eras).toContain(Era.Enterprise));
    });

    test('selectOptions excludes klingon when flag is false', () => {
        const options = AllyHelper.instance.selectOptions(Era.OriginalSeries, false);
        options.forEach(o => expect(o.type).not.toBe(AlliedMilitaryType.KlingonDefenceForce));
    });
});
