import Swatch from "./swatch";
import { Token } from "./token";
import { IUniformPack } from "./uniformPack";

export class NoneUniformPack implements IUniformPack {

    getUniformSwatches(): Swatch[] {
        return [];
    }
    getUniformAndVariantBody(token: Token): string {
        return "";
    }
    getUniformVariantSwatches(token: Token): Swatch[] {
        return [];
    }

    getRankSwatches() {
        return [];
    }

    getRankIndicator(token: Token): string {
        return "";
    }

    getRankBorderIndicator(token: Token) {
        return "";
    }

    getRankBorderDefinitions(token: Token, bordered: boolean) {
        return "";
    }

    getBorderColor(token: Token) {
        return "#999999";
    }

    getBorderLogo(token: Token): string {
            return "";
        }

    isDivisionColorSupported(token: Token): boolean {
        return false;
    }
}