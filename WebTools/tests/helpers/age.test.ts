import { test, expect, describe } from '@jest/globals';
import { AgeHelper, Age, AgeLifepathOptions } from '../../src/helpers/age';

describe('AgeLifepathOptions', () => {
  test('default constructor', () => {
    const opts = new AgeLifepathOptions();
    expect(opts.decreaseAttributes).toBe(0);
    expect(opts.decreaseDisciplines).toBe(0);
    expect(opts.numberOfFocuses).toBe(3);
    expect(opts.focusText).toBe('');
  });

  test('custom constructor', () => {
    const opts = new AgeLifepathOptions(2, 1, 1, 'Test');
    expect(opts.decreaseAttributes).toBe(2);
    expect(opts.decreaseDisciplines).toBe(1);
    expect(opts.numberOfFocuses).toBe(1);
    expect(opts.focusText).toBe('Test');
  });
});

describe('Age', () => {
  test('stores properties', () => {
    const age = new Age(
      'Adult',
      [10, 9, 9, 8, 8, 7],
      [4, 3, 2, 2, 1, 1],
      56,
      16,
    );
    expect(age.name).toBe('Adult');
    expect(age.attributeSum).toBe(56);
    expect(age.departmentSum).toBe(16);
  });

  test('isAdult returns true for Adult', () => {
    const age = new Age(
      'Adult',
      [10, 9, 9, 8, 8, 7],
      [4, 3, 2, 2, 1, 1],
      56,
      16,
    );
    expect(age.isAdult).toBeTruthy();
    expect(age.isChild).toBeFalsy();
  });

  test('isChild returns true for non-Adult', () => {
    const age = new Age(
      'Child',
      [9, 8, 8, 7, 7, 6],
      [3, 2, 1, 1, 0, 0],
      52,
      12,
    );
    expect(age.isAdult).toBeFalsy();
    expect(age.isChild).toBeTruthy();
  });

  test('toString returns name', () => {
    const age = new Age(
      'Adult',
      [10, 9, 9, 8, 8, 7],
      [4, 3, 2, 2, 1, 1],
      56,
      16,
    );
    expect(age.toString()).toBe('Adult');
  });
});

describe('AgeHelper', () => {
  test('getAllAges returns all ages', () => {
    const ages = AgeHelper.getAllAges();
    expect(ages.length).toBe(3);
  });

  test('getAllChildAges returns children', () => {
    const children = AgeHelper.getAllChildAges();
    expect(children.length).toBe(2);
    children.forEach((c) => expect(c.isChild).toBeTruthy());
  });

  test('getAdultAge returns adult', () => {
    const adult = AgeHelper.getAdultAge();
    expect(adult.name).toBe('Adult');
    expect(adult.isAdult).toBeTruthy();
  });

  test('getAge finds by name', () => {
    const adult = AgeHelper.getAge('Adult');
    expect(adult).toBeDefined();
    expect(adult.name).toBe('Adult');
  });

  test('getAge returns null for unknown', () => {
    expect(AgeHelper.getAge('Unknown')).toBeNull();
  });
});
