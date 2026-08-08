import React from 'react';
import {Character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity} from './pageIdentity';
import {Environment, EnvironmentsHelper } from '../helpers/environments';
import {SpeciesHelper } from '../helpers/species';
import {Department} from '../helpers/department';
import Button from 'react-bootstrap/Button';
import {Dialog} from '../components/dialog';
import { Species } from '../helpers/speciesEnum';
import { Attribute, AttributesHelper } from '../helpers/attributes';
import { Header } from '../components/header';
import { useTranslation } from 'react-i18next';
import { randomUniqueValue } from '../solo/table/valueRandomTable';
import store from '../state/store';
import { StepContext, modifyCharacterAttribute, modifyCharacterDiscipline, setCharacterEnvironment, setCharacterValue } from '../state/characterActions';
import { IAttributeController } from '../components/attributeController';
import { ICharacterProperties, characterMapStateToProperties } from '../solo/page/soloCharacterProperties';
import { DropDownElement, DropDownSelect } from '../components/dropDownInput';
import SoloCharacterBreadcrumbs from '../solo/component/soloCharacterBreadcrumbs';
import InstructionText from '../components/instructionText';
import AttributeListComponent from '../components/attributeListComponent';
import DisciplineListComponent, { IDisciplineController } from '../components/disciplineListComponent';
import SoloValueInput from '../solo/component/soloValueInput';
import D20IconButton from '../solo/component/d20IconButton';
import { connect } from 'react-redux';
import { Stereotype } from '../common/construct';
import CharacterCreationBreadcrumbs from '../components/characterCreationBreadcrumbs';
import { DisciplinesOrDepartments } from '../view/disciplinesOrDepartments';
import Markdown from 'react-markdown';

class EnvironmentAttributeController implements IAttributeController {

    readonly character: Character;
    readonly attributes: Attribute[];

    constructor(character: Character, attributes: Attribute[]) {
        this.character = character;
        this.attributes = attributes;
    }

    isShown(attribute: Attribute) {
        return this.attributes.indexOf(attribute) >= 0;
    }
    isEditable(attribute: Attribute): boolean {
        return this.isShown(attribute);
    }
    getValue(attribute: Attribute): number {
        return this.character.attributes[attribute];
    }
    getDeltaValue(attribute: Attribute): number|undefined {
        return undefined;
    }
    canIncrease(attribute: Attribute): boolean {
        return this.isEditable(attribute) && this.character.environmentStep?.attribute == null;
    }
    canDecrease(attribute: Attribute): boolean {
        return this.isEditable(attribute) && this.character.environmentStep?.attribute === attribute;
    }
    onIncrease(attribute: Attribute): void {
        store.dispatch(modifyCharacterAttribute(attribute, StepContext.Environment));
    }
    onDecrease(attribute: Attribute): void {
        store.dispatch(modifyCharacterAttribute(attribute, StepContext.Environment, false));
    }
    get instructions() {
        return []
    }
}

class SoloEnvironmentDisciplineController implements IDisciplineController {

    readonly character: Character;
    readonly disciplines: Department[];

    constructor(character: Character, disciplines: Department[]) {
        this.character = character;
        this.disciplines = disciplines;
    }

    isShown(discipline: Department) {
        return this.disciplines.indexOf(discipline) >= 0;
    }
    isEditable(discipline: Department): boolean {
        return this.isShown(discipline);
    }
    getValue(discipline: Department): number {
        return this.character.departments[discipline];
    }
    canIncrease(discipline: Department): boolean {
        return this.isEditable(discipline) && this.character.environmentStep?.discipline == null;
    }
    canDecrease(discipline: Department): boolean {
        return this.isEditable(discipline) && this.character.environmentStep?.discipline === discipline;
    }
    onIncrease(discipline: Department): void {
        store.dispatch(modifyCharacterDiscipline(discipline, StepContext.Environment));
    }
    onDecrease(discipline: Department): void {
        store.dispatch(modifyCharacterDiscipline(discipline, StepContext.Environment, false));
    }
}

