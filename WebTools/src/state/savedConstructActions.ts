import { Character } from "../common/character";
import { cyrb53 } from "../common/cyrb53";
import { marshaller } from "../helpers/marshaller";

export const SAVE_CHARACTER_TO_LOCAL_STORAGE = "SAVE_CHARACTER_TO_LOCAL_STORAGE";

export function saveCharacterToLocalStorage(character: Character, replacementHash?: number) {

    const name = character.nameAndAbbreviatedRank;
    const marshalled = marshaller.encodeCharacter(character);
    let payload = { type: "Character", name: name,
        marshalled: marshalled,
        hash: cyrb53(marshalled),
        replacementHash: replacementHash
    };
    return {
       type: SAVE_CHARACTER_TO_LOCAL_STORAGE,
       payload: payload
    }
}