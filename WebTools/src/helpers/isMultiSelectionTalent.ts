import { ITalent } from "./italent"
import { TALENT_NAME_AUGMENTED_ABILITY } from "./talents"

/**
 * A multi-selection talent is a talent that can be selected multiple times, but
 * with different choices (e.g. "Augmented Ability", which can be selected mutliple
 * times, but for different attributes).
 */
export const isMultiSelectionTalent = (talent: ITalent) => {
    if (talent.name === TALENT_NAME_AUGMENTED_ABILITY) {
        return true;
    } else {
        return false;
    }
}