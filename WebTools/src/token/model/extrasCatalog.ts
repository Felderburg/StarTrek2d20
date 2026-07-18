import toast from "react-hot-toast";
import { ExtraCategory, ExtraType } from "./extrasTypeEnum";
import { HairType } from "./hairTypeEnum";
import Swatch from "./swatch";
import { TokenModel } from "./tokenModel";

export interface IExtendedExtrasLibrary {
    getExtra(token: TokenModel, category: ExtraCategory, back: boolean, detail?: HairType): string
    getSwatches(token: TokenModel, category: ExtraCategory): Swatch[];
    isInCategory(type: ExtraType, category: ExtraCategory): boolean;
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

    async loadLibraryExtension(completion: () => void = () => {}) {
        if (this.isLibraryLoaded) {
            completion();
        } else {
            try {
                const { ExtrasLibrary } =  await import(/* webpackChunkName: 'extrasLibrary' */ './extrasLibrary');
                this.extrasLibrary = new ExtrasLibrary();
                completion();
            } catch (_e) {
                toast("Ooops. Something bad happened", { className: 'bg-danger' });
            }
        }
    }

}

export default ExtrasCatalog;