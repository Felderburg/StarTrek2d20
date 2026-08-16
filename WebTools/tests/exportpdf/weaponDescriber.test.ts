import { test, expect, describe, jest } from '@jest/globals';
import type { IWeaponDiceProvider } from '../../src/common/iWeaponDiceProvider';
import type { Weapon } from '../../src/helpers/weapons';
import { PersonalWeapons } from '../../src/helpers/weapons';
import { WeaponDescriber } from '../../src/exportpdf/weaponDescriber';

jest.mock('i18next', () => {
  const mockI18n: any = (key: string) => key;
  mockI18n.t = (key: string) => key;
  mockI18n.use = function () {
    return this;
  };
  mockI18n.init = function () {
    return this;
  };
  mockI18n.on = function () {
    return this;
  };
  mockI18n.changeLanguage = function () {
    return Promise.resolve();
  };
  return mockI18n;
});

class MockWeaponDiceProvider implements IWeaponDiceProvider {
  getDiceForWeapon(weapon: Weapon): number {
    return weapon.dice + 3;
  }
}

describe('weapon describer', () => {
  test('should describe standard weapon version 1', async () => {
    const phaser = PersonalWeapons.instance(1).phaser2;
    const describer = new WeaponDescriber(1, true);

    expect(
      describer.describeFully(phaser, new MockWeaponDiceProvider()),
    ).toMatch(/Weapon.common.ranged/);
  });

  test('should describe standard weapon version 2', async () => {
    const phaser = PersonalWeapons.instance(2).phaser2;
    const describer = new WeaponDescriber(2, true);

    expect(
      describer.describeFully(phaser, new MockWeaponDiceProvider()),
    ).toMatch(/Weapon.common.ranged/);
    expect(
      describer.describeFully(phaser, new MockWeaponDiceProvider()),
    ).toMatch(/InjuryType.stunOrDeadly/);
  });
});
