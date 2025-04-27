import { connect } from "react-redux";
import { Dialog } from "../../components/dialog";
import { Header } from "../../components/header";
import { Department } from "../../helpers/department";
import { allSystems, System } from "../../helpers/systems";
import { BuildPoints } from "../model/buildPoints";
import { BaseSimpleStarshipPage } from "./simpleStarshipPage";
import { withTranslation } from 'react-i18next';
import { DepartmentsHelper } from "../../helpers/department";
import { nextStarshipWorkflowStep } from "../../state/starshipActions";
import store from "../../state/store";
import { Navigation } from "../../common/navigator";
import { ShipBuildType } from "../../common/starship";
import { PageIdentity } from "../../pages/pageIdentity";


class SmallCraftStatsPage extends BaseSimpleStarshipPage {

    renderHeader() {
        const { t } = this.props;
        return (<Header>{t('Page.title.smallCraftStats')}</Header>);
    }

    canIncreaseScale(): boolean {
        return false;
    }

    canDecreaseScale(): boolean {
        return false;
    }

    getDepartmentPoints() {
        return BuildPoints.departmentPointsForType(this.props.starship.buildType);
    }

    getSystemsPoints() {
        return BuildPoints.systemPointsForType(this.props.starship.buildType, this.props.starship.serviceYear, this.props.starship.type, this.props.starship.scale);
    }

    renderSystemsText() {
        return (<p>You have {this.getSystemsPoints()} System Points to distribute to the ship's systems.</p>);
    }

    renderDepartmentText() {
        return (<p>You have {this.getDepartmentPoints()} Department Points to distribute to the ship's departments.</p>);
    }

    sumTotalDepartments() {
        let total = 0;
        DepartmentsHelper.instance.getDepartments().forEach(d => total += this.props.starship.departments[d]);
        return total;
    }

    canIncreaseDepartment(department: Department) {
        return this.sumTotalDepartments() < this.getDepartmentPoints() && super.canIncreaseDepartment(department);
    }

    sumTotalSystems() {
        let total = 0;
        allSystems().forEach(s => total += this.props.starship.getSystemValue(s));
        return total;
    }

    canIncreaseSystem(system: System) {
        return this.sumTotalSystems() < this.getSystemsPoints() && super.canIncreaseSystem(system);
    }

    nextPage(): void {
        if (this.sumTotalSystems() < this.getSystemsPoints()) {
            Dialog.show("You have not distributed all the Systems Points");
        } else if (this.sumTotalDepartments() < this.getDepartmentPoints()) {
            Dialog.show("You have not distributed all the Department Points");
        } else {
            let { starship } = this.props;
            store.dispatch(nextStarshipWorkflowStep());
            if (starship.buildType === ShipBuildType.Pod) {
                Navigation.navigateToPage(PageIdentity.StarshipWeaponsSelection);
            } else {
                Navigation.navigateToPage(PageIdentity.StarshipTalentSelection);
            }
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship,
        workflow: state.starship.workflow
    };
}

export default withTranslation()(connect(mapStateToProps)(SmallCraftStatsPage));