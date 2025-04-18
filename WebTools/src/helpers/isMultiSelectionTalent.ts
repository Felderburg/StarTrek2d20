import { ITalent } from "./italent"
import { TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_BOLD, TALENT_NAME_CAUTIOUS, TALENT_NAME_COLLABORATION, TALENT_NAME_DEFENSIVE_TRAINING_FED_KLINGON_WAR } from "./talents"

/**
 * A multi-selection talent is a talent that can be selected multiple times, but
 * with different choices (e.g. "Augmented Ability", which can be selected mutliple
 * times, but for different attributes).
 */
export const isMultiSelectionTalent = (talent: ITalent) => {
    if ([TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_BOLD, TALENT_NAME_COLLABORATION, TALENT_NAME_CAUTIOUS].includes(talent.name)) {
        return true;
    } else if (talent.name === TALENT_NAME_DEFENSIVE_TRAINING_FED_KLINGON_WAR) {
        return true;
    } else {
        return false;
    }
}