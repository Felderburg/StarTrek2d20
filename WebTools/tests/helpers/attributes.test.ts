import { test, expect, describe } from '@jest/globals';
import { Attribute, AttributesHelper } from '../../src/helpers/attributes';

describe('Attributes helper', () => {
  test('getAllAttributes returns all six', () => {
    const attrs = AttributesHelper.getAllAttributes();
    expect(attrs.length).toBe(6);
    expect(attrs).toContain(Attribute.Control);
    expect(attrs).toContain(Attribute.Daring);
    expect(attrs).toContain(Attribute.Fitness);
    expect(attrs).toContain(Attribute.Insight);
    expect(attrs).toContain(Attribute.Presence);
    expect(attrs).toContain(Attribute.Reason);
  });

  test('getAttributeName returns string', () => {
    expect(AttributesHelper.getAttributeName(Attribute.Control)).toBe(
      'Control',
    );
    expect(AttributesHelper.getAttributeName(Attribute.Daring)).toBe('Daring');
    expect(AttributesHelper.getAttributeName(Attribute.Fitness)).toBe(
      'Fitness',
    );
    expect(AttributesHelper.getAttributeName(Attribute.Insight)).toBe(
      'Insight',
    );
    expect(AttributesHelper.getAttributeName(Attribute.Presence)).toBe(
      'Presence',
    );
    expect(AttributesHelper.getAttributeName(Attribute.Reason)).toBe('Reason');
  });

  test('getAttributeByName finds attribute case-insensitively', () => {
    expect(AttributesHelper.getAttributeByName('control')).toBe(
      Attribute.Control,
    );
    expect(AttributesHelper.getAttributeByName('DARING')).toBe(
      Attribute.Daring,
    );
    expect(AttributesHelper.getAttributeByName('Reason')).toBe(
      Attribute.Reason,
    );
  });

  test('getAttributeByName returns undefined for unknown', () => {
    expect(AttributesHelper.getAttributeByName('Unknown')).toBeUndefined();
  });
});
