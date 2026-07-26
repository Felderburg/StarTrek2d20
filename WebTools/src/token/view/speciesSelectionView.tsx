
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Species } from '../../helpers/speciesEnum';
import { DropDownElement } from '../../components/dropDownInput';
import { SpeciesHelper } from '../../helpers/species';
import { DropDownSelect } from '../../components/dropDownInput';
import store from '../../state/store';
import { setTokenSecondarySpecies, setTokenSpecies, setTokenSpeciesOption } from '../../state/tokenActions';
import SpeciesRestrictions from '../model/speciesRestrictions';
import SpeciesOptionCatalog from '../model/speciesOptionCatalog';
import SwatchButton from './swatchButton';
import { ITokenPageProperties } from './iTokenPageProperties';

interface ISpeciesSelectionProperties extends ITokenPageProperties {
    isLoading: boolean;
    loadExtension: () => void;
}

const SpeciesSelectionView: React.FC<ISpeciesSelectionProperties> = ({token, isLoading, loadExtension}) => {

    const { t } = useTranslation();

    const renderOptions = () => {

        if (SpeciesRestrictions.isOptionsSupportedFor(token.species)) {
            return (<>
                <p className="mt-4">{t('TokenCreator.section.species.options')}:</p>

                <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
                    {SpeciesOptionCatalog.instance.getSwatches(token).map(s => <SwatchButton svg={s.svg} title={s.name} size="lg"
                        onClick={() => store.dispatch(setTokenSpeciesOption(s.id))} active={token.speciesOption === s.id}
                        token={token}
                        key={'species-option-swatch-' + s.id }/>)}
                </div>
            </>)
        } else {
            return null;
        }
    }

    const speciesList = () => {
        return [Species.Andorian,
                Species.Ariolo,
                Species.Aurelian, Species.Bajoran, Species.Benzite, Species.Betazoid,
                Species.BlueOrion,
                Species.Bolian,
                Species.Bynar,
                Species.Caitian,
                Species.Cardassian,
                Species.Cetacean,
                Species.Deltan,
                Species.Denobulan,
                Species.Edosian,
                Species.Efrosian,
                Species.Ferengi,
                Species.Grazerite,
                Species.Haliian,
                Species.Human,
                Species.Kelpien,
                Species.Klingon, Species.KlingonQuchHa, Species.Jelna, Species.JemHadar,
                Species.Ktarian,
                Species.LiberatedBorg,
                Species.Napean,
                Species.Orion, Species.Pakled, Species.Reman, Species.Risian, Species.Romulan,
                Species.Saurian, Species.Suliban,
                Species.Talaxian,
                Species.Tellarite,
                Species.Tholian,
                Species.Trill,
                Species.Tzenkethi,
                Species.Vulcan,
                Species.XindiArboreal,
                Species.XindiPrimate,
                Species.XindiReptilian,
                Species.Yridian,
                Species.Zakdorn,
                Species.Zaranite
            ];
    }

    const speciesListAsOption = () => {
        return speciesList().map(s => new DropDownElement(s, SpeciesHelper.getSpeciesByType(s).localizedName))
            .sort((d1, d2) => d1.name.localeCompare(d2.name));
    }


    const secondarySpeciesListAsOption  = () => {
        return speciesList()
            .filter(s => ![Species.LiberatedBorg,
                Species.Cetacean,
                Species.Edosian,
                Species.Ferengi,
                Species.Saurian,
                Species.Tholian,
                Species.Tzenkethi].includes(s))
            .map(s => new DropDownElement(s, SpeciesHelper.getSpeciesByType(s).localizedName))
            .sort((d1, d2) => d1.name.localeCompare(d2.name));
    }

    const selectSecondarySpecies = (species: Species) => {
        if (SpeciesRestrictions.isRubberHeaded(species)) {
            loadExtension();
        }
        store.dispatch(setTokenSecondarySpecies(species));
    }

    const selectSpecies = (species: Species) => {
        if (SpeciesRestrictions.isRubberHeaded(species)) {
            loadExtension();
        }
        store.dispatch(setTokenSpecies(species));
    }

    if (isLoading) {
        return (<div className="mt-4 text-center">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>);
    } else {
        return (
            <div className="mt-4">
                <label className="visually-hidden" htmlFor="species">Species</label>
                <DropDownSelect items={speciesListAsOption()} defaultValue={token.primarySpecies} onChange={(s) => selectSpecies(s as Species)}
                    id="species"/>

                {token.primarySpecies === Species.LiberatedBorg
                ? (<>
                    <div className="text-white mt-4 mb-2">{t('SpeciesDetails.originalSpecies')}</div>
                    <DropDownSelect className="mb-3" items={secondarySpeciesListAsOption()} defaultValue={token.secondarySpecies ?? Species.Human} onChange={(s) => selectSecondarySpecies(s as Species)}
                    id="secondarySpecies"/>
                    </>)
                : undefined}


                {renderOptions()}
            </div>);
    }

}

export default SpeciesSelectionView;