import i18next from "i18next";
import { TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_BOLD, TALENT_NAME_BORG_IMPLANTS, TALENT_NAME_CAMOUFLAGED_X, TALENT_NAME_CAUTIOUS, TALENT_NAME_COLLABORATION, TALENT_NAME_CUSTOM_TALENT, TALENT_NAME_DEFENSIVE_TRAINING, TALENT_NAME_EXPANDED_MUNITIONS, TALENT_NAME_EXPANDED_PROGRAM, TALENT_NAME_EXTRAORDINARY_ATTRIBUTE_X, TALENT_NAME_INITIATIVE_X, TALENT_NAME_MENACING_X, TALENT_NAME_MINELAYER, TALENT_NAME_NATURAL_PROTECTION_X, TALENT_NAME_REDUNDANT_SYSTEMS, TALENT_NAME_VISIT_EVERY_STAR, TALENT_NAME_WARRIORS_SPIRIT, TALENT_NAME_WISDOM_OF_YEARS } from "../helpers/talents";
import { SelectedTalent } from "./selectedTalent";
import { Construct } from "./construct";
import { Starship } from "./starship";
import { Weapon, WeaponType } from "../helpers/weapons";

export const determineSelectedTalentExtraErrors = (talent: SelectedTalent, construct?: Construct) => {

    if (talent?.talent === TALENT_NAME_WARRIORS_SPIRIT && talent.selection == null) {
        return "The selected talent requires a weapon selection.";
    } else if (talent?.talent === TALENT_NAME_DEFENSIVE_TRAINING && talent.selection == null) {
        return "The selected talent requires an attack type selection.";
    } else if (talent?.talent === TALENT_NAME_BOLD && talent.department == null) {
        return i18next.t("Talent.bold.error");
    } else if (talent?.talent === TALENT_NAME_CAUTIOUS && talent.department == null) {
        return i18next.t("Talent.cautious.error");
    } else if (talent?.talent === TALENT_NAME_COLLABORATION && talent.department == null) {
        return i18next.t("Talent.collaboration.error");
    } else if (talent?.talent === TALENT_NAME_VISIT_EVERY_STAR && talent.focuses?.length !== 1) {
        return "The selected talent requires a focus selection.";
    } else if (talent?.talent === TALENT_NAME_EXPANDED_PROGRAM && talent.focuses?.length !== 2) {
        return "The selected talent requires you to select two focuses.";
    } else if (talent?.talent === TALENT_NAME_WISDOM_OF_YEARS && (talent.focuses?.length !== 1
        || talent.value == null)) {
        return "The selected talent requires you to select a focus and a value.";
    } else if (talent?.talent === TALENT_NAME_BORG_IMPLANTS && !talent.implants?.length) {
        return i18next.t("Talent.borgImplants.error");
    } else if (talent?.talent === TALENT_NAME_AUGMENTED_ABILITY && talent.attribute == null) {
        return i18next.t("Talent.augmentedAbility.error");
    } else if (talent?.talent === TALENT_NAME_EXTRAORDINARY_ATTRIBUTE_X && (talent.attribute == null || talent.x == null)) {
        return i18next.t("Talent.extraordinaryAttributeX.error");
    } else if (talent?.talent === TALENT_NAME_CAMOUFLAGED_X && talent.x == null) {
        return i18next.t("Talent.camouflagedX.error");
    } else if (talent?.talent === TALENT_NAME_INITIATIVE_X && talent.x == null) {
        return i18next.t("Talent.initiativeX.error");
    } else if (talent?.talent === TALENT_NAME_MENACING_X && talent.x == null) {
        return i18next.t("Talent.menacingX.error");
    } else if (talent?.talent === TALENT_NAME_NATURAL_PROTECTION_X && talent.x == null) {
        return i18next.t("Talent.naturalProtectionX.error");
    } else if (talent?.talent === TALENT_NAME_MINELAYER && talent.weapon == null) {
        return i18next.t("Talent.minelayer.error");
    } else if (talent?.talent === TALENT_NAME_REDUNDANT_SYSTEMS && talent.system == null) {
        return i18next.t("Talent.redundantSystems.error");
    } else if (talent?.talent === TALENT_NAME_EXPANDED_MUNITIONS && talent.weapon == null) {
        return i18next.t("Talent.expandedMunitions.error");
    } else if (talent?.talent === TALENT_NAME_EXPANDED_MUNITIONS) {
        const minelayer = (construct as Starship).isMineLayer;
        if (!minelayer && talent.weapon instanceof Weapon && (talent.weapon as Weapon).type === WeaponType.MINE) {
            return i18next.t("Talent.expandedMunitions.errorMines");
        } else {
            return undefined;
        }
    } else if (talent?.talent === TALENT_NAME_CUSTOM_TALENT && (talent.customTalentName == null || talent.customTalentDescription == null)) {
        return i18next.t("Talent.customTalent.error");
    } else {
        return undefined;
    }
}