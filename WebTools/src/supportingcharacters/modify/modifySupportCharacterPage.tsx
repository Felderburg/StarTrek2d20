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
import { Button } from "../../components/button";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { SupportingCharacterModificationType } from "./supportingCharacterModificationType";
import ValueInput from "../../components/valueInputWithRandomOption";
import { useNavigate } from "react-router";
import { Dialog } from "../../components/dialog";
import { ValueRandomTable } from "../../solo/table/valueRandomTable";
import store from "../../state/store";
import { marshaller } from "../../helpers/marshaller";
import { modifySupportingCharacterAddImprovement } from "../../state/characterActions";
import { SupportingImrovementStep } from "../../common/character";

const ModifySupportingCharacterPage : React.FC<ICharacterPageProperties> = ({character}) => {

    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const [modificationType, setModificationType] = useState<string|SupportingCharacterModificationType>("");
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const onNextPage = () => {
        if (index === 0) {
            if (modificationType !== "") {
                setIndex(index + 1);
            } else {
                Dialog.show("Please select an improvement type.");
            }
        } else if (index === 1) {
            setIndex(index + 1);
        }
    }

    const applyModification = () => {
        if (modificationType === SupportingCharacterModificationType.AdditionalValue) {
            store.dispatch(modifySupportingCharacterAddImprovement(modificationType, value));
        }

        onNextPage();
    }

    const viewCharacter = () => {
        setTimeout(() => {
            let c = store.getState().character.currentCharacter;
            const value = marshaller.encodeSupportingCharacter(c);
            window.open('/view?s=' + value, "_blank");
        }, 200);
    }

    const randomValue = () => {
        let done = false;
        while (!done) {
            let value = ValueRandomTable(character?.speciesStep?.species);
            if (!character?.values?.includes(value)) {
                done = true;
                setValue(value);
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
                <Button className="btn btn-primary btn-sm" onClick={() => viewCharacter()}>{t('Common.button.view')}</Button>
            </div>);

        }
    }

    const renderImprovementSection = () => {
        if (modificationType === SupportingCharacterModificationType.AdditionalValue) {
            return (<div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="my-4">{t('Construct.other.value')}</Header>
                    <Markdown>{t('ModifySupportingCharacter.value.instruction')}</Markdown>
                    <ValueInput onRandomClicked={() => randomValue()} onValueChanged={(v) => setValue(value)} id="value" value={value} />
                </div>
            </div>);
        } else {
            return undefined;
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
            new DropDownElement(SupportingCharacterModificationType.AdditionalAttribute, "Additional attribute"),
            new DropDownElement(SupportingCharacterModificationType.AdditionalDiscipline, "Additional department"),
            new DropDownElement(SupportingCharacterModificationType.AdditionalFocus, "Additional focus"),
            new DropDownElement(SupportingCharacterModificationType.AdditionalValue, "Additional value"),
        ];
    }

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

export default connect(characterMapStateToProperties)(ModifySupportingCharacterPage);