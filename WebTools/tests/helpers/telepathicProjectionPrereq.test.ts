import { test, expect, describe } from '@jest/globals';
import { Character, SpeciesStep } from '../../src/common/character';
import { Species } from '../../src/helpers/speciesEnum';
import { Source } from '../../src/helpers/sources';
import { setSources } from '../../src/state/contextActions';
import { store } from '../../src/state/store';
import { TalentsHelper } from '../../src/helpers/talents';

const localStorageMock = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};
Object.defineProperty(global, 'window', {
  value: { localStorage: localStorageMock },
  writable: true,
});

const helper = (species: Species) => {
  const character = new Character();
  character.speciesStep = new SpeciesStep(species);
  store.dispatch(setSources([Source.PlayersGuide, Source.Core2ndEdition]));
  return character;
};

describe('Telepathic Projection prerequisite', () => {
  test('is available to an Aenar character', () => {
    const character = helper(Species.Aenar);
    const talents = TalentsHelper.getAllAvailableTalentsForCharacter(character);
    expect(talents.some((t) => t.name === 'Telepathic Projection')).toBe(true);
  });

  test('is not available to a Human character', () => {
    const character = helper(Species.Human);
    const talents = TalentsHelper.getAllAvailableTalentsForCharacter(character);
    expect(talents.some((t) => t.name === 'Telepathic Projection')).toBe(false);
  });
});
