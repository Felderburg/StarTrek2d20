import { test, expect, describe } from '@jest/globals';
import '../../src/helpers/species';
import { SelectedTalent } from '../../src/common/selectedTalent';
import {
  Weapon,
  WeaponType,
  TorpedoLoadTypeModel,
} from '../../src/helpers/weapons';

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

jest.mock('../../src/state/store', () => {
  const core2ndEdition = 1; // Source.Core2ndEdition
  return {
    store: {
      getState: () => ({ context: { sources: [core2ndEdition] } }),
      dispatch: () => undefined,
    },
  };
});

describe('SelectedTalent', () => {
  describe('copy', () => {
    test('copies a string weapon without throwing', () => {
      const talent = SelectedTalent.createWithWeapon(
        'Expanded Munitions',
        'Phaser Cannons',
      );
      const result = talent.copy();
      expect(result.weapon).toBe('Phaser Cannons');
    });

    test('deep-copies a Weapon instance', () => {
      const talent = new SelectedTalent('Expanded Munitions');
      talent.weapon = Weapon.createStarshipWeapon(
        '',
        WeaponType.TORPEDO,
        TorpedoLoadTypeModel.allTypes(1)[0],
      );
      const result = talent.copy();
      expect(result.weapon).toBeInstanceOf(Weapon);
      expect(result.weapon).not.toBe(talent.weapon);
    });

    test('copies a talent with no weapon', () => {
      const talent = new SelectedTalent('Fast Targeting Systems');
      const result = talent.copy();
      expect(result.weapon).toBeUndefined();
    });
  });
});
