import { Character } from '../common/character';
import { CharacterType } from '../common/characterType';
import { Species } from './speciesEnum';
import { isMultiSelectionTalent } from './isMultiSelectionTalent';
import { RankedTalent } from './rankedTalent';
import { TALENT_NAME_BRAK_LUL, TalentsHelper } from './talents';

export function getEarlyOutlookTalents(character: Character): RankedTalent[] {
    if (character.type === CharacterType.KlingonWarrior && character.speciesStep?.species === Species.Klingon && character.version === 1) {
        return [ new RankedTalent( TalentsHelper.getTalent(TALENT_NAME_BRAK_LUL)) ];
    } else {
        return TalentsHelper.getAllAvailableTalentsForCharacter(character)
            .filter(
                t => !character.hasTalent(t.name)
                    || (character.upbringingStep?.talent?.talent === t.name)
                    || t.maxRank > 1
                    || isMultiSelectionTalent(t))
            .map(t => {
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
