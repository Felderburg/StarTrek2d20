﻿import * as React from 'react';
import { Navigation } from '../common/navigator';
import {PageIdentity} from './pageIdentity';
import { SpeciesHelper, SpeciesModel } from '../helpers/species';
import { TalentsHelper, TalentViewModel, ToViewModel } from '../helpers/talents';
import Button from 'react-bootstrap/Button';
import { CheckBox } from '../components/checkBox';
import { Dialog } from '../components/dialog';
import { Source } from '../helpers/sources';
import CharacterCreationBreadcrumbs from '../components/characterCreationBreadcrumbs';
import store from '../state/store';
import { setAllowCrossSpeciesTalents, setAllowEsotericTalents } from '../state/contextActions';
import { connect } from 'react-redux';
import { hasSource } from '../state/contextFunctions';
import InstructionText from '../components/instructionText';
import { Header } from '../components/header';
import AttributeListComponent from '../components/attributeListComponent';
import SingleTalentSelectionList from '../components/singleTalentSelectionList';
import { useTranslation } from 'react-i18next';
import { StepContext, addCharacterTalent } from '../state/characterActions';
import { ICharacterProperties } from '../solo/page/soloCharacterProperties';
import { SpeciesAttributeController } from '../components/speciesController';
import { Stereotype } from '../common/construct';
import { CharacterType } from '../common/characterType';
import ReactMarkdown from 'react-markdown';
import { SpeciesAbilityView } from '../components/speciesAbilityView';

interface ISpeciesDetailsProperties extends ICharacterProperties {
    allowCrossSpeciesTalents: boolean;
    allowEsotericTalents: boolean;
}

