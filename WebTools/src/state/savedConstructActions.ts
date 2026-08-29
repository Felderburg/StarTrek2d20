import { createAction } from '@reduxjs/toolkit';
import type { Character } from '../common/character';
import { cyrb53 } from '../common/cyrb53';
import type { Starship } from '../common/starship';
import { marshaller } from '../helpers/marshaller';

export const SAVE_CONSTRUCT_TO_LOCAL_STORAGE =
  'SAVE_CONSTRUCT_TO_LOCAL_STORAGE';

export const saveCharacterToLocalStorage = createAction(
  SAVE_CONSTRUCT_TO_LOCAL_STORAGE,
  (character: Character, replacementHash?: number) => {
    const name = character.nameAndAbbreviatedRank;
    const marshalled = marshaller.encodeCharacter(character);
    return {
      payload: {
        type: 'Character' as const,
        name: name,
        marshalled: marshalled,
        hash: cyrb53(marshalled),
        replacementHash: replacementHash,
      },
    };
  },
);

export const saveStarshipToLocalStorage = createAction(
  SAVE_CONSTRUCT_TO_LOCAL_STORAGE,
  (starship: Starship, replacementHash?: number) => {
    const name = starship.name;
    const marshalled = marshaller.encodeStarship(starship);
    return {
      payload: {
        type: 'Starship' as const,
        name: name,
        marshalled: marshalled,
        hash: cyrb53(marshalled),
        replacementHash: replacementHash,
      },
    };
  },
);
