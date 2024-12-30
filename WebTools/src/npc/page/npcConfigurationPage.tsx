import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { navigateTo } from '../../common/navigator';
import { DropDownElement, DropDownSelect } from '../../components/dropDownInput';
import { Header } from '../../components/header';
import InstructionText from '../../components/instructionText';
import { Era } from '../../helpers/eras';
import { marshaller } from '../../helpers/marshaller';
import { SpeciesHelper } from '../../helpers/species';
import { Species } from '../../helpers/speciesEnum';
import { PageIdentity } from '../../pages/pageIdentity';
import { NpcCharacterType, NpcCharacterTypeModel, NpcCharacterTypes } from '../model/npcCharacterType';
import { NpcGenerator } from '../model/npcGenerator';
import { NpcType, NpcTypes } from '../model/npcType';
import { SpecializationModel, Specializations } from '../model/specializations';
import { hasAnySource } from '../../state/contextFunctions';
import { Source } from '../../helpers/sources';
import { Specialization } from '../../common/specializationEnum';
import { Button } from 'react-bootstrap';

interface INpcConfigurationPageProperties extends WithTranslation {
    era: Era;
}

interface INpcConfigurationPageState {
    selectedNpcType: NpcType;
    selectedType: NpcCharacterTypeModel;
    selectedSpecies?: Species;
    selectedSpecialization?: SpecializationModel;
}

class NpcConfigurationPage extends React.Component<INpcConfigurationPageProperties, INpcConfigurationPageState> {

    constructor(props) {
        super(props);

        this.state = {
            selectedNpcType: NpcType.Notable,
            selectedType: NpcCharacterTypes.instance.types[0]
        }
    }

