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
import store from "../../state/store";
import { modifyCharacterAddAdvancement } from "../../state/characterActions";
import { Dialog } from "../../components/dialog";
import { randomUniqueValue } from "../../solo/table/valueRandomTable";
import ValueInput from "../../components/valueInput";
import { ModalControl } from "../../components/modal";
import { TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_BOLD, TALENT_NAME_BORG_IMPLANTS, TALENT_NAME_CAUTIOUS, TALENT_NAME_COLLABORATION, TALENT_NAME_CUSTOM_TALENT, TALENT_NAME_DEFENSIVE_TRAINING, TALENT_NAME_EXPANDED_PROGRAM, TALENT_NAME_IM_A_DOCTOR_NOT_A, TALENT_NAME_VISIT_EVERY_STAR, TALENT_NAME_WARRIORS_SPIRIT, TALENT_NAME_WISDOM_OF_YEARS, TalentsHelper } from "../../helpers/talents";
import { AugmentedAbilitySelectionView, BoldOrCautiousDepartmentSelectionView, BorgImplantsSelectionView, CollaborationDepartmentSelectionView, DefensiveTrainingAttackTypeSelectionView, ExpandedProgramSelectionView, SelectedTalentDescriptionView, VisitEveryStarSelectionView, WarriorsSpiritSelectionView, WisdomOfYearsSelectionView } from "../../components/selectedTalentDescriptionView";
import { SelectedTalent } from "../../common/selectedTalent";
import { SimpleStringSelector } from "./simpleStringSelector";
import { Character } from "../../common/character";
import { SpecialWeapon } from "../../common/specialWeapon";
import SimpleTalentSelectionList from "../../components/simpleTalentSelectionList";
import { FocusSelectionView } from "../../components/focusSelectionView";
import { determineSelectedTalentExtraErrors } from "../../common/selectedTalentExtraCheck";
import { AttackType } from "../../common/attackType";
import { TalentSelector } from "./talentSelector";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { LogEntry } from "../../common/logEntry";



interface ICharacterAdvancementTypeViewProperties extends ICharacterProperties {
    logEntry?: LogEntry;
    logEntryCallback?: LogEntry;
    onNextStep: () => void;
    onPreviousStep: () => void;
    type: CharacterAdvancementType;
}

