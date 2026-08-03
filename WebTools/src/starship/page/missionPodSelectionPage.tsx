import React from "react";
import { connect } from "react-redux";
import { Navigation } from "../../common/navigator";
import { Starship } from "../../common/starship";
import Button from "react-bootstrap/Button";
import { Dialog } from "../../components/dialog";
import { Header } from "../../components/header";
import { nextStarshipWorkflowStep, setStarshipMissionPod } from "../../state/starshipActions";
import store from "../../state/store";
import { ShipBuildWorkflow } from "../model/shipBuildWorkflow";
import MissionPodSelection from "../view/missionPodSelection";
import MissionPodReplacementSelection from "../view/missionPodReplacementSelection";
import ShipBuildingBreadcrumbs from "../view/shipBuildingBreadcrumbs";
import { withTranslation, WithTranslation } from 'react-i18next';

interface IMissionPodSelectionPageProperties extends WithTranslation{
    starship: Starship;
    workflow: ShipBuildWorkflow;
}

class MissionPodSelectionPage extends React.Component<IMissionPodSelectionPageProperties, {}> {
    render() {
        const { t } = this.props;
        return (<div className="page container ms-0">
            <ShipBuildingBreadcrumbs />
            <Header>{t('Page.title.missionPodSelection')}</Header>
            <p>{t('MissionPodSelectionPage.text')}
            </p>
            <MissionPodSelection
                initialSelection={this.props.starship.missionPodModel}
                starship={this.props.starship}
                onSelection={(missionPod) => store.dispatch(setStarshipMissionPod(missionPod))} />
            <MissionPodReplacementSelection starship={this.props.starship} />
            <div className="text-end mt-4">
                <Button onClick={() => this.nextPage()}>{t('Common.button.next')}</Button>
            </div>
        </div>);
    }

    nextPage() {
        const { t } = this.props;
        if (this.props.starship.missionPodModel == null) {
            Dialog.show(t('MissionPodSelectionPage.errorNoSelection'));
        } else if (this.props.starship.hasUnreplacedMissionPodOverlaps()) {
            Dialog.show(t('MissionPodReplacement.errorMissing'));
        } else {
            let step = this.props.workflow.peekNextStep();
            store.dispatch(nextStarshipWorkflowStep());
            Navigation.navigateToPage(step.page);
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship,
        workflow: state.starship.workflow
    };
}

export default withTranslation()(connect(mapStateToProps)(MissionPodSelectionPage));