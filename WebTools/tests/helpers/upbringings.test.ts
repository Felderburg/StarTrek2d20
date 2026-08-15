import { test, expect, describe } from '@jest/globals';
import { EarlyOutlook, UpbringingsHelper } from '../../src/helpers/upbringings';
import { CharacterType } from '../../src/common/characterType';

describe('UpbringingsHelper', () => {
  test('getUpbringings returns 6 starfleet upbringings', () => {
    const upbringings = UpbringingsHelper.getUpbringings();
    expect(upbringings.length).toBe(6);
  });

  test('getCastes returns 6 klingon castes', () => {
    const castes = UpbringingsHelper.getCastes();
    expect(castes.length).toBe(6);
  });

  test('getAspirations returns 6 alternate upbringings', () => {
    const aspirations = UpbringingsHelper.getAspirations();
    expect(aspirations.length).toBe(6);
  });

  test('getUpbringing finds by enum', () => {
    const upbringing = UpbringingsHelper.getUpbringing(
      EarlyOutlook.MilitaryOrExploration,
    );
    expect(upbringing).toBeDefined();
    expect(upbringing.name).toBe('Starfleet');
  });

  test('getUpbringing returns undefined for klingon caste', () => {
    expect(
      UpbringingsHelper.getUpbringing(EarlyOutlook.WarriorCaste),
    ).toBeUndefined();
  });

  test('getCaste finds by enum', () => {
    const caste = UpbringingsHelper.getCaste(EarlyOutlook.WarriorCaste);
    expect(caste).toBeDefined();
    expect(caste.name).toBe('Warrior');
  });

  test('getAspiration finds by enum', () => {
    const aspiration = UpbringingsHelper.getAspiration(EarlyOutlook.ToExplore);
    expect(aspiration).toBeDefined();
    expect(aspiration.name).toBe('To Explore');
  });

  test('isUpbringing identifies core upbringings', () => {
    expect(
      UpbringingsHelper.isUpbringing(EarlyOutlook.MilitaryOrExploration),
    ).toBeTruthy();
    expect(
      UpbringingsHelper.isUpbringing(EarlyOutlook.WarriorCaste),
    ).toBeFalsy();
    expect(UpbringingsHelper.isUpbringing(EarlyOutlook.ToExplore)).toBeFalsy();
  });

  test('isCaste identifies klingon castes', () => {
    expect(UpbringingsHelper.isCaste(EarlyOutlook.WarriorCaste)).toBeTruthy();
    expect(
      UpbringingsHelper.isCaste(EarlyOutlook.MilitaryOrExploration),
    ).toBeFalsy();
  });

  test('isAspiration identifies alternate upbringings', () => {
    expect(UpbringingsHelper.isAspiration(EarlyOutlook.ToExplore)).toBeTruthy();
    expect(
      UpbringingsHelper.isAspiration(EarlyOutlook.MilitaryOrExploration),
    ).toBeFalsy();
  });

  test('getAllUpbringings returns starfleet list', () => {
    const list = UpbringingsHelper.getAllUpbringings(CharacterType.Starfleet);
    expect(list.length).toBe(6);
  });

  test('getAllUpbringings returns klingon castes', () => {
    const list = UpbringingsHelper.getAllUpbringings(
      CharacterType.KlingonWarrior,
    );
    expect(list.length).toBe(6);
  });

  test('getAllUpbringings with alternate returns aspirations', () => {
    const list = UpbringingsHelper.getAllUpbringings(
      CharacterType.Starfleet,
      true,
    );
    expect(list.length).toBe(6);
  });

  test('generateUpbringing produces a valid upbringing', () => {
    const upbringing = UpbringingsHelper.generateUpbringing(
      CharacterType.Starfleet,
      false,
    );
    expect(upbringing).toBeDefined();
    expect(upbringing.id).toBeDefined();
  });

  test('getUpbringingByTypeName finds by type name', () => {
    const result = UpbringingsHelper.getUpbringingByTypeName(
      'MilitaryOrExploration',
      CharacterType.Starfleet,
    );
    expect(result).toBeDefined();
    expect(result.id).toBe(EarlyOutlook.MilitaryOrExploration);
  });

  test('getUpbringingByTypeName maps klingon type names', () => {
    const result = UpbringingsHelper.getUpbringingByTypeName(
      'MilitaryOrExploration',
      CharacterType.KlingonWarrior,
    );
    expect(result).toBeDefined();
    expect(result.id).toBe(EarlyOutlook.WarriorCaste);
  });

  test('getUpbringingByTypeName searches alternate list when not found', () => {
    const result = UpbringingsHelper.getUpbringingByTypeName(
      'ToExplore',
      CharacterType.Starfleet,
    );
    expect(result).toBeDefined();
    expect(result.id).toBe(EarlyOutlook.ToExplore);
  });

  test('getUpbringingByTypeName returns undefined when not found anywhere', () => {
    const result = UpbringingsHelper.getUpbringingByTypeName(
      'Nonexistent',
      CharacterType.Starfleet,
    );
    expect(result).toBeUndefined();
  });
});
