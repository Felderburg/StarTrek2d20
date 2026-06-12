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
import { CheckBox } from "../../components/checkBox";
import { Dialog } from "../../components/dialog";
import { LogEntrySelectionView } from "./logEntrySelectionView";
import { CharacterAdvancementStep } from "../../common/character";
import { GeneralEditView } from "./generalEditView";

enum Step {
    Initial,
    LogEntry,
    SelectLog,
    GeneralEdit,
    SelectCallback,
    ModificationDetails,
    Finish
}


const ModifyMainCharacterPage: React.FC<ICharacterProperties> = ({character}) => {

    const dropDownItems = () => {
        let result = [];
        if (character.version === 1) {
//            result.push(new DropDownElement(ModificationType.VersionUpgrade, t('ModificationType.name.versionUpgrade')))
        }
        result.push(new DropDownElement(ModificationType.LogEntry, t('ModificationType.name.logEntry')))
        if (character?.rank != null) {
            result.push(new DropDownElement(ModificationType.Promotion, t('ModificationType.name.promotion')))
        }
        result.push(new DropDownElement(ModificationType.CharacterAdvancement, t('ModificationType.name.characterAdvancement')))
        if (character?.rank != null) {
            result.push(new DropDownElement(ModificationType.Demotion, t('ModificationType.name.demotion')))
        }
        if (character.version > 1) {
//            result.push(new DropDownElement(ModificationType.GeneralEdit, t('ModificationType.name.generalEdit')))
        }
        return result;
    }

    const { t } = useTranslation();
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [skipLog, setSkipLog] = useState(false);
    const [modificationType, setModificationType] = useState<ModificationType>(dropDownItems()[0].value as ModificationType);
    const [advancementType, setAdvancementType] = useState<CharacterAdvancementType>(CharacterAdvancementType.Adjustment);
    const [logEntry, setLogEntry] = useState<LogEntry|undefined>(undefined);
    const [logEntryCallback, setLogEntryCallback] = useState<LogEntry|undefined>(undefined);
    const [skipLogCallback, setSkipLogCallback] = useState(false);
    const navigate = useNavigate();

    const milestoneTypesDropDownItems = () => {
        let result = [];
        result.push(new DropDownElement(CharacterAdvancementType.Adjustment, t('CharacterAdvancementType.adjustment')))
        result.push(new DropDownElement(CharacterAdvancementType.Milestone, t('CharacterAdvancementType.milestone')))
        result.push(new DropDownElement(CharacterAdvancementType.CharacterArc, t('CharacterAdvancementType.characterArc')))
        return result;
    }

    const previousStep = () => {
        if (carouselIndex < 4) {
            setCarouselIndex(carouselIndex-1);
        }
    }

    const nextStep = () => {
        let step = getSteps(modificationType)[carouselIndex];
        if (carouselIndex === 0) {
            setCarouselIndex(carouselIndex+1);
        } else if (step === Step.SelectLog) {
            if (logEntry != null || skipLog) {
                setCarouselIndex(carouselIndex+1);
            } else {
                Dialog.show(t("CharacterAdvancementTypeView.error.selectLog"));
            }
        } else if (step === Step.SelectCallback) {
            if (logEntryCallback != null || skipLogCallback) {
                setCarouselIndex(carouselIndex+1);
            } else {
                Dialog.show(t("CharacterAdvancementTypeView.error.selectLog"));
            }
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
                onPreviousStep={previousStep} type={advancementType}
                logEntry={skipLog ? undefined : logEntry}
                logEntryCallback={skipLogCallback ? undefined : logEntryCallback} />);
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

    const createGeneralEditView = () => {
        return <GeneralEditView character={character} onNextStep={() => {}} onPreviousStep={previousStep} />;
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

    const createSelectLog = () => {

        let logs = character.logEntries?.filter(l => l.valuesUsed?.length)
                ?.map(l => (<LogEntrySelectionView logEntry={l}
                    isSelected={l.id === logEntry?.id}
                    selectLogEntry={setLogEntry} key={"log-entry-" + l.id} />));

        return (<>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="mt-3">{t('ModificationType.name.logEntry')}</Header>
                    <Markdown>{t('CharacterAdvancementTypeView.log.instructions')}</Markdown>

                    <table className="selection-list">
                        <tbody>
                            {logs}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-5 d-flex justify-content-end">
                <div className="me-2">
                    <CheckBox isChecked={skipLog} onChanged={() => setSkipLog(!skipLog)}
                        text={"Skip this step"} value={"skip"} />
                </div>
            </div>
            <div className="my-3 d-flex justify-content-between">
                <Button size="sm" onClick={() => previousStep()}>{t('Common.button.previous')}</Button>
                <Button size="sm" onClick={() => nextStep()}>{t('Common.button.next')}</Button>
            </div>
        </>);
    }

    const createSelectLogCallback = () => {

        let ids = character.improvements
                ?.filter(i => i instanceof CharacterAdvancementStep)
                ?.map(i => i as CharacterAdvancementStep)
                ?.filter(i => i.log != null)
                ?.filter(i => advancementType === CharacterAdvancementType.Milestone || i.removeValue == null)
                ?.map(i => i.log);

        let logs = character.logEntries?.filter(l => l.valuesUsed?.length && ids.includes(l.id));

        return (<>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="mt-3">{t('CharacterAdvancementTypeView.logCallback')}</Header>
                    {advancementType === CharacterAdvancementType.CharacterArc
                        ? (<Markdown>{t('CharacterAdvancementTypeView.logCallback.characterArc.instructions')}</Markdown>)
                        : (<Markdown>{t('CharacterAdvancementTypeView.logCallback.milestone.instructions')}</Markdown>)}

                    <table className="selection-list">
                        <tbody>
                            {logs?.length
                                ? logs?.map(l => (<LogEntrySelectionView logEntry={l}
                                    isSelected={l.id === logEntryCallback?.id}
                                    selectLogEntry={setLogEntryCallback} key={"log-entry-" + l.id} />))
                                : (<tr><td>{t("CharacterAdvancementTypeView.log.notFound")}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-5 d-flex justify-content-end">
                <div className="me-2">
                    <CheckBox isChecked={skipLogCallback} onChanged={() => setSkipLogCallback(!skipLogCallback)}
                        text={"Skip this step"} value={"skip"} />
                </div>
            </div>
            <div className="my-3 d-flex justify-content-between">
                <Button size="sm" onClick={() => previousStep()}>{t('Common.button.previous')}</Button>
                <Button size="sm" onClick={() => nextStep()}>{t('Common.button.next')}</Button>
            </div>
        </>);
    }

    const getSteps = (modificationType: ModificationType): Step[] => {
        if (modificationType === ModificationType.LogEntry) {
            return [ Step.Initial, Step.LogEntry, Step.Finish ];
        } else if ([ModificationType.Promotion, ModificationType.Demotion].includes(modificationType)) {
            return [ Step.Initial, Step.ModificationDetails, Step.Finish ];
        } else if (modificationType === ModificationType.CharacterAdvancement && advancementType === CharacterAdvancementType.Adjustment) {
            return [ Step.Initial, Step.SelectLog, Step.ModificationDetails, Step.Finish ];
        } else if (modificationType === ModificationType.CharacterAdvancement) {
            return [ Step.Initial, Step.SelectLog, Step.SelectCallback, Step.ModificationDetails, Step.Finish ];
        } else if (modificationType === ModificationType.GeneralEdit) {
            return [ Step.Initial, Step.GeneralEdit, Step.Finish ];
        } else {
            return [];
        }
    }

    const showStep = (step: number) => {
        let steps = getSteps(modificationType);
        switch (steps[step]) {
            case Step.Initial:
                return createCharacterAdvancementTypeView();
            case Step.LogEntry:
                return createLogEntryView();
            case Step.SelectLog:
                return createSelectLog();
            case Step.GeneralEdit:
                return createGeneralEditView();
            case Step.SelectCallback:
                return createSelectLogCallback();
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

                    <Carousel.Item>
                        {showStep(4)}
                    </Carousel.Item>
                </Carousel>

            </div>
        </div>
    </LcarsFrame>);
}

export default connect(characterMapStateToProperties)(ModifyMainCharacterPage);