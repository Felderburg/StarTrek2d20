import { useTranslation } from "react-i18next";
import { Header } from "../../components/header";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { IStarshipProperties } from "../../starship/iStarshipProperties";
import { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { starshipMapStateToProperties } from "../../solo/page/soloCharacterProperties";
import { connect } from "react-redux";
import { CharacterAdvancementType } from "../model/characterAdvancementType";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import Markdown from "react-markdown";
import { useNavigate } from "react-router";

const ModifyStarshipPage: React.FC<IStarshipProperties> = ({starship}) => {

    const { t } = useTranslation();
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [advancementType, setAdvancementType] = useState<CharacterAdvancementType>(CharacterAdvancementType.Milestone);
    const navigate = useNavigate();

    const milestoneTypesDropDownItems = () => {
        let result = [];
        result.push(new DropDownElement(CharacterAdvancementType.Milestone, t('CharacterAdvancementType.milestone')))
        result.push(new DropDownElement(CharacterAdvancementType.CharacterArc, t('CharacterAdvancementType.characterArc')))
        return result;
    }

    const nextStep = () => {
        if (carouselIndex === 0) {
            setCarouselIndex(1);
        }
    }

    const createAdvancementTypeView = () => {
        return (<><div className="row mt-4">
                <div className="col-12 col-md-6">

                    <Header level={2}>{t('Page.title.modificationTypeSelection')}</Header>
                    <Markdown className="mt-4">{t('ModifyStarship.type.instruction')}</Markdown>
                        <div className="mt-4">
                            <DropDownSelect items={milestoneTypesDropDownItems()}
                                    onChange={(v) => setAdvancementType(v as CharacterAdvancementType)} defaultValue={advancementType} />
                        </div>
                </div>
            </div>
            <div className="my-5 text-end">
                <Button size="sm" onClick={() => nextStep()}>{t('Common.button.next')}</Button>
            </div>
        </>);
    }


    return (<LcarsFrame activePage={PageIdentity.ModifyStarship}>
        <div id="app">
            <div className="page container ms-0">

                <Header>{t('Page.title.modifyStarship')}</Header>

                <Carousel controls={false} interval={null} activeIndex={carouselIndex} indicators={false}>
                    <Carousel.Item>
                        {createAdvancementTypeView()}
                    </Carousel.Item>

                    <Carousel.Item>
                    </Carousel.Item>

                    <Carousel.Item>
                    </Carousel.Item>
                </Carousel>

            </div>
        </div>
    </LcarsFrame>);
}

export default connect(starshipMapStateToProperties)(ModifyStarshipPage);