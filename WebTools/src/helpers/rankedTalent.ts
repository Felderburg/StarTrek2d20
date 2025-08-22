import { TALENT_NAME_CUSTOM_TALENT, TalentModel } from "./talents";

export class RankedTalent {
    readonly talentModel: TalentModel;
    readonly rank?: number;

    constructor(talent: TalentModel, rank?: number) {
        this.talentModel = talent;
        this.rank = rank;
    }

    get name() {
        return this.talentModel.name;
    }
}

export const rankedTalentNameCompare = (t1: RankedTalent|TalentModel, t2: RankedTalent|TalentModel) => {
    if (t1.name === t2.name) {
        if (t1 instanceof RankedTalent && t2 instanceof RankedTalent) {
            return (t1.rank ?? 0) - (t2.rank ?? 0);
        } else {
            return 0;
        }
    } else if (t1.name === TALENT_NAME_CUSTOM_TALENT) {
        return 1;
    } else if (t2.name === TALENT_NAME_CUSTOM_TALENT) {
        return -1;
    } else {
        return t2.name > t1.name ? -1 : 1;
    }
}
