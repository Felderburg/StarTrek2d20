import { connect } from "react-redux";
import { ICharacterPageProperties } from "../../common/iCharacterPageProperties";
import { characterMapStateToProperties } from "../../solo/page/soloCharacterProperties";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { useTranslation } from "react-i18next";
import { Header } from "../../components/header";
import Markdown from "react-markdown";
import Carousel from 'react-bootstrap/Carousel';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { SupportingCharacterModificationType } from "./supportingCharacterModificationType";
import ValueInput from "../../components/valueInputWithRandomOption";
import { useNavigate } from "react-router";
import { Dialog } from "../../components/dialog";
import { ValueRandomTable } from "../../solo/table/valueRandomTable";
import store from "../../state/store";
import { marshaller } from "../../helpers/marshaller";
import { modifySupportingCharacterAddImprovement } from "../../state/characterActions";
import { Attribute } from "../../helpers/attributes";
import { SimpleAttributeSelector } from "../../components/simpleAttributeSelector";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import D20IconButton from "../../solo/component/d20IconButton";
import { FocusRandomTable } from "../../solo/table/focusRandomTable";
import { Skill } from "../../helpers/skills";
import { SimpleDepartmentSelector } from "../../components/simpleDepartmentSelector";
import { TalentsHelper } from "../../helpers/talents";
import { TalentDescription } from "../../components/talentDescription";
import { ModalControl } from "../../components/modal";
import SingleTalentSelectionList from "../../components/singleTalentSelectionList";

