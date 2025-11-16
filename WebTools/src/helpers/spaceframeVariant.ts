import { Spaceframe } from "./spaceframeEnum";

export enum SpaceframeVariant {
    // Excelsior variants
    Excelsior,
    EnterpriseBVariant,

    // Constitution variants
    StrangeNewWorldsVariant,
    OriginalSeries,
    OriginalSeriesMovies,

}

export class SpaceframeVariantModel {

    readonly id: SpaceframeVariant;

    constructor(id: SpaceframeVariant) {
        this.id = id;
    }

    get localizedName() {
        return SpaceframeVariant[this.id];
    }


    static ALL = [
        new SpaceframeVariantModel(SpaceframeVariant.Excelsior),
        new SpaceframeVariantModel(SpaceframeVariant.EnterpriseBVariant),
        new SpaceframeVariantModel(SpaceframeVariant.StrangeNewWorldsVariant),
        new SpaceframeVariantModel(SpaceframeVariant.OriginalSeries),
        new SpaceframeVariantModel(SpaceframeVariant.OriginalSeriesMovies),
    ]

    static variantsBySpaceframe(spaceframe: Spaceframe) {
        switch (spaceframe) {
            case Spaceframe.Excelsior:
            case Spaceframe.Excelsior_2E:
            case Spaceframe.Excelsior_UP: {
                const variants = [SpaceframeVariant.Excelsior, SpaceframeVariant.EnterpriseBVariant];
                return this.ALL.filter(v => variants.includes(v.id));
            }
            default:
                return [];
        }
    }

    static variantCodeByName(name: string): SpaceframeVariant|undefined {
        let result = this.ALL.filter(v => SpaceframeVariant[v.id] === name);
        return result?.length ? result[0].id : undefined;
    }

    static hasVariants(spaceframe: Spaceframe) {
        return this.variantsBySpaceframe(spaceframe)?.length;
    }

}