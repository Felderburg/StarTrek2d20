import { test, expect, describe } from '@jest/globals'
import { SpaceframeVariantModel, SpaceframeVariant } from '../../src/helpers/spaceframeVariant';
import { Spaceframe } from '../../src/helpers/spaceframeEnum';

describe('SpaceframeVariantModel', () => {
    test('ALL has all variants', () => {
        expect(SpaceframeVariantModel.ALL.length).toBe(5);
    });

    test('stores id', () => {
        const v = new SpaceframeVariantModel(SpaceframeVariant.Excelsior);
        expect(v.id).toBe(SpaceframeVariant.Excelsior);
    });

    test('variantsBySpaceframe returns Excelsior variants', () => {
        const variants = SpaceframeVariantModel.variantsBySpaceframe(Spaceframe.Excelsior);
        expect(variants.length).toBe(2);
        expect(variants.map(v => v.id)).toContain(SpaceframeVariant.Excelsior);
        expect(variants.map(v => v.id)).toContain(SpaceframeVariant.EnterpriseBVariant);
    });

    test('variantsBySpaceframe returns Constitution variants', () => {
        const variants = SpaceframeVariantModel.variantsBySpaceframe(Spaceframe.Constitution);
        expect(variants.length).toBe(3);
        expect(variants.map(v => v.id)).toContain(SpaceframeVariant.OriginalSeries);
        expect(variants.map(v => v.id)).toContain(SpaceframeVariant.OriginalSeriesMovies);
    });

    test('variantsBySpaceframe returns empty for unknown', () => {
        const variants = SpaceframeVariantModel.variantsBySpaceframe(999 as Spaceframe);
        expect(variants).toEqual([]);
    });

    test('variantCodeByName finds by name', () => {
        const code = SpaceframeVariantModel.variantCodeByName("Excelsior");
        expect(code).toBe(SpaceframeVariant.Excelsior);
    });

    test('variantCodeByName returns undefined for unknown', () => {
        expect(SpaceframeVariantModel.variantCodeByName("Nonexistent")).toBeUndefined();
    });
});
