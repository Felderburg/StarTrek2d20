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


const ModifyMainCharacterPage: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [modificationType, setModificationType] = useState<string|ModificationType>(ModificationType.Promotion);
    const [milestoneType, setMilestoneType] = useState<CharacterAdvancementType>(CharacterAdvancementType.Normal);
    const navigate = useNavigate();

    const dropDownItems = () => {
        let result = [];
        if (character?.rank != null) {
            result.push(new DropDownElement(ModificationType.Promotion, t('ModificationType.name.promotion')))
        }
//        result.push(new DropDownElement(ModificationType.Milestone, t('ModificationType.name.milestone')))
        return result;
    }

    const milestoneTypesDropDownItems = () => {
        let result = [];
        result.push(new DropDownElement(CharacterAdvancementType.Normal, t('MilestoneType.name.normalMilestone')))
        return result;
    }

    const previousStep = () => {
        if (carouselIndex === 1) {
            setCarouselIndex(carouselIndex-1);
        }
    }

    const nextStep = () => {
        if (carouselIndex === 0) {
            if (modificationType === "") {
                Dialog.show("Please choose a modification type");
            } else {
                setCarouselIndex(carouselIndex+1);
            }
        } else if (carouselIndex === 1) {
            setCarouselIndex(carouselIndex+1);
        }
    }

    const createModifcationTypeView = () => {
        return (<><div className="row">
            <div className="col-12 col-md-6">

                <Header level={2}>{t('Page.title.modificationTypeSelection')}</Header>
                <Markdown className="mt-4">{t('ModificationTypeSelectionPage.instruction')}</Markdown>
                <div className="mt-4">
                    <DropDownSelect items={dropDownItems()} onChange={(v) => setModificationType(v)} defaultValue={modificationType} />
                </div>

                {modificationType === ModificationType.CharacterAdvancement
                    ? (<div className="mt-4">
                        <DropDownSelect items={milestoneTypesDropDownItems()} onChange={(v) => setMilestoneType(v as CharacterAdvancementType)} defaultValue={milestoneType} />
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
            return (<PromotionView character={character} onNextStep={nextStep} onPreviousStep={previousStep} />);
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

    return (<LcarsFrame activePage={PageIdentity.ModifyMainCharacter}>
        <div id="app">
            <div className="page container ms-0">
                <ModifyBreadcrumb />

                <Header>{t('Page.title.modificationTypeSelection')}</Header>
                <Markdown>{t('ModificationTypeSelectionPage.instruction')}</Markdown>

                <Carousel controls={false} interval={null} activeIndex={carouselIndex} indicators={false}>
                    <Carousel.Item>
                        {createModifcationTypeView()}
                    </Carousel.Item>

                    <Carousel.Item>
                        {createModifcationDataStepView()}
                    </Carousel.Item>

                    <Carousel.Item>
                        {createFinalView()}
                    </Carousel.Item>
                </Carousel>

            </div>
        </div>
    </LcarsFrame>);
}

export default connect(characterMapStateToProperties)(ModifyMainCharacterPage);