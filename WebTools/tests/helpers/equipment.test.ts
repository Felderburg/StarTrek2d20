import { test, expect, describe } from '@jest/globals'
import { EquipmentModel, EquipmentType, EquipmentHelper } from '../../src/helpers/equipment';

describe('EquipmentModel', () => {
    test('stores properties', () => {
        const item = new EquipmentModel(EquipmentType.Communicator, "Communicator");
        expect(item.type).toBe(EquipmentType.Communicator);
        expect(item.name).toBe("Communicator");
    });

    test('stores optional description and protection', () => {
        const item = new EquipmentModel(EquipmentType.BodyArmour, "Body Armour", "Standard issue", 2);
        expect(item.description).toBe("Standard issue");
        expect(item.protection).toBe(2);
    });

    test('isArmour returns true for armour types', () => {
        expect(new EquipmentModel(EquipmentType.BodyArmour, "x").isArmour).toBeTruthy();
        expect(new EquipmentModel(EquipmentType.ArmouredVest, "x").isArmour).toBeTruthy();
        expect(new EquipmentModel(EquipmentType.EnvironmentSuit, "x").isArmour).toBeTruthy();
        expect(new EquipmentModel(EquipmentType.PersonalForceField, "x").isArmour).toBeTruthy();
    });

    test('isArmour returns false for non-armour types', () => {
        expect(new EquipmentModel(EquipmentType.Communicator, "x").isArmour).toBeFalsy();
        expect(new EquipmentModel(EquipmentType.Tricorder, "x").isArmour).toBeFalsy();
        expect(new EquipmentModel(EquipmentType.Other, "x").isArmour).toBeFalsy();
    });

    test('localizedName for Other type returns raw name', () => {
        const item = new EquipmentModel(EquipmentType.Other, "Custom Item");
        expect(item.localizedName).toBe("Custom Item");
    });
});

describe('EquipmentHelper', () => {
    test('singleton', () => {
        expect(EquipmentHelper.instance).toBe(EquipmentHelper.instance);
    });

    test('items contains all equipment', () => {
        expect(EquipmentHelper.instance.items.length).toBeGreaterThan(0);
    });

    test('findByType finds item', () => {
        const item = EquipmentHelper.instance.findByType(EquipmentType.Communicator);
        expect(item).toBeDefined();
        expect(item.type).toBe(EquipmentType.Communicator);
    });

    test('findByType returns undefined for unknown type', () => {
        expect(EquipmentHelper.instance.findByType(999 as EquipmentType)).toBeUndefined();
    });

    test('findByTypeName finds by string', () => {
        const item = EquipmentHelper.instance.findByTypeName("Communicator");
        expect(item).toBeDefined();
        expect(item.name).toBe("Communicator");
    });

    test('findByTypeName returns undefined for unknown', () => {
        expect(EquipmentHelper.instance.findByTypeName("Nonexistent")).toBeUndefined();
    });
});
