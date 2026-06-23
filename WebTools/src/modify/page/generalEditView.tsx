import { useTranslation } from "react-i18next";
import { ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import Markdown from "react-markdown";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Header } from "../../components/header";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import store from "../../state/store";
import { setCharacterName, setCharacterPronouns, updateCharacterGeneralEditFocusChange, updateCharacterGeneralEditSpeciesAbility, updateCharacterGeneralEditTalentChange, updateCharacterGeneralEditValueChange } from "../../state/characterActions";
import { FocusAssembly, TalentAssembly, ValueAssembly } from "../../common/characterAssembly";
import { SpeciesAbilityList } from "../../helpers/speciesAbility";
import { AttributesHelper } from "../../helpers/attributes";
import { AttributeView } from "../../components/attribute";
import { makeKey } from "../../common/translationKey";
import { AdditionalTalentInfo } from "../../supportingcharacters/modify/additionalTalentInfo";
import { SelectedTalentDescriptionView } from "../../components/selectedTalentDescriptionView";
import { NameGenerator } from "../../npc/nameGenerator";
import { SpeciesHelper } from "../../helpers/species";
import D20IconButton from "../../solo/component/d20IconButton";
import { SpeciesModel } from "../../helpers/speciesModel";
import { TalentsHelper } from "../../helpers/talents";
import { ModalControl } from "../../components/modal";
import SimpleTalentSelectionList from "../../components/simpleTalentSelectionList";
import { SelectedTalent } from "../../common/selectedTalent";

interface IGeneralEditViewProperties extends ICharacterProperties {
    onNextStep: () => void;
    onPreviousStep: () => void;
}

enum Tab {
    Species,
    Values,
    Focuses,
    Talents,
    Final
}

