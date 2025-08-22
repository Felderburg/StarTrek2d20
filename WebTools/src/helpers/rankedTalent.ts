import { TalentModel } from "./talents";

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