import Swatch from './swatch';
import { TokenModel } from './tokenModel';
import { IUniformPack } from './uniformPack';

export class NoneUniformPack implements IUniformPack {
  getUniformSwatches(): Swatch[] {
    return [];
  }
  getUniformAndVariantBody(token: TokenModel): string {
    return '';
  }
  getUniformVariantSwatches(token: TokenModel): Swatch[] {
    return [];
  }

  getRankSwatches() {
    return [];
  }

  getRankIndicator(token: TokenModel): string {
    return '';
  }

  getRankBorderIndicator(token: TokenModel) {
    return '';
  }

  getRankBorderDefinitions(token: TokenModel, bordered: boolean) {
    return '';
  }

  getBorderColor(token: TokenModel) {
    return '#999999';
  }

  getBorderLogo(token: TokenModel): string {
    return '';
  }

  isDivisionColorSupported(token: TokenModel): boolean {
    return false;
  }

  getRankIndicatorExtra(token: TokenModel): string {
    return '';
  }
}
