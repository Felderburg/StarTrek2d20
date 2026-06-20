import toast from "react-hot-toast";
import { makeKey } from "../../common/translationKey";
import { Species } from "../../helpers/speciesEnum";
import { DivisionColors } from "./divisionColors";
import EarCatalog from "./earCatalog";
import { ExtraCategory, ExtraType } from "./extrasTypeEnum";
import { Eye2StandardBrows } from "./eyeBrowCatalog";
import { Eye2 } from "./eyeCatalog";
import { HairType } from "./hairTypeEnum";
import { FerengiForehead, ReferenceHead } from "./headCatalog";
import SpeciesRestrictions from "./speciesRestrictions";
import { svgTranslationHelper } from "./svgTranslationHelper";
import Swatch from "./swatch";
import { TokenModel } from "./tokenModel";
import { DefaultRed } from "./uniformCatalog";
import { UniformEra } from "./uniformEra";

export interface IExtendedExtrasLibrary {
    getExtra(token: TokenModel, category: ExtraCategory, back: boolean, detail?: HairType): string
    getSwatches(token: TokenModel, category: ExtraCategory): Swatch[];
    isInCategory(type: ExtraType, category: ExtraCategory): boolean;
}

export class ExtraItem {

    readonly id: ExtraType;
    readonly category: ExtraCategory;
    readonly name: string;
    readonly svg: string;

    constructor(id: ExtraType, category: ExtraCategory, name: string, svg: string) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.svg = svg;
    }
}

class ExtrasCatalog {

    private static _instance: ExtrasCatalog;

    private extrasLibrary: IExtendedExtrasLibrary;

    public static get instance() {
        if (ExtrasCatalog._instance == null) {
            ExtrasCatalog._instance = new ExtrasCatalog();
        }
        return ExtrasCatalog._instance;
    }

    isInCategory(type: ExtraType, category: ExtraCategory) {
        if (this.isLibraryLoaded) {
            return this.extrasLibrary.isInCategory(type, category);
        } else {
            return false;
        }
    }

    getExtras(token: TokenModel, category: ExtraCategory, back: boolean = false, detail?: HairType) {
        if (this.isLibraryLoaded) {
            return this.extrasLibrary.getExtra(token, category, back, detail);
        } else {
            return "";
        }
    }

    getSwatches(token: TokenModel, category: ExtraCategory) {
        if (this.isLibraryLoaded) {
            return this.extrasLibrary.getSwatches(token, category);
        } else {
            return [];
        }
    }

    get isLibraryLoaded() {
        return this.extrasLibrary != null;
    }

    loadLibraryExtension(completion: () => void = () => {}) {
        if (this.isLibraryLoaded) {
            completion();
        } else {
            import(/* webpackChunkName: 'extrasLibrary' */ './extrasLibrary').then(({ExtrasLibrary}) => {
                this.extrasLibrary = new ExtrasLibrary();
                completion();
            }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
        }
    }

}

export default ExtrasCatalog;