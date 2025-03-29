import { Button } from "react-bootstrap";
import { ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import { Header } from "../../components/header";
import Markdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { CharacterAdvancementChoice } from "../model/characterAdvancementChoice";
import { useEffect, useState } from "react";
import { Attribute } from "../../helpers/attributes";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { CharacterAdvancementType } from "../model/characterAdvancementType";
import { makeKey } from "../../common/translationKey";
import { SimpleAttributeSelector } from "../../components/simpleAttributeSelector";
import { Department } from "../../helpers/department";
import { SimpleDepartmentSelector } from "../../components/simpleDepartmentSelector";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import D20IconButton from "../../solo/component/d20IconButton";
import { FocusRandomTable } from "../../solo/table/focusRandomTable";
import store from "../../state/store";
import { modifyCharacterAddAdvancement } from "../../state/characterActions";
import { Dialog } from "../../components/dialog";
import { ValueRandomTable } from "../../solo/table/valueRandomTable";
import ValueInput from "../../components/valueInputWithRandomOption";
import { ModalControl } from "../../components/modal";
import { TalentsHelper } from "../../helpers/talents";
import SingleTalentSelectionList from "../../components/singleTalentSelectionList";
import { SelectedTalentDescriptionView } from "../../components/selectedTalentDescriptionView";
import { SelectedTalent } from "../../common/selectedTalent";
import { SimpleStringSelector } from "./simpleStringSelector";

interface ICharacterAdvancementTypeViewProperties extends ICharacterProperties {
    onNextStep: () => void;
    onPreviousStep: () => void;
    type: CharacterAdvancementType;
}

export const CharacterAdvancementTypeView: React.FC<ICharacterAdvancementTypeViewProperties> = ({character, onNextStep, onPreviousStep, type}) => {

    const { t } = useTranslation();
    const [ choice, setChoice ] = useState<CharacterAdvancementChoice|undefined>(undefined);
    const [ attributeSelection, setAttributeSelection ] = useState<Attribute|undefined>(undefined);
    const [ removeAttributeSelection, setRemoveAttributeSelection ] = useState<Attribute|undefined>(undefined);
    const [ departmentSelection, setDepartmentSelection ] = useState<Department|undefined>(undefined);
    const [ removeDepartmentSelection, setRemoveDepartmentSelection ] = useState<Department|undefined>(undefined);
    const [ focusSelection, setFocusSelection ] = useState<string|undefined>(undefined);
    const [ removeFocusSelection, setRemoveFocusSelection ] = useState<string|undefined>(undefined);
    const [ valueSelection, setValueSelection ] = useState<string|undefined>(undefined);
    const [ talentSelection, setTalentSelection] = useState<SelectedTalent|undefined>(undefined);
    const [ removeTalentSelection, setRemoveTalentSelection] = useState<SelectedTalent|undefined>(undefined);

    useEffect(() => setChoice(undefined), [type]);

    const randomFocus = () => {
        let done = false;
        while (!done) {
            let f = FocusRandomTable();
            if (!character?.focuses?.includes(f)) {
                done = true;
                setFocusSelection(f);
            }
        }
    }

    const randomValue = () => {
        let done = false;
        while (!done) {
            let value = ValueRandomTable(character?.speciesStep?.species);
            if (!character?.values?.includes(value)) {
                done = true;
                setValueSelection(value);
            }
        }
    }

    const dropDownChoices = () => {
        let result = [];
        if (character?.rank != null) {
            result.push(new DropDownElement("", ""))
        }
        result.push(new DropDownElement(CharacterAdvancementChoice.Attribute, t('Construct.other.attribute')))
        result.push(new DropDownElement(CharacterAdvancementChoice.Department, t('Construct.other.department')))
        if (type !== CharacterAdvancementType.CharacterArc) {
            result.push(new DropDownElement(CharacterAdvancementChoice.Focus, t('Construct.other.focus')));
            result.push(new DropDownElement(CharacterAdvancementChoice.Talent, t('Construct.other.talent')));
        }
        if (type === CharacterAdvancementType.CharacterArc) {
            result.push(new DropDownElement(CharacterAdvancementChoice.Value, t('Construct.other.value')));
        }
        return result;
    }

    const applyModification = () => {
        if (choice === CharacterAdvancementChoice.Attribute) {
            if (type === CharacterAdvancementType.Adjustment) {
                if (attributeSelection != null && removeAttributeSelection != null) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, attributeSelection, removeAttributeSelection));
                    onNextStep();
                } else {
                    Dialog.show(t('CharacterAdvancementTypeView.error.twoAttributes'));
                }
            } else {
                if (attributeSelection != null) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, attributeSelection));
                    onNextStep();
                } else {
                    Dialog.show(t('Common.error.attribute'));
                }
            }
        } else if (choice === CharacterAdvancementChoice.Department) {
            if (type === CharacterAdvancementType.Adjustment) {
                if (departmentSelection != null && removeDepartmentSelection != null) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, departmentSelection, removeDepartmentSelection));
                    onNextStep();
                } else {
                    Dialog.show(t('CharacterAdvancementTypeView.error.twoDepartments'));
                }
            } else {
                if (departmentSelection != null) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, departmentSelection));
                    onNextStep();
                } else {
                    Dialog.show(t('Common.error.department'));
                }
            }
        } else if (choice === CharacterAdvancementChoice.Focus) {
            if (type === CharacterAdvancementType.Adjustment) {
                if (focusSelection?.length && removeFocusSelection?.length) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, focusSelection, removeFocusSelection));
                    onNextStep();
                } else {
                    Dialog.show(t('CharacterAdvancementTypeView.error.twoFocuses'));
                }
            } else {
                if (focusSelection?.length) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, focusSelection));
                    onNextStep();
                } else {
                    Dialog.show(t('Common.error.focus'));
                }
            }
        } else if (choice === CharacterAdvancementChoice.Talent) {
            if (type === CharacterAdvancementType.Adjustment) {
                if (talentSelection != null && removeTalentSelection != null) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, talentSelection, removeTalentSelection));
                    onNextStep();
                } else {
                    Dialog.show(t('CharacterAdvancementTypeView.error.twoFocuses'));
                }
            } else {
                if (talentSelection != null) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, talentSelection));
                    onNextStep();
                } else {
                    Dialog.show(t('Common.error.value'));
                }
            }
        } else if (choice === CharacterAdvancementChoice.Value) {
            if (valueSelection?.length) {
                store.dispatch(modifyCharacterAddAdvancement(choice, valueSelection));
                onNextStep();
            } else {
                Dialog.show(t('Common.error.value'));
            }
        }
    }

    const renderChoiceOption = () => {
        if (choice === CharacterAdvancementChoice.Attribute) {
            return (<>
                <div className="col-12 col-md-6 mt-4">
                    <Header level={2}>{t('Construct.other.attribute')}</Header>
                    <Markdown className="mt-4">
                        {t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.attribute'))}
                    </Markdown>
                    <SimpleAttributeSelector
                        character={character}
                        isChecked={(a) => attributeSelection === a}
                        onSelectAttribute={(a) => setAttributeSelection(a)} />
                </div>
            </>);
        } else if (choice === CharacterAdvancementChoice.Department) {
            return (<>
                <div className="col-12 col-md-6 mt-4">
                    <Header level={2}>{t('Construct.other.department')}</Header>
                    <Markdown className="mt-4">
                        {t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.department'))}
                    </Markdown>
                    <SimpleDepartmentSelector
                        character={character}
                        isChecked={(d) => departmentSelection === d}
                        onSelectDepartment={(d) => setDepartmentSelection(d)} />
                </div>
            </>);
        } else if (choice === CharacterAdvancementChoice.Focus) {
            if (type === CharacterAdvancementType.Adjustment) {
                return (<div className="row">
                    <div className="col-12">
                        <Header level={2} className="my-4">{t('Construct.other.focus')}</Header>
                        <Markdown>{t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.focus'))}</Markdown>
                    </div>
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Common.text.remove')}</Header>
                        <SimpleStringSelector values={character.focuses}
                            onSelect={s => setRemoveFocusSelection(s)}
                            isChecked={s => s === removeFocusSelection}/>
                    </div>
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Common.text.new')}</Header>
                        <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                            <InputFieldAndLabel labelName={t('Construct.other.focus')} value={focusSelection}
                                    id="focus" onChange={(value) => setFocusSelection(value)} />
                            <div style={{ flexShrink: 0 }} className="mt-1">
                                <D20IconButton onClick={() => randomFocus()}/>
                            </div>
                        </div>
                    </div>
                </div>);
            } else {
                return (<div className="row">
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Construct.other.focus')}</Header>
                        <Markdown>{t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.focus'))}</Markdown>
                        <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                            <InputFieldAndLabel labelName={t('Construct.other.focus')} value={focusSelection}
                                    id="focus" onChange={(value) => setFocusSelection(value)} />
                            <div style={{ flexShrink: 0 }} className="mt-1">
                                <D20IconButton onClick={() => randomFocus()}/>
                            </div>
                        </div>
                    </div>
                </div>);
            }
        } else if (choice === CharacterAdvancementChoice.Value) {
            return (<div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="my-4">{t('Construct.other.value')}</Header>
                    <Markdown>{t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.value'))}</Markdown>
                    <ValueInput onRandomClicked={() => randomValue()}
                        onValueChanged={(v) => setValueSelection(v)}
                        id="value" value={valueSelection} />
                </div>
            </div>);
        } else if (choice === CharacterAdvancementChoice.Talent) {
            return (<div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="my-4">{t('Construct.other.talent')}</Header>
                    <Markdown>{t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.talent'))}</Markdown>
                    <div className="text-end">
                        <Button size="sm" onClick={() => showTalentSelectionModal()}>{t('Common.text.select')}</Button>
                    </div>
                    {talentSelection == null
                    ? (<p>No talent selected.</p>)
                    :  <SelectedTalentDescriptionView talent={talentSelection} version={character.version} />}
                </div>
            </div>);
        } else {
            return undefined;
        }
    }

    const closeModal = () => {
        ModalControl.hide();
    }

    const showTalentSelectionModal = () => {
        const talents = TalentsHelper.getAllAvailableTalentsForCharacter(character);

        ModalControl.show("xl", () => closeModal(),

            (<div>
                <SingleTalentSelectionList construct={character} talents={talents} onSelection={(t) => setTalentSelection(t == null ? undefined : new SelectedTalent(t.name))}
                    initialSelection={talentSelection == null ? null : TalentsHelper.getTalent(talentSelection.talent)} />

                <div className="text-center mt-4">
                    <Button size="sm" onClick={() => closeModal()}>{t('Common.button.ok')}</Button>
                </div>
            </div>),

            t("ModifySupportingCharacter.talentModal.title"));
    }

    return (<>
        <div className="row">

            <div className="col-12">
                <Markdown className="mt-4">{t('CharacterAdvancementType.choice.instruction')}</Markdown>
                <div className="my-3">
                    <DropDownSelect items={dropDownChoices()}
                        onChange={(v) => setChoice(v === "" ? undefined : v as CharacterAdvancementChoice)}
                        defaultValue={choice ?? ""} />
                </div>
            </div>

            {renderChoiceOption()}

            <div className="mt-5 d-flex justify-content-between">
                <Button size="sm" onClick={() => onPreviousStep()}>{t('Common.button.previous')}</Button>
                <Button size="sm" disabled={choice == undefined} onClick={() => applyModification()}>{t('Common.button.finish')}</Button>
            </div>

        </div>
    </>);
}