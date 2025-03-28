import { Button } from "react-bootstrap";
import { ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import { Header } from "../../components/header";
import Markdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { CharacterAdvancementChoice } from "../model/characterAdvancementChoice";
import { useState } from "react";
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

interface ICharacterAdvancementTypeViewProperties extends ICharacterProperties {
    onNextStep: () => void;
    onPreviousStep: () => void;
    type: CharacterAdvancementType;
}

export const CharacterAdvancementTypeView: React.FC<ICharacterAdvancementTypeViewProperties> = ({character, onNextStep, onPreviousStep, type}) => {

    const { t } = useTranslation();
    const [ choice, setChoice ] = useState<CharacterAdvancementChoice|undefined>(undefined);
    const [ attributeSelection, setAttributeSelection ] = useState<Attribute|undefined>(undefined);
    const [ departmentSelection, setDepartmentSelection ] = useState<Department|undefined>(undefined);
    const [ focusSelection, setFocusSelection ] = useState<string|undefined>(undefined);
    const [ valueSelection, setValueSelection ] = useState<string|undefined>(undefined);

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
            if (attributeSelection != null) {
                store.dispatch(modifyCharacterAddAdvancement(choice, attributeSelection));
                onNextStep();
            } else {
                Dialog.show(t('CharacterAdvancementTypeView.error.attribute'));
            }
        } else if (choice === CharacterAdvancementChoice.Department) {
            if (departmentSelection != null) {
                store.dispatch(modifyCharacterAddAdvancement(choice, departmentSelection));
                onNextStep();
            } else {
                Dialog.show(t('CharacterAdvancementTypeView.error.department'));
            }
        } else if (choice === CharacterAdvancementChoice.Focus) {
            if (focusSelection?.length) {
                store.dispatch(modifyCharacterAddAdvancement(choice, focusSelection));
                onNextStep();
            } else {
                Dialog.show(t('Common.error.focus'));
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
            return (<div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="my-4">{t('Construct.other.focus')}</Header>
                    <Markdown>{t('ModifySupportingCharacter.focus.instruction')}</Markdown>
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
            return undefined;
        }
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