export const GeneralEditView: React.FC<IGeneralEditViewProperties> = ({character, onNextStep, onPreviousStep}) => {

    const [ tab, setTab ] = useState<Tab>(Tab.Species);
    const { t } = useTranslation();

    const closeModal = () => {
        ModalControl.hide();
    }

    const showTalentSelectionModal = (talentAssembly: TalentAssembly) => {
        const talents = TalentsHelper.getAllAvailableTalentsForCharacter(character);

        ModalControl.show("xl", () => closeModal(),

            (<div>
                <SimpleTalentSelectionList construct={character} talents={talents} onSelection={(t) => onTalentChanged(talentAssembly, t)} />
                <div className="text-center mt-4">
                    <Button size="sm" onClick={() => closeModal()}>{t('Common.button.ok')}</Button>
                </div>
            </div>),

            t("ModifySupportingCharacter.talentModal.title"));
    }

    const prepareForOnNextStep = () => {
        onNextStep();
    }

    const onTalentChanged = (oldTalent: TalentAssembly, talent: SelectedTalent) => {
        store.dispatch(updateCharacterGeneralEditTalentChange(oldTalent, talent));
    }

    const addSpeciesAbility = () => {
        store.dispatch(updateCharacterGeneralEditSpeciesAbility(character.speciesStep.species));
    }

    const onFocusChanged = (oldFocus: FocusAssembly, focus: string) => {
        store.dispatch(updateCharacterGeneralEditFocusChange(oldFocus, focus));
    }

    const onValueChanged = (oldValue: ValueAssembly, value: string) => {
        store.dispatch(updateCharacterGeneralEditValueChange(oldValue, value));
    }


    const onNameChanged = (value: string) => {
        store.dispatch(setCharacterName(value));
    }

    const onPronounsChanged = (value: string) => {
        store.dispatch(setCharacterPronouns(value));
    }

    const randomName = (species: SpeciesModel) => {
        let { name, pronouns } = NameGenerator.instance.createName(species);
        store.dispatch(setCharacterName(name));
        store.dispatch(setCharacterPronouns(pronouns));
    }

    const renderFinalTab = () => {
        const species = SpeciesHelper.getSpeciesByType(character?.speciesStep?.species);
        return (<div className="row mt-4">
            <div className="col-12 col-md-6">
                <Header level={2} className="mb-3">{t('Construct.other.name')}</Header>
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <InputFieldAndLabel labelName={t('Construct.other.name')} id="name" onChange={(value) => onNameChanged(value)} value={character.name ?? ""} />
                    {NameGenerator.instance.isSupported(species)
                        ? (<div style={{ flexShrink: 0 }} className="mt-1">
                            <D20IconButton onClick={() => randomName(species)}/>
                        </div>)
                        : undefined}
                </div>

                <div className="mt-3">
                    <InputFieldAndLabel labelName={t('Construct.other.pronouns')} id="pronouns" onChange={(value) => onPronounsChanged(value)} value={character.pronouns ?? ""} />
                    <div className="text-white mt-1"><small><b>{t('Common.text.suggestions')}: </b> <i>she/her, they/them, etc.</i></small></div>
                </div>
            </div>
        </div>)
    }

    const renderSpeciesTab = () => {

        let attributes = AttributesHelper.getAllAttributes()
            .filter(a => character.speciesStep.attributes.includes(a) || character.speciesStep.decrementAttributes.includes(a))
            .map(a => {
                let points = character.speciesStep.attributes.filter(at => at === a).length;
                if (points === 0) {
                    points = -character.speciesStep.decrementAttributes.filter(at => at === a).length;
                }
                return (<AttributeView
                    name={t(makeKey('Construct.attribute.', AttributesHelper.getAttributeName(a))) }
                    points={points} />)
                });


        return (<>
            <div className="row mt-4">
                <div className="col-12 col-md-6">
                    <Header level={2} className="my-4">{character.speciesName}</Header>

                    {attributes}


                {SpeciesAbilityList.instance.getBySpecies(character.speciesStep.species) != null
                ? character.speciesStep?.ability != null
                    ? (<p className="mt-3">
                        <b>{t('Construct.other.speciesAbility')}: </b>
                        <span>{character.speciesStep?.ability?.name}</span>
                        </p>)
                    : (<div>
                        <Markdown>{t("GeneralEditView.speciesAbility.available")}</Markdown>
                        <div className="mt-3">
                            <Button size="sm" onClick={addSpeciesAbility}>{t("Common.button.add")}</Button>
                        </div>
                    </div>)
                : undefined}
                </div>
            </div>
        </>);
    }


    const renderValuesTab = () => {

        return (<>
            <Header level={2} className="my-4">{t('Construct.other.values')}</Header>
            <div className="row mt-4">

                {character.valueAssemblies.map((v,i) =>
                (<>
                    <div className="col-12 col-md-6" key={"value-" + i}>
                        <InputFieldAndLabel labelName={t('Construct.other.value')} id={"value" + i}  onChange={(value) => onValueChanged(v, value)} value={v?.value ?? ""} />
                    </div>
                </>))}
            </div>
        </>);
    }

    const renderFocusTab = () => {

        return (<>
            <Header level={2} className="my-4">{t('Construct.other.focuses')}</Header>
            <div className="row mt-4">

                {character.focusAssemblies.map((f,i) =>
                (<>
                    <div className="col-12 col-md-6" key={"focus-" + i}>
                        <InputFieldAndLabel labelName={t('Construct.other.focus')} id={"focus" + i}  onChange={(value) => onFocusChanged(f, value)} value={f.focus ?? ""} />
                    </div>
                </>))}
            </div>
        </>);
    }

    const renderTalentsTab = () => {

        return (<>
            <div className="row mt-4">
                {character.talentAssemblies.map((talent,i) =>
                (<>
                    <div className="col-12 col-md-6" key={"talent-" + i}>
                        <Header level={2} className="my-4">{talent.talent.talentModel.localizedName}</Header>
                        <div className="text-end">
                            <Button size="sm" variant="outline-primary" onClick={() => showTalentSelectionModal(talent)}>{t("Common.button.modify")}</Button>
                        </div>
                        <SelectedTalentDescriptionView talent={talent.talent} version={character.version} />
                        <AdditionalTalentInfo character={character} talentSelection={talent.talent}
                            setTalentSelection={(s) => {}} simpleHeader={true} />
                    </div>
                </>))}
            </div>
        </>);
    }

    const renderTab = () => {
        if (tab === Tab.Values) {
            return renderValuesTab();
        } else if (tab === Tab.Focuses) {
            return renderFocusTab();
        } else if (tab === Tab.Species) {
            return renderSpeciesTab();
        } else if (tab === Tab.Talents) {
            return renderTalentsTab();
        } else if (tab === Tab.Final) {
            return renderFinalTab();
        } else {
            return undefined;
        }
    }

    return (<>
        <Markdown className="mt-4">{t('GeneralEditView.instruction')}</Markdown>

        <div className="mt-4">
            <div className="btn-group w-100" role="group" aria-label="Character options">
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.Species ? "active" : "")}
                    onClick={() => setTab(Tab.Species)}>{t('Page.title.species')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.Focuses ? "active" : "")}
                    onClick={() => setTab(Tab.Focuses)}>{t('Construct.other.focuses')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.Values ? "active" : "")}
                    onClick={() => setTab(Tab.Values)}>{t('Construct.other.values')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.Talents ? "active" : "")}
                    onClick={() => setTab(Tab.Talents)}>{t('Construct.other.talents')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.Final ? "active" : "")}
                    onClick={() => setTab(Tab.Final)}>{t('Page.title.soloFinal')}</button>
            </div>
        </div>

        {renderTab()}

        <div className="mt-5 d-flex justify-content-between">
            <Button size="sm" onClick={onPreviousStep}>{t('Common.button.previous')}</Button>
            <Button size="sm" onClick={prepareForOnNextStep}>{t('Common.button.finish')}</Button>
        </div>
    </>)

}