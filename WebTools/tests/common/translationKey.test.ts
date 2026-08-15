import { test, expect, describe } from '@jest/globals';
import { makeKey } from '../../src/common/translationKey';

describe('makeKey', () => {
  test('simple prefix and key', () => {
    expect(makeKey('Track.', 'Command')).toBe('Track.command');
  });

  test('lowercases first character', () => {
    expect(makeKey('Species.', 'Vulcan')).toBe('Species.vulcan');
  });

  test('handles all uppercase as lowercase', () => {
    expect(makeKey('Construct.', 'NONE')).toBe('Construct.none');
  });

  test('multiple keys', () => {
    expect(makeKey('Species.', 'Human', '.name')).toBe('Species.human.name');
  });

  test('empty prefix', () => {
    expect(makeKey('', 'Test')).toBe('test');
  });
});