const EnvironmentDetailsPage: React.FC<ICharacterProperties> = ({character}) => {
    const { t } = useTranslation();

    const distinctValues = (attributes: Attribute[]) => {
        let result = [];
        attributes.forEach(a => {
            if (!result.includes(a)) {
                result.push(a);
            }
        });
        return result;
    }

    const environment = EnvironmentsHelper.getEnvironment(character.environmentStep?.environment, character);
    let attributes = environment.attributes;
    if (environment.id === Environment.Homeworld) {
        let speciesType = character.speciesStep?.species;
        if (speciesType === Species.Custom) {
            attributes = AttributesHelper.getAllAttributes();
        } else {
            let species = SpeciesHelper.getSpeciesByType(character.speciesStep?.species);
            attributes = species.attributes;
        }
    } else if (environment.id === Environment.AnotherSpeciesWorld && character.environmentStep?.otherSpecies != null) {
        let species = SpeciesHelper.getSpeciesByType(character.environmentStep?.otherSpecies);
        attributes = species?.attributes;
    }

    const controller = new EnvironmentAttributeController(character, distinctValues(attributes));
    const disciplineController = new SoloEnvironmentDisciplineController(character, environment.disciplines);

    const selectOtherSpecies = (s: Species) => {
        store.dispatch(setCharacterEnvironment(Environment.AnotherSpeciesWorld, s));
    }

    const navigateToNextStep = () => {
        if (character.environmentStep.attribute == null) {
            Dialog.show(t('SoloEnvironmentDetailsPage.errorAttribute'));
        } else if (character.environmentStep.discipline == null) {
            Dialog.show(t('SoloEnvironmentDetailsPage.errorDiscipline'));
        } else if (character.environmentStep?.value == null) {
            Dialog.show(t('Common.error.value'));
        } else {
            if (character.stereotype === Stereotype.SoloCharacter) {
                Navigation.navigateToPage(PageIdentity.SoloEarlyOutlook);
            } else {
                Navigation.navigateToPage(PageIdentity.Upbringing);
            }
        }
    }

    const randomValue = () => {
        let value = randomUniqueValue(character.values, character.speciesStep?.species, character.environmentStep?.discipline);
        store.dispatch(setCharacterValue(value, StepContext.Environment));
    }

    const isSpeciesSelectionNeeded = () => {
        return environment.id === Environment.AnotherSpeciesWorld && character.environmentStep?.otherSpecies == null;
    }

    let speciesList = SpeciesHelper.getCaptainsLogSpecies().filter(s => s.id !== character.speciesStep?.species).map(s => new DropDownElement(s.id, s.localizedName));
    speciesList.unshift(new DropDownElement("", t('Common.text.select')));

    return (
        <div className="page container ms-0">
            {character.stereotype === Stereotype.SoloCharacter
                ? (<SoloCharacterBreadcrumbs pageIdentity={PageIdentity.SoloEarlyOutlookDetails} />)
                : (<CharacterCreationBreadcrumbs  pageIdentity={PageIdentity.EnvironmentDetails} />)};

            <main>
                <Header>{environment.localizedName}</Header>
                <Markdown>{environment.localizedDescription}</Markdown>
                <div className="row">
                    {environment.id === Environment.AnotherSpeciesWorld
                    ? (<div className="col-lg-6 my-3">
                        <Header level={2} className="mb-3">{t('Construct.other.species')}</Header>
                        <InstructionText text={t('SoloEnvironmentDetailsPage.speciesText')} />

                        <div className="mt-3">
                            <DropDownSelect items={speciesList} defaultValue={character.environmentStep?.otherSpecies ?? ""}
                                onChange={s => {if (s !== "") {selectOtherSpecies(s as Species)} }} />
                        </div>
                    </div>)
                    : undefined}

                    <div className="col-lg-6 my-3">
                        <Header level={2} className="mb-3"><>{t('Construct.other.attributes')} ({t('Common.text.selectOne')})</></Header>
                        {isSpeciesSelectionNeeded()
                            ? undefined
                            : (<AttributeListComponent controller={controller} />)}
                    </div>
                    <div className="col-lg-6 my-3">
                        <Header level={2} className="mb-3">
                            <DisciplinesOrDepartments character={character} />
                            <>{' (' + t('Common.text.selectOne') + ')'}</>
                        </Header>

                        <DisciplineListComponent controller={disciplineController} />
                    </div>
                    <div className="col-lg-6 my-3">
                        <Header level={2} className="mb-1">{t('Construct.other.value')}</Header>

                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <SoloValueInput value={character?.environmentStep?.value}
                                onValueChanged={(string) => {store.dispatch(setCharacterValue(string, StepContext.Environment))}}/>
                            <div style={{ flexShrink: 0 }} className="mt-2">
                                <D20IconButton onClick={() => randomValue() }/>
                            </div>
                            <div className="py-1 text-white">{t('Value.environment.text')}</div>
                        </div>

                        {environment.values?.length
                        ? (<div>
                            <p className="mt-3 mb-1 small"><b>{t('Common.text.suggestions')}:</b></p>
                            <ul>
                                {environment.values.map(v => (<li className="small">{v}</li>))}
                            </ul>
                        </div>)
                        : undefined}
                    </div>
                </div>
                <div className='text-end mt-4'>
                    <Button onClick={() => navigateToNextStep() }>{t('Common.button.next')}</Button>
                </div>
            </main>
        </div>);

}

export default connect(characterMapStateToProperties)(EnvironmentDetailsPage);
