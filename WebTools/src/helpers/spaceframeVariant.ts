import i18next from 'i18next';
import { Spaceframe } from './spaceframeEnum';
import { makeKey } from '../common/translationKey';

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
    return i18next.t(makeKey('SpaceframeVariant.', SpaceframeVariant[this.id]));
  }

  static ALL = [
    new SpaceframeVariantModel(SpaceframeVariant.Excelsior),
    new SpaceframeVariantModel(SpaceframeVariant.EnterpriseBVariant),
    new SpaceframeVariantModel(SpaceframeVariant.StrangeNewWorldsVariant),
    new SpaceframeVariantModel(SpaceframeVariant.OriginalSeries),
    new SpaceframeVariantModel(SpaceframeVariant.OriginalSeriesMovies),
  ];

  static variantsBySpaceframe(spaceframe: Spaceframe) {
    switch (spaceframe) {
      case Spaceframe.Excelsior:
      case Spaceframe.Excelsior_2E:
      case Spaceframe.Excelsior_UP: {
        const variants = [
          SpaceframeVariant.Excelsior,
          SpaceframeVariant.EnterpriseBVariant,
        ];
        return this.ALL.filter((v) => variants.includes(v.id));
      }
      case Spaceframe.Constitution:
      case Spaceframe.Constitution_2E:
      case Spaceframe.Constitution_UP: {
        const variants = [
          SpaceframeVariant.OriginalSeries,
          SpaceframeVariant.OriginalSeriesMovies,
          SpaceframeVariant.StrangeNewWorldsVariant,
        ];
        return this.ALL.filter((v) => variants.includes(v.id));
      }
      default:
        return [];
    }
  }

  static variantCodeByName(name: string): SpaceframeVariant | undefined {
    const result = this.ALL.filter((v) => SpaceframeVariant[v.id] === name);
    return result?.length ? result[0].id : undefined;
  }

  static hasVariants(spaceframe: Spaceframe) {
    return this.variantsBySpaceframe(spaceframe)?.length;
  }
}
