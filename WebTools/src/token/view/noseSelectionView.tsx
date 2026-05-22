import React from "react";
import NoseCatalog from "../model/noseCatalog";
import SwatchButton from "./swatchButton";
import store from "../../state/store";
import { setTokenNasoLabialFoldType, setTokenNoseType } from "../../state/tokenActions";
import NasoLabialFoldCatalog from "../model/nasoLabialFoldCatalog";
import SpeciesRestrictions from "../model/speciesRestrictions";
import { ITokenPageProperties } from "./iTokenPageProperties";
import { useTranslation } from "react-i18next";

const NoseSelectionView: React.FC<ITokenPageProperties> = ({token}) => {

    const { t } = useTranslation();

    if (SpeciesRestrictions.isRubberHeaded(token.species)) {
        return (<p className="mt-4">No selections available.</p>);
    } else {
        return (<>
        <p className="mt-4">{t('TokenCreator.section.nose.shape')}:</p>
        <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
        {NoseCatalog.instance.getSwatches(token).map(s => <SwatchButton svg={s.svg} title={s.localizedName}
            onClick={() => store.dispatch(setTokenNoseType(s.id))} active={token.noseType === s.id}
            token={token}
            key={'nose-swatch-' + s.id }/>)}
        </div>

        <p className="mt-4">{t('TokenCreator.section.nose.nasoLabial')}:</p>
        <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
        {NasoLabialFoldCatalog.instance.swatches.map(s => <SwatchButton svg={s.svg} title={s.localizedName}
            onClick={() => store.dispatch(setTokenNasoLabialFoldType(s.id))} active={token.nasoLabialFold === s.id}
            token={token}
            key={'naso-labial-swatch-' + s.id }/>)}
        </div>
        </>);
    }
}

export default NoseSelectionView;