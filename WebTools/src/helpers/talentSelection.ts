import { Character } from '../common/character';
import { TalentModel } from './talentModel';
import { isMultiSelectionTalent } from './isMultiSelectionTalent';

/**
 * A talent is selectable when the character has not already taken it (unless
 * the currently-selected step talent is this talent), the talent can be
 * selected multiple times (via rank or multiple distinct choices), or it is a
 * multi-selection talent.
 */
export const isTalentSelectable = (
  character: Character,
  talent: TalentModel,
  step?: { talent?: { talent?: string } },
): boolean =>
  !character.hasTalent(talent.name) ||
  step?.talent?.talent === talent.name ||
  talent.maxRank > 1 ||
  isMultiSelectionTalent(talent);
