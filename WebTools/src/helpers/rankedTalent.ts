import { TalentModel } from "./talents";

export class RankedTalent {
    readonly talent: TalentModel;
    readonly rank?: number;

    constructor(talent: TalentModel, rank?: number) {
        this.talent = talent;
        this.rank = rank;
    }

    get name() {
        return this.talent.name;
    }
}