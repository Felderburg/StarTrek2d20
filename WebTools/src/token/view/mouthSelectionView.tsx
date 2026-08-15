import React from 'react';
import { useTranslation } from 'react-i18next';
import SwatchButton from './swatchButton';
import MouthCatalog from '../model/mouthCatalog';
import store from '../../state/store';
import {
  setTokenFacialHairTypes,
  setTokenLipstickColor,
  setTokenMouthType,
} from '../../state/tokenActions';
import ColorSelection from './colorSelection';
import SpeciesRestrictions from '../model/speciesRestrictions';
import FacialHairCatalog from '../model/facialHairCatalog';
import { FacialHairCategory, FacialHairType } from '../model/facialHairEnum';
import { ITokenPageProperties } from './iTokenPageProperties';

const MouthSelectionView: React.FC<ITokenPageProperties> = ({ token }) => {
  const { t } = useTranslation();

  const renderFacialHair = () => {
    if (SpeciesRestrictions.isFacialHairSupportedFor(token.species)) {
      return (
        <>
          <p className="mt-4">{t('TokenCreator.section.mouth.shadow')}:</p>
          <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
            {FacialHairCatalog.instance
              .getSwatches(token, FacialHairCategory.Shadow)
              .map((s) => (
                <SwatchButton
                  svg={s.svg}
                  title={s.name}
                  onClick={() =>
                    addFacialHairType(s.id, FacialHairCategory.Shadow)
                  }
                  active={getShadowType() === s.id}
                  token={token}
                  key={'facial-hair-shadow-swatch-' + s.id}
                />
              ))}
          </div>

          <p className="mt-4">{t('TokenCreator.section.mouth.moustache')}:</p>
          <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
            {FacialHairCatalog.instance
              .getSwatches(token, FacialHairCategory.Moustache)
              .map((s) => (
                <SwatchButton
                  svg={s.svg}
                  title={s.name}
                  onClick={() =>
                    addFacialHairType(s.id, FacialHairCategory.Moustache)
                  }
                  active={getMoustacheType() === s.id}
                  token={token}
                  key={'facial-hair-moustache-swatch-' + s.id}
                />
              ))}
          </div>

          <p className="mt-4">{t('TokenCreator.section.mouth.beard')}:</p>
          <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
            {FacialHairCatalog.instance
              .getSwatches(token, FacialHairCategory.Beard)
              .map((s) => (
                <SwatchButton
                  svg={s.svg}
                  title={s.name}
                  onClick={() =>
                    addFacialHairType(s.id, FacialHairCategory.Beard)
                  }
                  active={getBeardTypes().indexOf(s.id) >= 0}
                  token={token}
                  size="lg"
                  key={'facial-hair-beard-swatch-' + s.id}
                />
              ))}
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  const addFacialHairType = (
    type: FacialHairType,
    category: FacialHairCategory,
  ) => {
    let newTypes = [];
    if (type !== FacialHairType.None) {
      category = FacialHairCatalog.instance.getCategoryForType(type);
    }
    token.facialHairType
      .filter((t) => {
        let p = FacialHairCatalog.instance.getCategoryForType(t);
        if (category === FacialHairCategory.MoustacheAndBeard) {
          return p === FacialHairCategory.Shadow;
        } else {
          return p !== category && p !== FacialHairCategory.MoustacheAndBeard;
        }
      })
      .forEach((t) => newTypes.push(t));

    if (type !== FacialHairType.None) {
      newTypes.push(type);
    }
    store.dispatch(setTokenFacialHairTypes(newTypes));
  };

  const getShadowType = () => {
    let type = token.facialHairType.filter(
      (f) =>
        FacialHairCatalog.instance.getCategoryForType(f) ===
        FacialHairCategory.Shadow,
    );
    return type?.length ? type[0] : FacialHairType.None;
  };

  const getMoustacheType = () => {
    let type = token.facialHairType.filter(
      (f) =>
        FacialHairCatalog.instance.getCategoryForType(f) ===
        FacialHairCategory.Moustache,
    );
    return type?.length ? type[0] : FacialHairType.None;
  };

  const getBeardTypes = () => {
    let types = token.facialHairType.filter(
      (f) =>
        FacialHairCatalog.instance.getCategoryForType(f) ===
          FacialHairCategory.Beard ||
        FacialHairCatalog.instance.getCategoryForType(f) ===
          FacialHairCategory.MoustacheAndBeard,
    );
    return types?.length ? types : [FacialHairType.None];
  };

  if (SpeciesRestrictions.isRubberHeaded(token.species)) {
    return <p className="mt-4">No selections available.</p>;
  } else {
    return (
      <>
        <p className="mt-4">{t('TokenCreator.section.mouth.shape')}:</p>
        <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
          {MouthCatalog.instance.getSwatches(token).map((s) => (
            <SwatchButton
              svg={s.svg}
              title={s.localizedName}
              onClick={() => store.dispatch(setTokenMouthType(s.id))}
              active={s.id === token.mouthType}
              token={token}
              key={'mouth-swatch-' + s.id}
            />
          ))}
        </div>

        <p className="mt-4">{t('TokenCreator.section.mouth.colour')}:</p>
        <ColorSelection
          colors={SpeciesRestrictions.getLipstickColors(token.species)}
          onSelection={(c) => store.dispatch(setTokenLipstickColor(c))}
        />

        {renderFacialHair()}
      </>
    );
  }
};

export default MouthSelectionView;
