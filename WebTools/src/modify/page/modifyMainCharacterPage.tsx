import { useTranslation } from "react-i18next";
import { Header } from "../../components/header";
import { characterMapStateToProperties, ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import { ModifyBreadcrumb } from "../modifyBreadcrumb";
import { Button, Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import { PageIdentity } from "../../pages/pageIdentity";
import LcarsFrame from "../../components/lcarsFrame";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { ModificationType } from "../model/modificationType";
import Markdown from "react-markdown";
import { useState } from "react";
import { Dialog } from "../../components/dialog";
import { PromotionView } from "./promotionView";
import store from "../../state/store";
import { marshaller } from "../../helpers/marshaller";
import { useNavigate } from "react-router";
import { CharacterAdvancementType } from "../model/characterAdvancementType";
import { saveCharacterToLocalStorage } from "../../state/savedConstructActions";
import { CharacterAdvancementTypeView } from "./characterAdvancementTypeView";
import { CharacterLogEntryView } from "./characterLogEntryView";
import { LogEntry } from "../../common/logEntry";
import { addCharacterLogEntry } from "../../state/characterActions";

enum Step {
    Initial,
    LogEntry,
    ModificationDetails,
    Finish
}


const ModifyMainCharacterPage: React.FC<ICharacterProperties> = ({character}) => {

    const dropDownItems = () => {
        let result = [];
        result.push(new DropDownElement(ModificationType.LogEntry, t('ModificationType.name.logEntry')))
        if (character?.rank != null) {
            result.push(new DropDownElement(ModificationType.Promotion, t('ModificationType.name.promotion')))
        }
        result.push(new DropDownElement(ModificationType.CharacterAdvancement, t('ModificationType.name.characterAdvancement')))
        if (character?.rank != null) {
            result.push(new DropDownElement(ModificationType.Demotion, t('ModificationType.name.demotion')))
        }
        return result;
    }

    const { t } = useTranslation();
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [modificationType, setModificationType] = useState<ModificationType>(dropDownItems()[0].value as ModificationType);
    const [advancementType, setAdvancementType] = useState<CharacterAdvancementType>(CharacterAdvancementType.Adjustment);
    const [logEntry, setLogEntry] = useState<LogEntry>(new LogEntry((character.logEntries?.length ?? 0) + 1));
    const navigate = useNavigate();

    const milestoneTypesDropDownItems = () => {
        let result = [];
        result.push(new DropDownElement(CharacterAdvancementType.Adjustment, t('CharacterAdvancementType.adjustment')))
        result.push(new DropDownElement(CharacterAdvancementType.Milestone, t('CharacterAdvancementType.milestone')))
        result.push(new DropDownElement(CharacterAdvancementType.CharacterArc, t('CharacterAdvancementType.characterArc')))
        return result;
    }

    const previousStep = () => {
        if (carouselIndex < 3) {
            setCarouselIndex(carouselIndex-1);
        }
    }

    const nextStep = () => {
        if (carouselIndex === 0) {
            setCarouselIndex(carouselIndex+1);
        } else {
            setCarouselIndex(carouselIndex+1);
        }
    }

    const createCharacterAdvancementTypeView = () => {
        return (<><div className="row mt-4">
            <div className="col-12 col-md-6">

                <Header level={2}>{t('Page.title.modificationTypeSelection')}</Header>
                <Markdown className="mt-4">{t('ModificationTypeSelectionPage.instruction')}</Markdown>
                <div className="mt-4">
                    <DropDownSelect items={dropDownItems()} onChange={(v) => setModificationType(v as ModificationType)} defaultValue={modificationType} />
                </div>

                {modificationType === ModificationType.CharacterAdvancement
                    ? (<div className="mt-4">
                        <DropDownSelect items={milestoneTypesDropDownItems()}
                                onChange={(v) => setAdvancementType(v as CharacterAdvancementType)} defaultValue={advancementType} />
                    </div>)
                    : undefined}

            </div>
        </div>
        <div className="my-5 text-end">
            <Button size="sm" onClick={() => nextStep()}>{t('Common.button.next')}</Button>
        </div>
        </>);
    }

    const createModifcationDataStepView = () => {
        if (modificationType === ModificationType.Promotion) {
            return (<PromotionView character={character} onNextStep={nextStep} onPreviousStep={previousStep} type={ModificationType.Promotion} />);
        } else if (modificationType === ModificationType.Demotion) {
            return (<PromotionView character={character} onNextStep={nextStep} onPreviousStep={previousStep} type={ModificationType.Demotion} />);
        } else if (modificationType === ModificationType.CharacterAdvancement) {
            return (<CharacterAdvancementTypeView character={character} onNextStep={nextStep}
                onPreviousStep={previousStep} type={advancementType} />);
        } else {
            return undefined;
        }
    }

    const viewCharacter = () => {
        setTimeout(() => {
            let c = store.getState().character.currentCharacter;
            let hash = store.getState().character.replacementHash;
            store.dispatch(saveCharacterToLocalStorage(c, hash));
            const value = marshaller.encodeMainCharacter(c);
            navigate('/view?s=' + value);
        }, 200);
    }

    const createLogEntryView = () => {
        return (<CharacterLogEntryView onNextStep={nextStep} onPreviousStep={previousStep}
                character={character} saveLogEntry={(l) => store.dispatch(addCharacterLogEntry(l))} />);
    }

    const createFinalView = () => {
        return (<>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="mt-3">{t('Page.title.modificationComplete')}</Header>
                    <Markdown>{t('ModificationCompletePage.instruction')}</Markdown>
                </div>
            </div>

            <div className="mt-5">
                <Button size="sm" onClick={() => viewCharacter()}>{t('Common.button.view')}</Button>
            </div>
        </>)
    }

    const getSteps = (modificationType: ModificationType) => {
        if (modificationType === ModificationType.LogEntry) {
            return [ Step.Initial, Step.LogEntry, Step.Finish ];
        } else {
            return [ Step.Initial, Step.ModificationDetails, Step.Finish ];
        }
    }

    const showStep = (step: number) => {
        let steps = getSteps(modificationType);
        switch (steps[step]) {
            case Step.Initial:
                return createCharacterAdvancementTypeView();
            case Step.LogEntry:
                return createLogEntryView();
            case Step.ModificationDetails:
                return createModifcationDataStepView();
            case Step.Finish:
            default:
                return createFinalView();
        }

    }

    return (<LcarsFrame activePage={PageIdentity.ModifyMainCharacter}>
        <div id="app">
            <div className="page container ms-0">
                <ModifyBreadcrumb />

                <Header>{t('Page.title.modificationTypeSelection')}</Header>

                <Carousel controls={false} interval={null} activeIndex={carouselIndex} indicators={false}>
                    <Carousel.Item>
                        {showStep(0)}
                    </Carousel.Item>

                    <Carousel.Item>
                        {showStep(1)}
                    </Carousel.Item>

                    <Carousel.Item>
                        {showStep(2)}
                    </Carousel.Item>

                    <Carousel.Item>
                        {showStep(3)}
                    </Carousel.Item>
                </Carousel>

            </div>
        </div>
    </LcarsFrame>);
}

export default connect(characterMapStateToProperties)(ModifyMainCharacterPage);