    render() {
        const { t } = this.props;
        return (<div className="page">
            <div className="container ms-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => navigateTo(e, PageIdentity.Home)}>{t('Page.title.home')}</a></li>
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => navigateTo(e, PageIdentity.SourceSelection)}>{t('Page.title.sourceSelection')}</a></li>
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => navigateTo(e, PageIdentity.Era)}>{t('Page.title.era')}</a></li>
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => navigateTo(e, PageIdentity.ToolSelection)}>{t('Page.title.toolSelection')}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{t('Page.title.npcConfiguration')}</li>
                    </ol>
                </nav>

                <Header>{t('Page.title.npcConfiguration')}</Header>

                <div className="my-4">
                    <InstructionText text={t('NpcConfigurationPage.text')} />
                </div>

                <div className="row">
                    <div className="col-md-6 mt-4">
                        <Header level={2}>{t('NpcConfigurationPage.npcType')}</Header>

                        <div className="my-4">
                            <DropDownSelect
                                items={ NpcTypes.getNpcTypes().map(t => new DropDownElement(t.type, t.localizedName)) }
                                defaultValue={ this.state.selectedNpcType }
                                onChange={(type) => this.setState((state) => ({...state, selectedNpcType: type as number })) }/>
                        </div>

                    </div>

                    <div className="col-md-6 mt-4">
                        <Header level={2}>{t('Construct.other.characterType')}</Header>

                        <div className="my-4">
                            <DropDownSelect
                                items={ NpcCharacterTypes.instance.types.map(t => new DropDownElement(t.type, t.localizedName )) }
                                defaultValue={ this.state.selectedType?.type ?? "" }
                                onChange={(type) => this.selectType(NpcCharacterTypes.instance.getType(type as NpcCharacterType) ) }/>
                        </div>

                    </div>

                    <div className="col-md-6 mt-4">
                        <Header level={2} className="mt-5">{t('Construct.other.species')}</Header>

                        <div className="mt-4">
                            <DropDownSelect
                                items={ this.getSpeciesDropDownList() }
                                defaultValue={ this.state.selectedSpecies ?? "" }
                                onChange={(species) => this.selectSpecies(species) }/>
                        </div>

                    </div>

                    <div className="col-md-6 mt-4">
                        <Header level={2} className="mt-5">{t('NpcConfigurationPage.specialization')}</Header>

                        <div className="mt-4">
                            <DropDownSelect
                                items={ this.getSpecializations() }
                                defaultValue={ this.state.selectedSpecialization?.id ?? "" }
                                onChange={(specialization) => this.selectSpecialization(specialization) }/>
                        </div>
                    </div>
                </div>

                <div className="mt-5 text-end">
                    <Button size="sm" onClick={() => this.createNpc(this.props.era)}>{t('Common.button.create')}</Button>
                </div>
            </div>
        </div>);
    }

    getSpecializations() {
        const { t } = this.props;
        let result = [ new DropDownElement(null, t('NpcConfigurationPage.option.anySpecialization'))];
        Specializations.instance.getSpecializations(this.state.selectedType.type)
            .filter(s => (s.type !== NpcCharacterType.Ferengi || this.props.era === Era.NextGeneration) && hasAnySource([Source.DS9, Source.AlphaQuadrant]))
            .filter(s => (s.id !== Specialization.TzenkethiSoldier) || hasAnySource([Source.AlphaQuadrant]))
            .filter(s => (s.id !== Specialization.TholianWarrior) || hasAnySource([Source.IdwYearFive]))
            .filter(s => this.state.selectedSpecies == null || s.species.length === 0 || s.species.indexOf(this.state.selectedSpecies) >= 0 )
            .forEach(s => result.push(new DropDownElement(s.id, s.localizedName)));
        return result;
    }

    getStandardFederationSpeciesList() {
        const list = [ Species.Andorian, Species.Bajoran, Species.Betazoid, Species.Bolian, Species.Denobulan, Species.Human, Species.Tellarite, Species.Trill, Species.Vulcan ];
        return list.map(s => SpeciesHelper.getSpeciesByType(s)).filter(s => s.eras.indexOf(this.props.era) >= 0);
    }

    getStandardFederationSpeciesListAsTypes() {
        return this.getStandardFederationSpeciesList().map(s => s.id);
    }

    getSpeciesList() {
        if (this.state.selectedSpecialization != null && this.state.selectedSpecialization?.species?.length) {
            return this.state.selectedSpecialization.species.map(s => SpeciesHelper.getSpeciesByType(s)).filter(s => s.eras.indexOf(this.props.era) >= 0);
        } else if (this.state.selectedType?.type === NpcCharacterType.RogueRuffianMercenary || this.state.selectedType?.type === NpcCharacterType.MinorPolity) {
            let items = [];
            Specializations.instance.getSpecializations(this.state.selectedType?.type).forEach(s => {
                if (this.state.selectedSpecialization == null || this.state.selectedSpecialization?.id === s.id) {
                    let speciesList = s.species?.length ? s.species : this.getStandardFederationSpeciesListAsTypes();
                    speciesList.forEach(s => {
                        if (items.indexOf(s) < 0) {
                            items.push(s);
                        }
                    });
                }
            });
            return items.map(s => SpeciesHelper.getSpeciesByType(s)).filter(s => s.eras.indexOf(this.props.era) >= 0);
        } else if (this.state.selectedType?.type === NpcCharacterType.KlingonDefenseForces) {
            const list = this.props.era === Era.NextGeneration ? [ Species.Klingon ] : [ Species.Klingon, Species.KlingonQuchHa ];
            return list.map(s => SpeciesHelper.getSpeciesByType(s));
        } else if (this.state.selectedType?.type === NpcCharacterType.Cardassian) {
            return [ SpeciesHelper.getSpeciesByType(Species.Cardassian)];
        } else if (this.state.selectedType?.type === NpcCharacterType.Ferengi) {
            return [ SpeciesHelper.getSpeciesByType(Species.Ferengi)];
        } else if (this.state.selectedType?.type === NpcCharacterType.RomulanEmpire) {
            return [ SpeciesHelper.getSpeciesByType(Species.Romulan), SpeciesHelper.getSpeciesByType(Species.Reman)];
        } else {
            return this.getStandardFederationSpeciesList();
        }
    }

    getSpeciesDropDownList() {
        const { t } = this.props;
        let result = [ new DropDownElement(null, t('NpcConfigurationPage.option.anyMajorSpecies'))];
        this.getSpeciesList().forEach(s => result.push(new DropDownElement(s.id, s.localizedName)));
        return result;
    }

    selectSpecialization(type: Specialization|string) {
        if (type == null || type === "") {
            this.setState((state) => ({...state, selectedSpecialization: null }));
        } else {
            this.setState((state) => ({...state, selectedSpecialization: Specializations.instance.getSpecialization(type as Specialization) }));
        }
    }

    selectType(type: NpcCharacterTypeModel) {
        this.setState((state) => ({...state, selectedType: type, selectedSpecies: null, selectedSpecialization: null }));
    }

    selectSpecies(species: Species|string|null) {
        if (species == null || species === "") {
            this.setState((state) => ({...state, selectedSpecies: undefined }));
        } else {
            this.setState((state) => ({...state, selectedSpecies: species as Species }));
        }
    }

    randomSpecies() {
        if (this.state.selectedType.type === NpcCharacterType.KlingonDefenseForces ||
            this.state.selectedType.type === NpcCharacterType.Cardassian ||
            this.state.selectedType.type === NpcCharacterType.Ferengi ||
            this.state.selectedType.type === NpcCharacterType.MinorPolity ||
            this.state.selectedType.type === NpcCharacterType.RomulanEmpire) {
            let list = this.getSpeciesList();
            return list[Math.floor(Math.random() * list.length)].id;
        } else {
            return SpeciesHelper.generateSpecies();
        }
    }

    createNpc(era: Era) {
        let specialization = this.state.selectedSpecialization;
        if (specialization == null) {
            let specializations = Specializations.instance.getSpecializations(this.state.selectedType.type);
            specialization = specializations[Math.floor(Math.random() * specializations.length)];
        }
        let species = this.state.selectedSpecies;
        if (species == null && specialization.species?.length) {
            let list = specialization.species.map(s => SpeciesHelper.getSpeciesByType(s)).filter(s => s.eras.indexOf(this.props.era) >= 0)
            species = list[Math.floor(Math.random() * list.length)].id;
        } else if (species == null) {
            species = this.randomSpecies();
        }
        let character = NpcGenerator.createNpc(this.state.selectedNpcType, this.state.selectedType.type,
            SpeciesHelper.getSpeciesByType(species), specialization, era);

        const value = marshaller.encodeNpc(character);
        window.open('/view?s=' + value, "_blank");
    }
}

function mapStateToProps(state, ownProps) {
    return {
        era: state.context.era
    };
}

export default withTranslation()(connect(mapStateToProps)(NpcConfigurationPage));
