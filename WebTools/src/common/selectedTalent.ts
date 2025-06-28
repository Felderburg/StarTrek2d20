import i18next from "i18next";
import { Attribute } from "../helpers/attributes";
import { BorgImplantType } from "../helpers/borgImplant";
import { TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM, TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_BOLD, TALENT_NAME_CAUTIOUS, TALENT_NAME_COLLABORATION, TALENT_NAME_DEDICATED_PERSONNEL, TALENT_NAME_DEFENSIVE_TRAINING, TALENT_NAME_DEFENSIVE_TRAINING_FED_KLINGON_WAR, TALENT_NAME_EXPANDED_MUNITIONS, TALENT_NAME_EXPANSIVE_DEPARTMENT, TALENT_NAME_MINELAYER, TALENT_NAME_REDUNDANT_SYSTEMS, TalentsHelper } from "../helpers/talents";
import { SpecialWeapon } from "./specialWeapon";
import { makeKey } from "./translationKey";
import { AttackType } from "./attackType";
import { Department } from "../helpers/department";
import { ITalent } from "../helpers/italent";
import { Weapon } from "../helpers/weapons";
import { PropulsionSystemModel, PropulsionSystemType } from "../helpers/propulsionSystem";
import { System } from "../helpers/systems";

export class OtherSelection {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class SelectedTalent implements ITalent {

    readonly talent: string;
    additionalInformation: string;
    implants: BorgImplantType[];
    focuses: string[];
    value: string;
    attribute?: Attribute;
    department?: Department;
    x?: number;
    selection?: string|SpecialWeapon|AttackType|PropulsionSystemType|OtherSelection;
    multiple?: number;
    weapon?: string|Weapon;
    system?: System;

    constructor(talent: string) {
        this.talent = talent;
        this.implants = [];
        this.focuses = [];
    }

    get name() {
        return this.talent;
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
        result.multiple = this.multiple;
        if (this.weapon != null || this.weapon instanceof Weapon) {
            result.weapon = (this.weapon as Weapon).copy();
        } else {
            result.weapon = this.weapon;
        }
        return result;
    }

    static createWithDepartment(talentName: string, department: Department) {
        let result = new SelectedTalent(talentName);
        result.department = department;
        return result;
    }

    static createWithMultiple(talentName: string, multiple: number) {
        let result = new SelectedTalent(talentName);
        result.multiple = multiple;
        return result;
    }

    static createWithSelection(talentName: string, selection: string) {
        let result = new SelectedTalent(talentName);
        result.selection = selection;
        return result;
    }

    static createWithWeapon(talentName: string, weapon: string) {
        let result = new SelectedTalent(talentName);
        result.weapon = weapon;
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

        if ([TALENT_NAME_COLLABORATION, TALENT_NAME_BOLD, TALENT_NAME_CAUTIOUS].includes(this.talent) && this.department != null) {
            name += " (" + i18next.t(makeKey("Construct.discipline.", Department[this.department])) + ")";
        }

        if ([TALENT_NAME_DEDICATED_PERSONNEL, TALENT_NAME_EXPANSIVE_DEPARTMENT].includes(this.talent) && this.department != null) {
            name += " (" + i18next.t(makeKey("Construct.department.", Department[this.department])) + ")";
        }

        if ([TALENT_NAME_MINELAYER, TALENT_NAME_EXPANDED_MUNITIONS].includes(this.talent) && this.weapon != null) {
            const weaponName = (this.weapon instanceof Weapon) ? (this.weapon as Weapon).name : (this.weapon as string);
            name += " (" + i18next.t("Construct.other.weapon") + ":" + weaponName + ")";
        }

        if (TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM === this.talent && this.selection != null) {
            name += " (" + (PropulsionSystemModel.getByType(this.selection as PropulsionSystemType)?.localizedName ?? "") + ")";
        }

        if ([TALENT_NAME_DEFENSIVE_TRAINING, TALENT_NAME_DEFENSIVE_TRAINING_FED_KLINGON_WAR].includes(this.talent) && this.selection != null) {
            const choice = this.selection === AttackType.Melee ? i18next.t("Weapon.common.melee") : i18next.t("Weapon.common.ranged");
            name += " (" + choice + ")";
        }

        if (this.talent === TALENT_NAME_REDUNDANT_SYSTEMS && this.selection != null) {
            name += " (" + this.selection + ")";
        }

        return name;
    }

    get displayNameWithMultiple() {
        let result = this.displayName;
        if (this.multiple != null) {
            result += " [x" + this.multiple + "]";
        }
        return result;
    }
}
