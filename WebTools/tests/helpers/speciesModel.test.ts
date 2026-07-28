import { test, expect, describe } from '@jest/globals'
import { SpeciesModel, BasicAttributeHandler } from '../../src/helpers/speciesModel';
import { Species } from '../../src/helpers/speciesEnum';
import { Source } from '../../src/helpers/sources';
import { Attribute } from '../../src/helpers/attributes';
import { Era } from '../../src/helpers/erasEnum';

describe('BasicAttributeHandler', () => {
    test('stores attributes', () => {
        const handler = new BasicAttributeHandler([Attribute.Control, Attribute.Daring]);
        expect(handler.attributes).toContain(Attribute.Control);
        expect(handler.attributes).toContain(Attribute.Daring);
        expect(handler.decrementAttributes).toEqual([]);
    });

    test('stores decrement attributes', () => {
        const handler = new BasicAttributeHandler([Attribute.Control, Attribute.Daring], [Attribute.Fitness]);
        expect(handler.decrementAttributes).toContain(Attribute.Fitness);
    });
});

describe('SpeciesModel', () => {
    const model = new SpeciesModel(
        Species.Vulcan,
        "Vulcan",
        [Era.Enterprise, Era.OriginalSeries],
        [Source.Core],
        ["Vulcans are logical."],
        [Attribute.Reason, Attribute.Control],
        "Vulcan Logic",
        "Vulcans are known for their logic.",
        ["Soval", "T'Pol", "Spock"],
        [],
        "Vulcan naming",
        []
    );

    test('stores basic properties', () => {
        expect(model.id).toBe(Species.Vulcan);
        expect(model.name).toBe("Vulcan");
    });

    test('attributes and decrementAttributes from handler', () => {
        expect(model.attributes).toContain(Attribute.Reason);
        expect(model.decrementAttributes).toEqual([]);
    });

    test('isAttributeSelectionRequired returns false when defined count <= 3', () => {
        expect(model.isAttributeSelectionRequired).toBeFalsy();
    });

    test('exampleValues from string array', () => {
        expect(model.exampleValues).toContain("Soval");
        expect(model.exampleValues).toContain("Spock");
    });

    test('isMixedSpeciesAllowed defaults to true', () => {
        expect(model.isMixedSpeciesAllowed).toBeTruthy();
    });

    test('talents is initialized', () => {
        expect(model.talents).toEqual([]);
    });
});
