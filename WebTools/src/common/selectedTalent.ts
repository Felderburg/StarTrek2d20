import { Attribute } from "../helpers/attributes";
import { BorgImplantType } from "../helpers/borgImplant";

export class SelectedTalent {

    readonly talent: string;
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
        return result;
    }
}