export const CharacterAdvancementTypeView: React.FC<ICharacterAdvancementTypeViewProperties> = ({character, onNextStep, onPreviousStep, type, logEntry, logEntryCallback}) => {

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
    const [ removeTalentSelectionIndex, setRemoveTalentSelectionIndex] = useState<number|undefined>(undefined);

    useEffect(() => setChoice(undefined), [type]);

    const randomValue = () => {
        let value = randomUniqueValue(character?.values ?? [], character?.speciesStep?.species);
        setValueSelection(value);
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
                    store.dispatch(modifyCharacterAddAdvancement(choice, attributeSelection, removeAttributeSelection, logEntry, logEntryCallback));
                    onNextStep();
                } else {
                    Dialog.show(t('CharacterAdvancementTypeView.error.twoAttributes'));
                }
            } else {
                if (attributeSelection != null) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, attributeSelection, undefined, logEntry, logEntryCallback));
                    onNextStep();
                } else {
                    Dialog.show(t('Common.error.attribute'));
                }
            }
        } else if (choice === CharacterAdvancementChoice.Department) {
            if (type === CharacterAdvancementType.Adjustment) {
                if (departmentSelection != null && removeDepartmentSelection != null) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, departmentSelection, removeDepartmentSelection, logEntry, logEntryCallback));
                    onNextStep();
                } else {
                    Dialog.show(t('CharacterAdvancementTypeView.error.twoDepartments'));
                }
            } else {
                if (departmentSelection != null) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, departmentSelection, undefined, logEntry, logEntryCallback));
                    onNextStep();
                } else {
                    Dialog.show(t('Common.error.department'));
                }
            }
        } else if (choice === CharacterAdvancementChoice.Focus) {
            if (type === CharacterAdvancementType.Adjustment) {
                if (focusSelection?.length && removeFocusSelection?.length) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, focusSelection, removeFocusSelection, logEntry, logEntryCallback));
                    onNextStep();
                } else {
                    Dialog.show(t('CharacterAdvancementTypeView.error.twoFocuses'));
                }
            } else {
                if (focusSelection?.length) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, focusSelection, undefined, logEntry, logEntryCallback));
                    onNextStep();
                } else {
                    Dialog.show(t('Common.error.focus'));
                }
            }
        } else if (choice === CharacterAdvancementChoice.Talent) {
            if (type === CharacterAdvancementType.Adjustment) {
                if (talentSelection == null || removeTalentSelectionIndex == null) {
                    Dialog.show(t('CharacterAdvancementTypeView.error.twoTalents'));
                } else if (talentAdditionalDetailsSelected()) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, talentSelection, character.talents[removeTalentSelectionIndex], logEntry, logEntryCallback));
                    onNextStep();
                }
            } else {
                if (talentSelection == null) {
                    Dialog.show(t('Common.error.talent'));
                } else if (talentAdditionalDetailsSelected()) {
                    store.dispatch(modifyCharacterAddAdvancement(choice, talentSelection, undefined, logEntry, logEntryCallback));
                    onNextStep();
                }
            }
        } else if (choice === CharacterAdvancementChoice.Value) {
            if (valueSelection?.length) {
                store.dispatch(modifyCharacterAddAdvancement(choice, valueSelection, undefined, logEntry, logEntryCallback));
                onNextStep();
            } else if (talentAdditionalDetailsSelected()) {
                Dialog.show(t('Common.error.value'));
            }
        }
    }

    const talentAdditionalDetailsSelected = () => {
        if (determineSelectedTalentExtraErrors(talentSelection) != null) {
            Dialog.show(determineSelectedTalentExtraErrors(talentSelection));
            return false;
        } else if (talentSelection?.talent === TALENT_NAME_VISIT_EVERY_STAR && !talentSelection.focuses?.length) {
            Dialog.show("Common.error.focus");
            return false;
        } else {
            return true;
        }
    }

    const isAttributeDecrementable = (a: Attribute, c: Character) => {
        return c.attributes[a] > 7;
    }

    const isAttributeIncrementable = (a: Attribute, c: Character) => {
        let value = c.attributes[a];
        if (a === removeAttributeSelection && type === CharacterAdvancementType.Adjustment) {
            return false;
        } else if (value >= Character.maxAttribute(character)) {
            return false;
        } else if (type !== CharacterAdvancementType.CharacterArc && value >= (Character.ABSOLUTE_MAX_ATTRIBUTE - 1)) {
            return false;
        } else {
            return true;
        }
    }

    const isDepartmentDecrementable = (d: Department, c: Character) => {
        return c.departments[d] > 1;
    }

    const isDepartmentIncrementable = (d: Department, c: Character) => {
        let value = c.departments[d];
        if (d === removeDepartmentSelection && type === CharacterAdvancementType.Adjustment) {
            return false;
        } else if (value >= Character.maxDepartment(character)) {
            return false;
        } else if (type !== CharacterAdvancementType.CharacterArc && value >= (Character.ABSOLUTE_MAX_DEPARTMENT - 1)) {
            return false;
        } else {
            return true;
        }
    }

    const handleAdditionalTalentSelections = () => {
        if (talentSelection?.talent === TALENT_NAME_WARRIORS_SPIRIT) {
            return (<div className="col-12 col-md-6">
                    <WarriorsSpiritSelectionView onSelection={(selection) => {
                        let temp = talentSelection.copy();
                        temp.selection = selection as SpecialWeapon;
                        setTalentSelection(temp);
                    }} character={character} />
                </div>);
        } else if (talentSelection?.talent === TALENT_NAME_VISIT_EVERY_STAR) {
            return (<div className="col-12 col-md-6">
                    <VisitEveryStarSelectionView onSelection={(selection) => {
                        let temp = talentSelection.copy();
                        temp.focuses = selection == null ? [] : (selection as string[]);
                        setTalentSelection(temp);
                    }} character={character} />
                </div>);
        } else if (talentSelection?.name === TALENT_NAME_CUSTOM_TALENT) {
            return (<div className="my-3">
                <div>
                    <InputFieldAndLabel labelName={t('Common.text.talentName')}
                        id="customName"
                        value={talentSelection.customTalentName}
                        onChange={(n) => {
                            let temp = talentSelection?.copy();
                            if (temp) {
                                temp.customTalentName = n;
                            }
                            setTalentSelection(temp);
                        }
                    } />
                </div>
                <div>
                    <textarea className="w-100 mt-3"
                        value={talentSelection.customTalentDescription}
                        placeholder={t('Common.text.description')}
                        onChange={(e) => {
                            let description = e.target.value;
                            let temp = talentSelection?.copy();
                            if (temp) {
                                temp.customTalentDescription = description;
                            }
                            setTalentSelection(temp);
                        }} />
                </div>
            </div>);
        } else if (talentSelection?.talent === TALENT_NAME_EXPANDED_PROGRAM) {
            return (<div className="col-12 col-md-6">
                    <ExpandedProgramSelectionView onSelection={(selection) => {
                        let temp = talentSelection.copy();
                        temp.focuses = selection == null ? [] : (selection as string[]);
                        setTalentSelection(temp);
                    }} character={character} />
                </div>);
        } else if (talentSelection?.talent === TALENT_NAME_BORG_IMPLANTS) {
            return (<div className="col-12 col-md-6">
                    <BorgImplantsSelectionView onSelection={(selection) => {
                        let temp = talentSelection.copy();
                        temp.implants = selection;
                        setTalentSelection(temp);
                    }} character={character} />
                </div>);
        } else if (talentSelection?.talent === TALENT_NAME_AUGMENTED_ABILITY) {
            return (<div className="col-12 col-md-6">
                    <AugmentedAbilitySelectionView onAttributeSelection={(a) => {
                        let temp = talentSelection.copy();
                        temp.attribute = a;
                        setTalentSelection(temp);
                    }} character={character} />
                </div>);
        } else if (talentSelection?.talent === TALENT_NAME_COLLABORATION) {
            return (<div className="col-12 col-md-6">
                    <CollaborationDepartmentSelectionView onDepartmentSelection={(d) => {
                        let temp = talentSelection.copy();
                        temp.department = d;
                        setTalentSelection(temp);
                    }} character={character} />
                </div>);
        } else if ([TALENT_NAME_IM_A_DOCTOR_NOT_A].includes(talentSelection?.talent)) {
            return (<div className="col-12 col-md-6">
                <SimpleDepartmentSelector
                    character={character}
                    isChecked={d => talentSelection.department === d}
                    onSelectDepartment={d => {
                        let temp = talentSelection?.copy();
                        if (temp) {
                            temp.department = d;
                        }
                        setTalentSelection(temp);
                    }}
                    isUpdateable={d => {
                        if (character.departments[d] > 1) {
                            return false;
                        } else if (d === talentSelection.department) {
                            return true;
                        } else {
                            let departments = character.talents
                                .filter(t => t.talent === TALENT_NAME_IM_A_DOCTOR_NOT_A && t.department != null)
                                .map(t => t.department);
                            return !departments.includes(d);
                        }
                    }}
                />
                </div>);
        } else if ([TALENT_NAME_BOLD, TALENT_NAME_CAUTIOUS].includes(talentSelection?.talent)) {
            return (<div className="col-12 col-md-6">
                    <BoldOrCautiousDepartmentSelectionView onDepartmentSelection={(d) => {
                        let temp = talentSelection.copy();
                        temp.department = d;
                        setTalentSelection(temp);
                    }} character={character} talent={talentSelection.talentModel} />
                </div>);
        } else if (talentSelection?.talent === TALENT_NAME_DEFENSIVE_TRAINING) {
            return (<div className="col-12 col-md-6">
                    <DefensiveTrainingAttackTypeSelectionView onSelection={(t) => {
                        let temp = talentSelection.copy();
                        temp.selection = t as AttackType;
                        setTalentSelection(temp);
                    }} character={character} />
                </div>);
        } else if (talentSelection?.talent === TALENT_NAME_WISDOM_OF_YEARS) {
            return (<div className="col-12 col-md-6">
                    <WisdomOfYearsSelectionView onFocusSelection={(selection) => {
                        let temp = talentSelection.copy();
                        temp.focuses = selection == null ? [] : [ selection ];
                        setTalentSelection(temp);
                    }}
                    onValueSelection={value => {
                        let temp = talentSelection.copy();
                        temp.value = value;
                        setTalentSelection(temp);
                    }}
                    character={character} />
                </div>);
        } else {
            return undefined;
        }
    }

    const renderChoiceOption = () => {
        if (choice === CharacterAdvancementChoice.Attribute) {
            if (type === CharacterAdvancementType.Adjustment) {
                return (<div className="row">
                    <div className="col-12">
                        <Header level={2} className="my-4">{t('Construct.other.attribute')}</Header>
                        <Markdown>{t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.attribute'))}</Markdown>
                    </div>
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Common.text.remove')}</Header>
                        <SimpleAttributeSelector
                            character={character}
                            isChecked={(a) => removeAttributeSelection === a}
                            onSelectAttribute={(a) => {
                                setRemoveAttributeSelection(a);
                                if (a === attributeSelection) {
                                    setAttributeSelection(undefined);
                                }
                            }}
                            isUpdateable={isAttributeDecrementable}/>
                    </div>
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Common.text.new')}</Header>
                        <SimpleAttributeSelector
                            character={character}
                            isChecked={(a) => attributeSelection === a}
                            onSelectAttribute={(a) => {
                                setAttributeSelection(a);
                                if (a === removeAttributeSelection) {
                                    setRemoveAttributeSelection(undefined);
                                }
                            }}
                            isUpdateable={isAttributeIncrementable}/>
                    </div>
                </div>);
            } else {
                return (<>
                    <div className="col-12 col-md-6 mt-4">
                        <Header level={2}>{t('Construct.other.attribute')}</Header>
                        <Markdown className="mt-4">
                            {t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.attribute'))}
                        </Markdown>
                        <SimpleAttributeSelector
                            character={character}
                            isChecked={(a) => attributeSelection === a}
                            onSelectAttribute={(a) => setAttributeSelection(a)}
                            isUpdateable={isAttributeIncrementable}/>
                    </div>
                </>);
            }
        } else if (choice === CharacterAdvancementChoice.Department) {
            if (type === CharacterAdvancementType.Adjustment) {
                return (<div className="row">
                    <div className="col-12">
                        <Header level={2} className="my-4">{t('Construct.other.department')}</Header>
                        <Markdown>{t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.department'))}</Markdown>
                    </div>
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Common.text.remove')}</Header>
                        <SimpleDepartmentSelector
                            character={character}
                            isChecked={(d) => removeDepartmentSelection === d}
                            onSelectDepartment={(d) => {
                                setRemoveDepartmentSelection(d);
                                if (d === departmentSelection) {
                                    setDepartmentSelection(undefined);
                                }
                            }}
                            isUpdateable={isDepartmentDecrementable}/>
                    </div>
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Common.text.new')}</Header>
                        <SimpleDepartmentSelector
                            character={character}
                            isChecked={(a) => departmentSelection === a}
                            onSelectDepartment={(a) => {
                                setDepartmentSelection(a);
                                if (a === removeDepartmentSelection) {
                                    setRemoveDepartmentSelection(undefined);
                                }
                            }}
                            isUpdateable={isDepartmentIncrementable}/>
                    </div>
                </div>);
            } else {
                return (<>
                    <div className="col-12 col-md-6 mt-4">
                        <Header level={2}>{t('Construct.other.department')}</Header>
                        <Markdown className="mt-4">
                            {t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.department'))}
                        </Markdown>
                        <SimpleDepartmentSelector
                            character={character}
                            isChecked={(d) => departmentSelection === d}
                            onSelectDepartment={(d) => setDepartmentSelection(d)}
                            isUpdateable={isDepartmentIncrementable}/>
                    </div>
                </>);
            }
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
                        <FocusSelectionView addFocus={(f) => setFocusSelection(f)}
                            value={focusSelection} character={character} />
                    </div>
                </div>);
            } else {
                return (<div className="row">
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Construct.other.focus')}</Header>
                        <Markdown>{t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.focus'))}</Markdown>
                        <FocusSelectionView addFocus={(f) => setFocusSelection(f)}
                            value={focusSelection} character={character} />
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
            if (type === CharacterAdvancementType.Adjustment) {
                return (<div className="row">
                    <div className="col-12">
                        <Header level={2} className="my-4">{t('Construct.other.focus')}</Header>
                        <Markdown>{t(makeKey('CharacterAdvancementTypeView.', CharacterAdvancementType[type], '.focus'))}</Markdown>
                    </div>
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Common.text.remove')}</Header>
                        <TalentSelector values={character.talents}
                            onSelect={(s,i) => setRemoveTalentSelectionIndex(i)}
                            isChecked={(s,i) => i === removeTalentSelectionIndex}/>
                    </div>
                    <div className="col-12 col-md-6">
                        <Header level={2} className="my-4">{t('Common.text.new')}</Header>
                        <div className="text-end">
                            <Button size="sm" onClick={() => showTalentSelectionModal()}>{t('Common.text.select')}</Button>
                        </div>
                        {talentSelection == null
                        ? (<p>No talent selected.</p>)
                        :  <SelectedTalentDescriptionView talent={talentSelection} version={character.version} />}
                    </div>
                    {handleAdditionalTalentSelections()}
                </div>);
            } else {
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
                    {handleAdditionalTalentSelections()}
                </div>);
            }
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
                <SimpleTalentSelectionList construct={character} talents={talents} onSelection={(t) => setTalentSelection(t == null ? undefined : t)} />
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
                <Button size="sm" disabled={choice === undefined} onClick={() => applyModification()}>{t('Common.button.finish')}</Button>
            </div>

        </div>
    </>);
}