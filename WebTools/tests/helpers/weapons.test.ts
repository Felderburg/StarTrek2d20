import { test, expect, describe } from '@jest/globals'
import { PersonalWeapons, TorpedoLoadType, TorpedoLoadTypeModel, Quality } from '../../src/helpers/weapons';

describe('testing weapons', () => {
    test('should find 1e weapons', () => {
        let strike = PersonalWeapons.instance(1).unarmedStrike;
        expect(strike.dice).toBe(1);

        let phaser1 = PersonalWeapons.instance(1).phaser1;
        expect(phaser1.dice).toBe(2);
    });

    test('should find 2e weapons', () => {
        let strike = PersonalWeapons.instance(2).unarmedStrike;
        expect(strike.dice).toBe(2);

        let phaser1 = PersonalWeapons.instance(2).phaser1;
        expect(phaser1.dice).toBe(3);
    });

    test('ushaan-tor has correct base damage per edition', () => {
        let v1 = PersonalWeapons.instance(1).ushaanTor;
        expect(v1.dice).toBe(2);

        let v2 = PersonalWeapons.instance(2).ushaanTor;
        expect(v2.dice).toBe(3);
    });

    test('2e quantum torpedo uses Vicious rather than Intense (#303)', () => {
        let v2 = TorpedoLoadTypeModel.getTorpedoLoadTypeModelByType(TorpedoLoadType.Quantum, 2);
        expect(v2.effectAndQualities.some(q => q.quality === Quality.Vicious)).toBeTruthy();
        expect(v2.effectAndQualities.some(q => q.quality === Quality.Intense)).toBeFalsy();
    });

});