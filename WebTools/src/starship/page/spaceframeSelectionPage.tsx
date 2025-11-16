import React from "react";
import { connect } from "react-redux";
import { Navigation } from "../../common/navigator";
import { Starship } from "../../common/starship";
import Button from "react-bootstrap/Button";
import { Dialog } from "../../components/dialog";
import { Header } from "../../components/header";
import { PageIdentity } from "../../pages/pageIdentity";
import { nextStarshipWorkflowStep, setStarshipSpaceframe } from "../../state/starshipActions";
import store from "../../state/store";
import { ShipBuildWorkflow } from "../model/shipBuildWorkflow";
import ShipBuildingBreadcrumbs from "../view/shipBuildingBreadcrumbs";
import SpaceframeSelection from "../view/spaceframeSelection";
import { useTranslation } from 'react-i18next';
import InstructionText from "../../components/instructionText";
import { TALENT_NAME_DEDICATED_PERSONNEL, TALENT_NAME_REDUNDANT_SYSTEMS } from "../../helpers/talents";

interface ISpaceframeSelectionPageProperties {
    starship: Starship;
    workflow: ShipBuildWorkflow;
}

const SpaceframeSelectionPage: React.FC<ISpaceframeSelectionPageProperties> = ({starship, workflow}) => {

    const { t } = useTranslation();

    const requiresDedicatedPersonnelSelection = () => {
        const talents = starship.spaceframeModel.talents
            .filter(t => t.name === TALENT_NAME_DEDICATED_PERSONNEL && t.department == null);
        return talents?.length;
    }

    const requiresRedundantSystemsSelection = () => {
        const talents = starship.spaceframeModel.talents
            .filter(t => t.name === TALENT_NAME_REDUNDANT_SYSTEMS &&
                (t.system == null && t.selection == null));
        return talents?.length;
    }

    const nextPage = () => {
        if (starship.spaceframeModel == null) {
            Dialog.show("Please select a spaceframe before proceeding.");
        } else if (requiresDedicatedPersonnelSelection() || requiresRedundantSystemsSelection()) {
            Navigation.navigateToPage(PageIdentity.ExtraStarshipTalentChoice);
        } else if (starship.spaceframeModel.isMissionPodAvailable) {
            Navigation.navigateToPage(PageIdentity.MissionPodSelection);
        } else {
            let step = workflow.peekNextStep();
            store.dispatch(nextStarshipWorkflowStep());
            Navigation.navigateToPage(step.page);
        }
    }

    return (<div className="page container ms-0">
        <ShipBuildingBreadcrumbs />
        <Header>{t('Page.title.spaceframeSelection')}</Header>
        <InstructionText text={t('SpaceframeSelectionPage.text')} />
        <SpaceframeSelection
            initialSelection={starship.spaceframeModel}
            starship={starship}
            serviceYear={starship.serviceYear}
            type={starship.type}
            onSelection={(spaceframe, variant) => store.dispatch(setStarshipSpaceframe(spaceframe, variant))} />
        <div className="text-end">
            <Button className="mt-4" onClick={() => nextPage()}>{t('Common.button.next')}</Button>
        </div>
    </div>);
}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship,
        workflow: state.starship.workflow
    };
}

export default connect(mapStateToProps)(SpaceframeSelectionPage);