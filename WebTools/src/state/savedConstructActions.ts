import type { Character } from '../common/character';
import { cyrb53 } from '../common/cyrb53';
import type { Starship } from '../common/starship';
import { marshaller } from '../helpers/marshaller';

export const SAVE_CONSTRUCT_TO_LOCAL_STORAGE =
  'SAVE_CONSTRUCT_TO_LOCAL_STORAGE';

export function saveCharacterToLocalStorage(
  character: Character,
  replacementHash?: number,
) {
  const name = character.nameAndAbbreviatedRank;
  const marshalled = marshaller.encodeCharacter(character);
  const payload = {
    type: 'Character',
    name: name,
    marshalled: marshalled,
    hash: cyrb53(marshalled),
    replacementHash: replacementHash,
  };
  return {
    type: SAVE_CONSTRUCT_TO_LOCAL_STORAGE,
    payload: payload,
  };
}

export function saveStarshipToLocalStorage(
  starship: Starship,
  replacementHash?: number,
) {
  const name = starship.name;
  const marshalled = marshaller.encodeStarship(starship);
  const payload = {
    type: 'Starship',
    name: name,
    marshalled: marshalled,
    hash: cyrb53(marshalled),
    replacementHash: replacementHash,
  };
  return {
    type: SAVE_CONSTRUCT_TO_LOCAL_STORAGE,
    payload: payload,
  };
}