const ModifySupportingCharacterPage : React.FC<ICharacterPageProperties> = ({character}) => {

    const ALLOWED_IMPROVEMENT_COUNT = [1, 1, 3, 4, 4];

    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const [modificationType, setModificationType] = useState<string|SupportingCharacterModificationType>("");
    const [valueSelection, setValueSelection] = useState<string>("");
    const [attriubteSelection, setAttributeSelection] = useState<Attribute>();
    const [departmentSelection, setDepartmentSelection] = useState<Skill>();
    const [focusSelection, setFocusSelection] = useState<string>("");
    const [talentSelection, setTalentSelection] = useState<string>(null);
    const navigate = useNavigate();

    const onNextPage = () => {
        if (index === 0) {
            if (modificationType === "") {
                Dialog.show("Please select an improvement type.");
            } else {
                if (existingImprovementCountByType() >= ALLOWED_IMPROVEMENT_COUNT[modificationType]) {
                    Dialog.show("This character has taken the maximum number (" + ALLOWED_IMPROVEMENT_COUNT[modificationType]
                        + ") of this type of improvement.");
                } else {
                    setIndex(index + 1);
                }
            }
        } else if (index === 1) {
            setIndex(index + 1);
        }
    }

    const existingImprovementCountByType = () => {
        switch (modificationType) {
        case SupportingCharacterModificationType.AdditionalAttribute:
            return character.improvements?.filter(i => i.attribute != null)?.length ?? 0
        case SupportingCharacterModificationType.AdditionalDepartment:
            return character.improvements?.filter(i => i.discipline != null)?.length ?? 0
        case SupportingCharacterModificationType.AdditionalFocus:
            return character.improvements?.filter(i => i.focus != null)?.length ?? 0
        case SupportingCharacterModificationType.AdditionalValue:
            return character.improvements?.filter(i => i.value != null)?.length ?? 0
        case SupportingCharacterModificationType.AdditionalTalent:
            return character.improvements?.filter(i => i.talent != null)?.length ?? 0
        }
    }

    const applyModification = () => {
        if (modificationType === SupportingCharacterModificationType.AdditionalValue) {
            if (!valueSelection?.length) {
                Dialog.show("Please select a value");
            } else {
                store.dispatch(modifySupportingCharacterAddImprovement(modificationType, valueSelection));
                onNextPage();
            }
        } else if (modificationType === SupportingCharacterModificationType.AdditionalFocus) {
            if (!focusSelection?.length) {
                Dialog.show("Please select a focus");
            } else {
                store.dispatch(modifySupportingCharacterAddImprovement(modificationType, focusSelection));
                onNextPage();
            }
        } else if (modificationType === SupportingCharacterModificationType.AdditionalAttribute) {
            if (attriubteSelection == null) {
                Dialog.show("Please select an attribute");
            } else {
                store.dispatch(modifySupportingCharacterAddImprovement(modificationType, attriubteSelection));
                onNextPage();
            }
        } else if (modificationType === SupportingCharacterModificationType.AdditionalTalent) {
            if (talentSelection == null) {
                Dialog.show(t("ModifySupportingCharacter.error.talent"));
            } else {
                store.dispatch(modifySupportingCharacterAddImprovement(modificationType, talentSelection));
                onNextPage();
            }
        } else if (modificationType === SupportingCharacterModificationType.AdditionalDepartment) {
            if (departmentSelection == null) {
                Dialog.show("Please select a department");
            } else {
                store.dispatch(modifySupportingCharacterAddImprovement(modificationType, departmentSelection));
                onNextPage();
            }
        }
    }

    const viewCharacter = () => {
        setTimeout(() => {
            let c = store.getState().character.currentCharacter;
            const value = marshaller.encodeSupportingCharacter(c);
            navigate('/view?s=' + value);
        }, 200);
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

    const renderButtonBar = () => {
        if (index === 0) {
            return (<div className="mt-4 text-end">
                    <Button onClick={() => onNextPage()}>{t('Common.button.next')}</Button>
                </div>);
        } else if (index === 1) {
            return (<div className="mt-4 d-flex justify-content-between">
                <Button onClick={() => setIndex(index - 1)}>{t('Common.button.previous')}</Button>
                <Button onClick={() => applyModification()}>{t('Common.button.finish')}</Button>
            </div>);
        } else {
            return (<div className="mt-4">
                <Button size="sm" onClick={() => viewCharacter()}>{t('Common.button.view')}</Button>
            </div>);

        }
    }

    const closeModal = () => {
        ModalControl.hide();
    }

    const showTalentSelectionModal = () => {
        const talents = TalentsHelper.getAllAvailableTalentsForCharacter(character);

        ModalControl.show("xl", () => closeModal(),

            (<div>
                <SingleTalentSelectionList construct={character} talents={talents} onSelection={(t) => setTalentSelection(t?.name)}
                    initialSelection={talentSelection == null ? null : TalentsHelper.getTalent(talentSelection)} />

                <div className="text-center mt-4">
                    <Button size="sm" onClick={() => closeModal()}>{t('Common.button.ok')}</Button>
                </div>
            </div>),

            t("ModifySupportingCharacter.talentModal.title"));
    }

    const renderImprovementSection = () => {
        if (modificationType === SupportingCharacterModificationType.AdditionalValue) {
            return (<div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="my-4">{t('Construct.other.value')}</Header>
                    <Markdown>{t('ModifySupportingCharacter.value.instruction')}</Markdown>
                    <ValueInput onRandomClicked={() => randomValue()}
                        onValueChanged={(v) => setValueSelection(v)}
                        id="value" value={valueSelection} />
                </div>
            </div>);
        } else if (modificationType === SupportingCharacterModificationType.AdditionalFocus) {
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
        } else if (modificationType === SupportingCharacterModificationType.AdditionalAttribute) {
            return (<div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="my-4">{t('Construct.other.attribute')}</Header>
                    <Markdown>{t('ModifySupportingCharacter.attribute.instruction')}</Markdown>
                    <SimpleAttributeSelector onSelectAttribute={(a) => setAttributeSelection(a)} isChecked={(a) => attriubteSelection === a} />
                </div>
            </div>);
        } else if (modificationType === SupportingCharacterModificationType.AdditionalTalent) {
            const talent = talentSelection == null ? null : TalentsHelper.getTalent(talentSelection);
            return (<div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="my-4">{t('Construct.other.talent')}</Header>
                    <Markdown>{t('ModifySupportingCharacter.talent.instruction')}</Markdown>
                    <div className="text-end">
                        <Button size="sm" onClick={() => showTalentSelectionModal()}>{t('Common.text.select')}</Button>
                    </div>
                    {talent == null
                    ? (<p>No talent selected.</p>)
                    :  <TalentDescription name={talent.localizedDisplayName}
                            description={character.version > 1 ? talent.localizedDescription2e : talent.localizedDescription} />}
                </div>
            </div>);
        } else if (modificationType === SupportingCharacterModificationType.AdditionalDepartment) {
            return (<div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="my-4">{t('Construct.other.department')}</Header>
                    <Markdown>{t('ModifySupportingCharacter.attribute.instruction')}</Markdown>
                    <SimpleDepartmentSelector onSelectDepartment={(a) => setDepartmentSelection(a)} isChecked={(a) => departmentSelection === a} />
                </div>
            </div>);
        }
    }

    const goToHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();

        navigate("/");
    }

    const dropDownItems = () => {
        return [
            new DropDownElement("", ""),
            new DropDownElement(SupportingCharacterModificationType.AdditionalAttribute, t('SupportingCharacterModificationType.additionalAttribute')),
            new DropDownElement(SupportingCharacterModificationType.AdditionalDepartment, t('SupportingCharacterModificationType.additionalDepartment')),
            new DropDownElement(SupportingCharacterModificationType.AdditionalFocus, t('SupportingCharacterModificationType.additionalFocus')),
            new DropDownElement(SupportingCharacterModificationType.AdditionalTalent, t('SupportingCharacterModificationType.additionalTalent')),
            new DropDownElement(SupportingCharacterModificationType.AdditionalValue, t('SupportingCharacterModificationType.additionalValue')),
        ];
    }

    if (character == null) {
        setTimeout(() => {
            navigate("/");
        }, 200);
        return (<LcarsFrame activePage={PageIdentity.ModifySupportingCharacter}>
                <div id="app">
                    <div className="page container ms-0">
                    </div>
                </div>
            </LcarsFrame>);
    } else {
        return (<LcarsFrame activePage={PageIdentity.ModifySupportingCharacter}>
            <div id="app">
                <div className="page container ms-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => goToHome(e)}>{t('Page.title.home')}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Page.title.modifySupportingCharacter')}</li>
                        </ol>
                    </nav>
                    <Header>{t("Page.title.modifySupportingCharacter")}</Header>
                    <Carousel controls={false} interval={null} activeIndex={index} indicators={false}>
                        <Carousel.Item>
                            <Markdown className="mt-4">{t('ModifySupportingCharacter.instruction')}</Markdown>

                            <div className="row">
                                <div className="col-12 col-md-6">

                                    <Header level={2}>{t('ModifySupportingCharacter.improvementType')}</Header>
                                    <Markdown className="mt-4">{t('ModifySupportingCharacter.improvementType.instruction')}</Markdown>
                                    <div className="mt-4">
                                        <DropDownSelect items={dropDownItems()} onChange={(v) => setModificationType(v)} defaultValue={modificationType} />
                                    </div>

                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>

                            {renderImprovementSection()}
                        </Carousel.Item>
                        <Carousel.Item>

                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <Header level={2} className="mt-3">Modification Applied</Header>
                                    <Markdown>{t('ModifySupportingCharacter.finish.instruction')}</Markdown>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    {renderButtonBar()}
                </div>
            </div>
        </LcarsFrame>);
    }
}

export default connect(characterMapStateToProperties)(ModifySupportingCharacterPage);