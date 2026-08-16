import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColorSelection } from './colorSelection';
import { SpeciesRestrictions } from '../model/speciesRestrictions';
import { store } from '../../state/store';
import { setTokenHeadType, setTokenSkinColor } from '../../state/tokenActions';
import { HeadCatalog } from '../model/headCatalog';
import { SwatchButton } from './swatchButton';
import { Species } from '../../helpers/speciesEnum';
import type { ITokenPageProperties } from './iTokenPageProperties';

interface IHeadSelectionViewProperties extends ITokenPageProperties {
  isLoading: boolean;
}

export const HeadSelectionView: React.FC<IHeadSelectionViewProperties> = ({
  token,
  isLoading,
}) => {
  const { t } = useTranslation();
  const headTypes = HeadCatalog.instance.getSwatches(token);

  if (isLoading) {
    return (
      <div className="mt-4 text-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <p className="mt-4">
          {token.species === Species.Caitian
            ? t('TokenCreator.section.head.furColour')
            : t('TokenCreator.section.head.colour')}
          :
        </p>
        <ColorSelection
          colors={SpeciesRestrictions.getSkinColors(token.species)}
          onSelection={(c) => store.dispatch(setTokenSkinColor(c))}
        />

        {headTypes?.length <= 1 ? null : (
          <>
            <p className="mt-4">{t('TokenCreator.section.head.shape')}:</p>
            <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
              {headTypes.map((s) => (
                <SwatchButton
                  svg={s.svg}
                  title={s.localizedName}
                  size="lg"
                  onClick={() => store.dispatch(setTokenHeadType(s.id))}
                  active={token.headType === s.id}
                  token={token}
                  key={'head-swatch-' + s.id}
                />
              ))}
            </div>
          </>
        )}
      </>
    );
  }
};