const SpeciesDetailsPage : React.FC<ISpeciesDetailsProperties> = ({character, allowCrossSpeciesTalents, allowEsotericTalents}) => {

    const { t } = useTranslation();
    let species = SpeciesHelper.getSpeciesByType(character.speciesStep?.species);
    const controller = SpeciesAttributeController.create(character, species);

    const selectDesc = species.attributes.length > 3 ? t('SpeciesDetails.selectThree') : "";

    const isTalentSelectionRequired = () => {
        if (character.stereotype === Stereotype.SoloCharacter) {
            return false;
        } else if (character.version === 1 && character.type !== CharacterType.KlingonWarrior) {
            return true;
        } else if (character.speciesStep?.ability == null) {
            return true;
        } else {
            return character.speciesStep.ability.talentNames?.length;
        }
    }

    const renderTraitSection = (species: SpeciesModel) => {
        let mixed = character.speciesStep?.mixedSpecies != null
            ? SpeciesHelper.getSpeciesByType(character.speciesStep?.mixedSpecies)
            : null;

        const mixedTrait = mixed != null
            ? (
                <div>
                    <div className="text-white my-3"><b>{mixed.localizedTrait}</b></div>
                    <div className="text-white">{character.version > 1 ? mixed.localizedTraitDescription2e : mixed.localizedTraitDescription}</div>
                </div>
            )
            : undefined;

        return (<div>
                <Header level={2}>{t('Construct.other.trait')}</Header>
                <div className="text-white my-3"><b>{species.localizedTrait}</b></div>
                <div className="text-white">{character.version > 1 ? species.localizedDescription2e : species.localizedTraitDescription}</div>
                {mixedTrait}
            </div>);
    }

    const renderTalentsSection = () => {
        if (character.version === 1) {
            return renderVersion1TalentsSection();
        } else {
            return renderVersion2TalentsSection();
        }
    }

    const renderVersion2TalentsSection = () => {
        let talents = [];
        if (character.speciesStep?.ability == null) {
            let species = SpeciesHelper.getSpeciesByType(character.speciesStep?.species);
            species.talents
                .map(t => ToViewModel(t, 1, character.type, character.version))
                .forEach(t => talents.push(t));
        } else if (character.speciesStep?.ability?.talentNames?.length) {
            character.speciesStep.ability.talentNames
                .map(t => ToViewModel(TalentsHelper.getTalent(t), 1, character.type, character.version))
                .forEach(t => talents.push(t));
        }

        if (talents.length === 0) {
            talents.push(...TalentsHelper.getAllAvailableTalentsForCharacter(character));
        }

        let initial = character.speciesStep?.talent ? TalentsHelper.getTalent(character.speciesStep?.talent?.talent) : undefined;
        if (talents.length > 0 && isTalentSelectionRequired()) {
            return (<div>
                <Header level={2}>{t('Construct.other.talents')}</Header>
                <SingleTalentSelectionList talents={talents} construct={character}
                    initialSelection={initial}
                    onSelection={talent => onTalentSelected(talent)} />
            </div>);
        } else {
            return undefined;
        }
    }

    const renderVersion1TalentsSection = () => {
        let talents = [];
        talents.push(...TalentsHelper.getAllAvailableTalentsForCharacter(character));

        let initial = character.speciesStep?.talent ? TalentsHelper.getTalent(character.speciesStep?.talent?.talent) : undefined;

        const esotericTalentOption = (hasSource(Source.PlayersGuide)) ? (<div>
                <CheckBox
                    isChecked={allowEsotericTalents}
                    text={t('SpeciesDetails.allowEsoteric')}
                    value={!allowEsotericTalents}
                    onChanged={() => { store.dispatch(setAllowEsotericTalents(!allowEsotericTalents));  }} />
            </div>) : undefined;

        if (talents.length > 0 && isTalentSelectionRequired()) {
            return (<div>
                <Header level={2}>{t('Construct.other.talents')}</Header>
                <div>
                    {renderCrossSpeciesCheckbox()}
                </div>
                {esotericTalentOption}
                <SingleTalentSelectionList talents={talents} construct={character}
                    initialSelection={initial}
                    onSelection={talent => onTalentSelected(talent)} />
            </div>);
        } else {
            return (<div>
                <Header level={2}>{t('SpeciesDetails.options')}</Header>
                <div>
                    {renderCrossSpeciesCheckbox()}
                </div>
                {esotericTalentOption}
              </div>);
        }
    }


    const renderCrossSpeciesCheckbox = () => {
        return (<CheckBox
            isChecked={allowCrossSpeciesTalents}
            text={t('SpeciesDetails.allowCrossSpecies')}
            value={!allowCrossSpeciesTalents}
            onChanged={() => {
                store.dispatch(setAllowCrossSpeciesTalents(!allowCrossSpeciesTalents));
            }} />);
    }

    const onTalentSelected = (talent: TalentViewModel) => {
        store.dispatch(addCharacterTalent(talent, StepContext.Species));
    }

    const onNext = () => {
        if (character.speciesStep?.attributes?.length !== 3) {
            Dialog.show("You have not distributed all Attribute points.");
            return;
        }

        if (isTalentSelectionRequired() && character.speciesStep?.talent == null) {
            Dialog.show("You have not selected a talent.");
            return;
        }

        Navigation.navigateToPage(PageIdentity.Environment);
    }

    return (
        <div className="page">
            <div className="container ms-0">
                <CharacterCreationBreadcrumbs pageIdentity={PageIdentity.SpeciesDetails} />
                <main>
                    <Header>{character.localizedSpeciesName}</Header>
                    <ReactMarkdown>{(character.version === 2) ? species.localizedDescription2e : species.localizedDescription}</ReactMarkdown>

                    <div className="row">
                        <div className="col-12 col-lg-6 my-4">
                            <Header level={2}><>{t('Construct.other.attributes')} {selectDesc}</></Header>
                            <AttributeListComponent controller={controller} />

                            <InstructionText text={controller.instructions} />
                            {character.speciesStep?.ability
                                ? (<div className="mt-5 mt-4">
                                    <SpeciesAbilityView character={character}/>
                                </div>)
                                : undefined}
                        </div>
                        <div className="col-12 col-lg-6 my-4">
                            {renderTraitSection(species)}
                        </div>
                    </div>
                    {renderTalentsSection()}
                    <div className="text-end mt-4">
                        <Button onClick={() => onNext()}>{t('Common.button.next')}</Button>
                    </div>
                </main>
            </div>
        </div>
    );

}

function mapStateToProps(state, ownProps) {
    return {
        character: state.character?.currentCharacter,
        allowCrossSpeciesTalents: state.context.allowCrossSpeciesTalents,
        allowEsotericTalents: state.context.allowEsotericTalents
    };
}

export default connect(mapStateToProps)(SpeciesDetailsPage);