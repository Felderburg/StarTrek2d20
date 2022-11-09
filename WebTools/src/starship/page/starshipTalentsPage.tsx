import React from "react";
import { connect } from "react-redux";
import { Navigation } from "../../common/navigator";
import { Starship } from "../../common/starship";
import { Button } from "../../components/button";
import { Dialog } from "../../components/dialog";
import { Header } from "../../components/header";
import { TalentsHelper } from "../../helpers/talents";
import { nextStarshipWorkflowStep, setAdditionalTalents } from "../../state/starshipActions";
import store from "../../state/store";
import { ShipBuildWorkflow } from "../model/shipBuildWorkflow";
import ShipBuildingBreadcrumbs from "../view/shipBuildingBreadcrumbs";
import { StarshipTalentSelectionList } from "../view/starshipTalentSelection";

interface ISimpleStarshipPageProperties {
    starship: Starship;
    workflow: ShipBuildWorkflow;
}

class StarshipTalentsPage extends React.Component<ISimpleStarshipPageProperties, {}> {
    render() {
        return (<div className="page container ml-0">
            <ShipBuildingBreadcrumbs />
            <Header>Talents</Header>
            <p>Select {this.props.starship.freeTalentSlots} {(this.props.starship.freeTalentSlots === 1) ? ' talent ' : ' talents '} for your ship.</p>
            <StarshipTalentSelectionList
                points={this.props.starship.freeTalentSlots}
                talents={TalentsHelper.getStarshipTalents(this.props.starship)}
                construct={this.props.starship}
                onSelection={(talents) => store.dispatch(setAdditionalTalents(talents))} />
            <div className="text-right">
                <Button buttonType={true} onClick={() => this.nextPage()}>Next</Button>
            </div>
        </div>);
    }

    nextPage() {
        if (this.props.starship.freeTalentSlots > this.props.starship.additionalTalents.length) {
            Dialog.show("Please select " + this.props.starship.freeTalentSlots + ((this.props.starship.freeTalentSlots === 1) ? ' talent ' : ' talents ') + " before proceeding.");
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

export default connect(mapStateToProps)(StarshipTalentsPage);