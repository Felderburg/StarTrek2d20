import { Rank } from '../../helpers/ranks';
import { isCadetRank, isEnlistedRank, isFlagRank } from './rankHelper';
import { TokenModel } from './tokenModel';
import { UniformEra } from './uniformEra';
import UniformPackCollection from './uniformPackCollection';

class RankIndicatorCatalog {
  private static _instance: RankIndicatorCatalog;

  public static get instance() {
    if (RankIndicatorCatalog._instance == null) {
      RankIndicatorCatalog._instance = new RankIndicatorCatalog();
    }
    return RankIndicatorCatalog._instance;
  }

  getRankIndicator(token: TokenModel) {
    return this.getUniformPack(token.uniformEra).getRankIndicator(token);
  }

  getRankExtra(token: TokenModel) {
    return this.getUniformPack(token.uniformEra).getRankIndicatorExtra(token);
  }

  getBorderRankDefinitions(token: TokenModel, bordered: boolean) {
    return this.getUniformPack(token.uniformEra).getRankBorderDefinitions(
      token,
      bordered,
    );
  }

  getBorderRankIndicator(token: TokenModel) {
    return this.getUniformPack(token.uniformEra).getRankBorderIndicator(token);
  }

  getUniformPack(era: UniformEra) {
    return UniformPackCollection.instance.getUniformPack(era);
  }

  getSwatches(token: TokenModel) {
    return this.getUniformPack(token.uniformEra).getRankSwatches();
  }

  static decorateSwatch(
    svg: string,
    rankIndicator: Rank,
    token: TokenModel,
    gradient: string = '',
  ) {
    if (token.uniformEra === UniformEra.Enterprise) {
      return (
        `<svg viewBox="0 0 175 175" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g transform="translate(5, -260)">` +
        svg +
        `</g>
                </svg>`
      );
    } else if (token.uniformEra === UniformEra.StarTrekOnline) {
      return (
        `<svg viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g transform="translate(-195, -220)">` +
        svg +
        `</g>
                </svg>`
      );
    } else {
      if (isEnlistedRank(rankIndicator)) {
        return (
          `<svg viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g transform="translate(-212, -230)">` +
          svg +
          `</g>
                    </svg>`
        );
      } else if (isCadetRank(rankIndicator)) {
        return (
          `<svg viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g transform="translate(-207, -227)">` +
          svg +
          `</g>
                    </svg>`
        );
      } else if (isFlagRank(rankIndicator)) {
        return (
          `<svg viewBox="0 0 55 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g transform="translate(-202, -221)">` +
          svg +
          `</g>
                    </svg>`
        );
      } else {
        return (
          `<svg viewBox="0 0 55 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g transform="translate(-202, -220)">` +
          svg +
          `</g>
                    </svg>`
        );
      }
    }
  }
}

export default RankIndicatorCatalog;
