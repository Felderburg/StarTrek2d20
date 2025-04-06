import { TALENT_NAME_WARRIORS_SPIRIT } from "../helpers/talents";
import { SelectedTalent } from "./selectedTalent";

export const determineSelectedTalentExtraErrors = (talent: SelectedTalent) => {

    if (talent?.talent === TALENT_NAME_WARRIORS_SPIRIT && talent.selection == null) {
        return "Please select a weapon type";
    } else {
        return undefined;
    }
}