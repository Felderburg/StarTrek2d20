import type { Species } from '../../helpers/speciesEnum';
import type Swatch from './swatch';
import type { TokenModel } from './tokenModel';

export interface IUniformPack {
  getUniformSwatches(species?: Species): Swatch[];
  getUniformAndVariantBody(token: TokenModel): string;
  getUniformVariantSwatches(token: TokenModel): Swatch[];

  getRankSwatches(): Swatch[];
  getRankIndicator(token: TokenModel): string;
  getRankIndicatorExtra(token: TokenModel): string;
  getBorderColor(token: TokenModel): string;
  getRankBorderDefinitions(token: TokenModel, bordered: boolean): string;
  getRankBorderIndicator(token: TokenModel): string;

  getBorderLogo(token: TokenModel): string;

  isDivisionColorSupported(token: TokenModel): boolean;
}
