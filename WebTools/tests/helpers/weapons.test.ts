import { test, expect, describe } from '@jest/globals';
import {
  PersonalWeapons,
  TorpedoLoadType,
  TorpedoLoadTypeModel,
  Quality,
} from '../../src/helpers/weapons';

describe('testing weapons', () => {
  test('should find 1e weapons', () => {
    const strike = PersonalWeapons.instance(1).unarmedStrike;
    expect(strike.dice).toBe(1);

    const phaser1 = PersonalWeapons.instance(1).phaser1;
    expect(phaser1.dice).toBe(2);
  });

  test('should find 2e weapons', () => {
    const strike = PersonalWeapons.instance(2).unarmedStrike;
    expect(strike.dice).toBe(2);

    const phaser1 = PersonalWeapons.instance(2).phaser1;
    expect(phaser1.dice).toBe(3);
  });

  test('ushaan-tor has correct base damage per edition', () => {
    const v1 = PersonalWeapons.instance(1).ushaanTor;
    expect(v1.dice).toBe(2);

    const v2 = PersonalWeapons.instance(2).ushaanTor;
    expect(v2.dice).toBe(3);
  });

  test('2e quantum torpedo has Intense instead of Vicious (#303)', () => {
    const v1 = TorpedoLoadTypeModel.getTorpedoLoadTypeModelByType(
      TorpedoLoadType.Quantum,
      1,
    );
    expect(
      v1.effectAndQualities.some((q) => q.quality === Quality.Vicious),
    ).toBeTruthy();

    const v2 = TorpedoLoadTypeModel.getTorpedoLoadTypeModelByType(
      TorpedoLoadType.Quantum,
      2,
    );
    expect(
      v2.effectAndQualities.some((q) => q.quality === Quality.Intense),
    ).toBeTruthy();
    expect(
      v2.effectAndQualities.some((q) => q.quality === Quality.Vicious),
    ).toBeFalsy();
    expect(
      v2.effectAndQualities.some((q) => q.quality === Quality.Calibration),
    ).toBeTruthy();
    expect(
      v2.effectAndQualities.some((q) => q.quality === Quality.HighYield),
    ).toBeTruthy();
  });
});
