import type { Character } from '../common/character';
import { Species } from './speciesEnum';
import { isTalentSelectable } from './talentSelection';
import { RankedTalent } from './rankedTalent';
import { TALENT_NAME_BRAK_LUL, TalentsHelper } from './talents';
import { isKlingonWarriorType } from './klingonWarrior';

export function getEarlyOutlookTalents(character: Character): RankedTalent[] {
  if (
    isKlingonWarriorType(character.type) &&
    character.speciesStep?.species === Species.Klingon &&
    character.version === 1 &&
    !character.hasTalent(TALENT_NAME_BRAK_LUL)
  ) {
    return [new RankedTalent(TalentsHelper.getTalent(TALENT_NAME_BRAK_LUL))];
  } else {
    return TalentsHelper.getAllAvailableTalentsForCharacter(character)
      .filter((t) => isTalentSelectable(character, t, character.upbringingStep))
      .map((t) => {
        if (t.maxRank > 1) {
          if (character.upbringingStep?.talent?.talent === t.name) {
            return new RankedTalent(t, character.getRankForTalent(t.name));
          } else {
            return new RankedTalent(t, character.getRankForTalent(t.name) + 1);
          }
        } else {
          return new RankedTalent(t);
        }
      });
  }
}
