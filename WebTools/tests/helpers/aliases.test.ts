import { test, expect, describe } from '@jest/globals';
import { AliasModel } from '../../src/helpers/aliases';
import { Source } from '../../src/helpers/sources';

describe('AliasModel', () => {
  test('stores name and source', () => {
    const alias = new AliasModel('John Luke Picard', Source.Core);
    expect(alias.name).toBe('John Luke Picard');
    expect(alias.source).toBe(Source.Core);
  });

  test('localizedName returns name', () => {
    const alias = new AliasModel('Spock', Source.Core);
    expect(alias.localizedName).toBe('Spock');
  });

  test('handles different sources', () => {
    const alias = new AliasModel('Kira Nerys', Source.DS9);
    expect(alias.source).toBe(Source.DS9);
  });
});
