import React from "react";
import store from "../../state/store";
import { setTokenEyeColor, setTokenEyeType } from "../../state/tokenActions";
import ColorSelection from "./colorSelection";
import SpeciesRestrictions from "../model/speciesRestrictions";
import EyeCatalog from "../model/eyeCatalog";
import SwatchButton from "./swatchButton";
import { ITokenPageProperties } from "./iTokenPageProperties";
import { useTranslation } from "react-i18next";

const EyeSelectionView: React.FC<ITokenPageProperties> = ({token}) => {

    const { t } = useTranslation();

    return (<>
        <p className="mt-4">{t('TokenCreator.section.eyes.colour')}:</p>
        <ColorSelection colors={SpeciesRestrictions.getEyeColors(token.species)} onSelection={(c) => store.dispatch(setTokenEyeColor(c))} />

        {SpeciesRestrictions.isRubberHeaded(token.species) ? null :
        (<>
            <p className="mt-4">{t('TokenCreator.section.eyes.style')}:</p>
            <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
            {EyeCatalog.instance.getSwatches(token).map(s => <SwatchButton svg={s.svg} title={s.name}
                onClick={() => store.dispatch(setTokenEyeType(s.id))} active={token.eyeType === s.id}
                token={token}
                key={'eye-swatch-' + s.id }/>)}
            </div>
        </>)}
    </>);
}

export default EyeSelectionView;