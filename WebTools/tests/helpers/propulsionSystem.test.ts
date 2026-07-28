import { test, expect, describe } from '@jest/globals'
import { PropulsionSystemModel, PropulsionSystemType } from '../../src/helpers/propulsionSystem';

describe('PropulsionSystemModel', () => {
    test('stores type', () => {
        const ps = new PropulsionSystemModel(PropulsionSystemType.Transwarp);
        expect(ps.type).toBe(PropulsionSystemType.Transwarp);
    });

    test('static types list', () => {
        expect(PropulsionSystemModel.types.length).toBe(4);
    });

    test('getByType finds system', () => {
        const ps = PropulsionSystemModel.getByType(PropulsionSystemType.QuantumSlipstreamDrive);
        expect(ps).toBeDefined();
        expect(ps.type).toBe(PropulsionSystemType.QuantumSlipstreamDrive);
    });

    test('getByType returns undefined for unknown', () => {
        expect(PropulsionSystemModel.getByType(999 as PropulsionSystemType)).toBeUndefined();
    });

    test('getByTypeName finds by string', () => {
        const ps = PropulsionSystemModel.getByTypeName("Transwarp");
        expect(ps).toBeDefined();
        expect(ps.type).toBe(PropulsionSystemType.Transwarp);
    });

    test('getByTypeName returns undefined for unknown', () => {
        expect(PropulsionSystemModel.getByTypeName("Nonexistent")).toBeUndefined();
    });
});
