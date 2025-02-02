import { Attribute } from "../helpers/attributes";
import { BorgImplantType } from "../helpers/borgImplant";
import { TalentsHelper } from "../helpers/talents";

export class SelectedTalent {

    readonly talent: string;
    additionalInformation: string;
    implants: BorgImplantType[];
    focuses: string[];
    value: string;
    attribute?: Attribute;
    x?: number;

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
        result.x = this.x;
        result.additionalInformation = this.additionalInformation;
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
        return name;
    }
}
