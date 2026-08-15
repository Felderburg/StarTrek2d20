import React from 'react';
import { useTranslation } from 'react-i18next';
import SwatchButton from './swatchButton';
import HairCatalog from '../model/hairCatalog';
import store from '../../state/store';
import { setTokenHairColor, setTokenHairType } from '../../state/tokenActions';
import ColorSelection from './colorSelection';
import SpeciesRestrictions from '../model/speciesRestrictions';
import { ITokenPageProperties } from './iTokenPageProperties';

const HairSelectionView: React.FC<ITokenPageProperties> = ({ token }) => {
  const { t } = useTranslation();

  return (
    <>
      <p className="mt-4">{t('TokenCreator.section.hair.colour')}:</p>
      <ColorSelection
        colors={SpeciesRestrictions.getHairColors(token.species)}
        onSelection={(c) => store.dispatch(setTokenHairColor(c))}
      />

      <p className="mt-4">{t('TokenCreator.section.hair.style')}:</p>
      <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
        {HairCatalog.instance.getSwatches(token).map((s) => (
          <SwatchButton
            svg={s.svg}
            title={s.localizedName}
            size="lg"
            onClick={() => store.dispatch(setTokenHairType(s.id))}
            active={token.hairType === s.id}
            token={token}
            key={'hair-swatch-' + s.id}
          />
        ))}
      </div>
    </>
  );
};

export default HairSelectionView;
