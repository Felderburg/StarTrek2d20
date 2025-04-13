import i18next from "i18next";
import { Attribute } from "../helpers/attributes";
import { BorgImplantType } from "../helpers/borgImplant";
import { TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_COLLABORATION, TALENT_NAME_DEFENSIVE_TRAINING, TalentsHelper } from "../helpers/talents";
import { SpecialWeapon } from "./specialWeapon";
import { makeKey } from "./translationKey";
import { AttackType } from "./attackType";
import { Department } from "../helpers/department";

export class SelectedTalent {

    readonly talent: string;
    additionalInformation: string;
    implants: BorgImplantType[];
    focuses: string[];
    value: string;
    attribute?: Attribute;
    department?: Department;
    x?: number;
    selection?: string|SpecialWeapon|AttackType;

    constructor(talent: string) {
        this.talent = talent;
        this.implants = [];
        this.focuses = [];
    }

    copy() {
        let result = new SelectedTalent(this.talent);
        result.implants = [...this.implants];
        result.focuses = [...this.focuses];
        result.value = this.value;
        result.attribute = this.attribute;
        result.department = this.department;
        result.x = this.x;
        result.additionalInformation = this.additionalInformation;
        result.selection = this.selection;
        return result;
    }

    get talentModel() {
        return TalentsHelper.getTalent(this.talent);
    }

    get displayName() {
        const talentModel = this.talentModel;
        let name = talentModel.localizedDisplayName;

        if (talentModel.isXQualified) {
            if (this.x != null) {
                let xLocation = name.lastIndexOf(" X");
                name = name.substring(0, xLocation + 1) + this.x + name.substring(xLocation + 2)
            }
        }
        if (this.additionalInformation != null) {
            name += " [" + this.additionalInformation + "]";
        }

        if (this.talent === TALENT_NAME_AUGMENTED_ABILITY && this.attribute != null) {
            name += " (" + i18next.t(makeKey("Construct.attribute.", Attribute[this.attribute])) + ")";
        }

        if (this.talent === TALENT_NAME_COLLABORATION && this.department != null) {
            name += " (" + i18next.t(makeKey("Construct.discipline.", Department[this.department])) + ")";
        }

        if (this.talent === TALENT_NAME_DEFENSIVE_TRAINING && this.selection != null) {
            const choice = this.selection === AttackType.Melee ? i18next.t("Weapon.common.melee") : i18next.t("Weapon.common.ranged");
            name += " (" + choice + ")";
        }

        return name;
    }
}
