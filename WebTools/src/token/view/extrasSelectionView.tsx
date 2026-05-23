import React from "react";
import { useTranslation } from 'react-i18next';
import SwatchButton from "./swatchButton";
import ExtrasCatalog from "../model/extrasCatalog";
import { ExtraCategory, ExtraType, getExtraCategory } from "../model/extrasTypeEnum";
import store from "../../state/store";
import { setTokenExtrasTypes } from "../../state/tokenActions";
import { Species } from "../../helpers/speciesEnum";
import { ITokenPageProperties } from "./iTokenPageProperties";

const ExtraSelectionView: React.FC<ITokenPageProperties> = ({token}) => {

    const { t } = useTranslation();

    const isExtraCategoryPresent = (category: ExtraCategory) => {
        return token.extras.filter(i => ExtrasCatalog.instance.isInCategory(i, category)).length > 0;
    }

    const addExtra = (extraType: ExtraType, category: ExtraCategory) => {
        let current = token.extras.filter(e => getExtraCategory(e) !== category);
        if (extraType !== ExtraType.None) {
            current.push(extraType);
        }
        store.dispatch(setTokenExtrasTypes(current));
    }

    return (<>
    <p className="mt-4">{t('TokenCreator.section.extras.ears')}:</p>
    <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
    {ExtrasCatalog.instance.getSwatches(token, ExtraCategory.Ear).map(s => <SwatchButton svg={s.svg} title={s.localizedName}
        onClick={() => addExtra(s.id, ExtraCategory.Ear)} active={token.extras.indexOf(s.id) >= 0 || (s.id === ExtraType.None && !isExtraCategoryPresent(ExtraCategory.Ear))}
        token={token}
        key={'extra-swatch-ear-' + s.id }/>)}
    </div>

    <p className="mt-4">{t('TokenCreator.section.extras.forehead')}:</p>
    <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
    {ExtrasCatalog.instance.getSwatches(token, ExtraCategory.Forehead).map(s => <SwatchButton svg={s.svg} title={s.localizedName}
        onClick={() => addExtra(s.id, ExtraCategory.Forehead)}
        active={token.extras.indexOf(s.id) >= 0 || (s.id === ExtraType.None && !isExtraCategoryPresent(ExtraCategory.Forehead))}
        token={token} size={token.species === Species.Ferengi ? "lg" : "md"}
        key={'extra-swatch-forehead-' + s.id }/>)}
    </div>

    <p className="mt-4">{t('TokenCreator.section.extras.face')}:</p>
    <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
    {ExtrasCatalog.instance.getSwatches(token, ExtraCategory.Face).map(s => <SwatchButton svg={s.svg} title={s.localizedName}
        onClick={() => addExtra(s.id, ExtraCategory.Face)}
        active={token.extras.indexOf(s.id) >= 0 || (s.id === ExtraType.None && !isExtraCategoryPresent(ExtraCategory.Face))}
        token={token} size="lg"
        key={'extra-swatch-headwear-' + s.id }/>)}
    </div>

    {token.primarySpecies === Species.LiberatedBorg
        ? (<><p className="mt-4">{t('TokenCreator.section.extras.borgImplants')}:</p>
            <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
            {ExtrasCatalog.instance.getSwatches(token, ExtraCategory.BorgImplant).map(s => <SwatchButton svg={s.svg} title={s.localizedName}
                onClick={() => addExtra(s.id, ExtraCategory.BorgImplant)}
                active={token.extras.indexOf(s.id) >= 0 || (s.id === ExtraType.None && !isExtraCategoryPresent(ExtraCategory.BorgImplant))}
                token={token} size="lg"
                key={'extra-swatch-headwear-' + s.id }/>)}
            </div></>)
        : undefined}

    <p className="mt-4">{t('TokenCreator.section.extras.headwear')}:</p>
    <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
    {ExtrasCatalog.instance.getSwatches(token, ExtraCategory.Headwear).map(s => <SwatchButton svg={s.svg} title={s.localizedName}
        onClick={() => addExtra(s.id, ExtraCategory.Headwear)}
        active={token.extras.indexOf(s.id) >= 0 || (s.id === ExtraType.None && !isExtraCategoryPresent(ExtraCategory.Headwear))}
        token={token} size="lg"
        key={'extra-swatch-headwear-' + s.id }/>)}
    </div>


    </>);
}

export default ExtraSelectionView;