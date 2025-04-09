import i18next from "i18next";
import { TALENT_NAME_EXPANDED_PROGRAM, TALENT_NAME_VISIT_EVERY_STAR, TALENT_NAME_WARRIORS_SPIRIT, TALENT_NAME_WISDOM_OF_YEARS } from "../helpers/talents";
import { SelectedTalent } from "./selectedTalent";

export const determineSelectedTalentExtraErrors = (talent: SelectedTalent) => {

    if (talent?.talent === TALENT_NAME_WARRIORS_SPIRIT && talent.selection == null) {
        return "The selected talent requires a weapon selection.";
    } else if (talent?.talent === TALENT_NAME_VISIT_EVERY_STAR && talent.focuses?.length !== 1) {
        return "The selected talent requires a focus selection.";
    } else if (talent?.talent === TALENT_NAME_EXPANDED_PROGRAM && talent.focuses?.length !== 2) {
        return "The selected talent requires you to select two focuses.";
    } else if (talent?.talent === TALENT_NAME_WISDOM_OF_YEARS && talent.focuses?.length !== 1
        || talent.value == null) {
        return "The selected talent requires you to select a focus and a value.";
    } else {
        return undefined;
    }
}