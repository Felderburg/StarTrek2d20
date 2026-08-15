import React from 'react';
import { UniformEra, UniformEraHelper } from '../model/uniformEra';
import ColorSelection from './colorSelection';
import { DivisionColors } from '../model/divisionColors';
import {
  DropDownElement,
  DropDownSelect,
} from '../../components/dropDownInput';
import store from '../../state/store';
import {
  setTokenBodyType,
  setTokenDivisionColor,
  setTokenRank,
  setTokenUniformVariantType,
  setUniformEra,
} from '../../state/tokenActions';
import RankIndicatorCatalog from '../model/rankIndicatorCatalog';
import SwatchButton from './swatchButton';
import { useTranslation } from 'react-i18next';
import UniformCatalog from '../model/uniformCatalog';
import UniformVariantRestrictions from '../model/uniformVariantRestrictions';
import SpeciesRestrictions from '../model/speciesRestrictions';
import { ITokenPageProperties } from './iTokenPageProperties';

interface IUniformSelectionViewProperties extends ITokenPageProperties {
  loadPack: (era: UniformEra) => void;
  isLoading: boolean;
}

const UniformSelectionView: React.FC<IUniformSelectionViewProperties> = ({
  token,
  loadPack,
  isLoading,
}) => {
  const { t } = useTranslation();

  const handleUniformEraChange = (era: UniformEra) => {
    loadPack(era);
    store.dispatch(setUniformEra(era));
  };

  const renderVariants = () => {
    if (UniformVariantRestrictions.isVariantOptionsAvailable(token)) {
      return (
        <>
          <p className="mt-4">
            {t('TokenCreator.section.body.uniformVariant')}:
          </p>
          <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
            {UniformCatalog.instance
              .getUniformVariantSwatches(token)
              .map((s) => (
                <SwatchButton
                  svg={s.svg}
                  title={s.localizedName}
                  size="lg"
                  onClick={() =>
                    store.dispatch(setTokenUniformVariantType(s.id))
                  }
                  active={token.variant === s.id}
                  token={token}
                  key={'variant-swatch-' + s.id}
                />
              ))}
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  const uniformErasList = () => {
    const uniformTypes = SpeciesRestrictions.getUniformTypes(token.species);
    return UniformEraHelper.instance.types
      .filter((u) => uniformTypes.indexOf(u.id) >= 0)
      .map((u) => new DropDownElement(u.id, u.localizedName));
  };

  const ranks = RankIndicatorCatalog.instance.getSwatches(token);

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
      <div className="mt-4">
        <div className="row align-items-start">
          <div className="col-lg-6 mb-3">
            <p>{t('TokenCreator.section.body.uniform')}:</p>
            <DropDownSelect
              items={uniformErasList()}
              defaultValue={token.uniformEra}
              onChange={(era) => handleUniformEraChange(era as UniformEra)}
            />
          </div>
          <div className="col-lg-6 mb-3">
            {DivisionColors.isDivisionColorsSupported(token.uniformEra) ? (
              <>
                <p>{t('TokenCreator.section.body.colour')}:</p>
                <ColorSelection
                  colors={DivisionColors.getColors(
                    token.uniformEra,
                    token.rankIndicator,
                  )}
                  onSelection={(c) => store.dispatch(setTokenDivisionColor(c))}
                />
              </>
            ) : undefined}
          </div>
        </div>

        {ranks?.length <= 1 ? undefined : (
          <>
            <p className="mt-4">{t('TokenCreator.section.body.rank')}:</p>
            <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
              {ranks.map((s) => (
                <SwatchButton
                  svg={s.svg}
                  title={s.localizedName}
                  onClick={() => store.dispatch(setTokenRank(s.id))}
                  active={token.rankIndicator === s.id}
                  token={token}
                  key={'rank-swatch-' + s.id}
                />
              ))}
            </div>
          </>
        )}

        <p className="mt-4">{t('TokenCreator.section.body.type')}:</p>
        <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
          {UniformCatalog.instance
            .getSwatches(token.uniformEra, token.species)
            .map((s) => (
              <SwatchButton
                svg={s.svg}
                title={s.localizedName}
                size="lg"
                onClick={() => store.dispatch(setTokenBodyType(s.id))}
                active={token.bodyType === s.id}
                token={token}
                key={'body-swatch-' + s.id}
              />
            ))}
        </div>

        {renderVariants()}
      </div>
    );
  }
};

export default UniformSelectionView;
