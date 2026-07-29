import { connect } from "react-redux";
import { Dialog } from "../../components/dialog";
import { Header } from "../../components/header";
import { Department } from "../../helpers/department";
import { allSystems, System } from "../../helpers/systems";
import { BuildPoints } from "../model/buildPoints";
import { BaseSimpleStarshipPage } from "./simpleStarshipPage";
import { withTranslation } from 'react-i18next';
import { DepartmentsHelper } from "../../helpers/department";
import { nextStarshipWorkflowStep, setStarshipSpaceframeAppearance } from "../../state/starshipActions";
import store from "../../state/store";
import { Navigation } from "../../common/navigator";
import { ShipBuildType } from "../../common/shipBuildType";
import { PageIdentity } from "../../pages/pageIdentity";
import { SpaceframeAppearanceModel } from "../../helpers/spaceframeAppearanceModel";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { SpaceframeAppearance } from "../../helpers/spaceframeAppearance";


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
        return BuildPoints.systemPointsForType(this.props.starship.buildType, this.props.starship.serviceYear, this.props.starship.type, this.props.starship.scale, this.props.starship.version);
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

    isAppearanceSupported() {
        return SpaceframeAppearanceModel.getAllAppearanceModels(this.props.starship.type, this.props.starship.era, this.props.starship.buildType)?.length;
    }

    getAppearanceOptions() {
        let result = [ new DropDownElement("", "")];
        result.push(...SpaceframeAppearanceModel.getAllAppearanceModels(this.props.starship.type, this.props.starship.era, this.props.starship.buildType)
            .map(a => new DropDownElement(a.id, a.localizedName)));
        return result;
    }

    onAppearanceChange = (value: number|string) => {
        if (value === "") {
            store.dispatch(setStarshipSpaceframeAppearance());
        } else {
            store.dispatch(setStarshipSpaceframeAppearance(value as SpaceframeAppearance));
        }
    }


    renderAppearance() {
        const { t } = this.props;
        if (this.isAppearanceSupported()) {
            return (<div className="my-4">
                <Header className="mb-4" level={2}>{t('Construct.other.appearance')}</Header>

                <DropDownSelect items={this.getAppearanceOptions()}
                    defaultValue={this.props.starship.simpleStats?.appearance ?? ""}
                    onChange={this.onAppearanceChange} />
            </div>);
        } else {
            return undefined;
        }
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