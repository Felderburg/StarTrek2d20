import React from "react";
import { connect } from "react-redux";
import { Navigation } from "../../common/navigator";
import { ShipBuildType, Starship } from "../../common/starship";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { SpaceframeModel } from "../../helpers/spaceframeModel";
import { PageIdentity } from "../../pages/pageIdentity";
import { setStarshipSpaceframe } from "../../state/starshipActions";
import store from "../../state/store";
import { BuildPoints } from "../model/buildPoints";
import ShipBuildingBreadcrumbs from "../view/shipBuildingBreadcrumbs";
import { useTranslation } from 'react-i18next';
import PointAllocator from "../../helpers/pointAllocator";

interface ISpaceframePageProperties {
    starship: Starship;
}

const SpaceframePage: React.FC<ISpaceframePageProperties> = ({starship}) => {

    const { t } = useTranslation();

    const navigateToSpaceframeSelection = () => {
        store.dispatch(setStarshipSpaceframe(null));
        Navigation.navigateToPage(PageIdentity.SpaceframeSelection);
    }

    const navigateToCustomSpaceframe = () => {
        let scale = 3;
        let systems = PointAllocator.allocatePointsEvenly(BuildPoints.systemPointsForType(
            ShipBuildType.Starship, starship.serviceYear, starship.type, scale));
        let departments = PointAllocator.allocatePointsEvenly(BuildPoints.departmentPointsForType(
            ShipBuildType.Starship))
        let spaceframe = SpaceframeModel.createCustomSpaceframe(starship?.type, starship?.serviceYear, systems, departments, scale);
        store.dispatch(setStarshipSpaceframe(spaceframe));
        Navigation.navigateToPage(PageIdentity.CustomSpaceframe);
    }

    return (
        <div className="page container ms-0">
            <ShipBuildingBreadcrumbs />
            <Header>{t('Page.title.spaceframeOption')}</Header>

            <p>{t('SpaceframeOptionPage.text')}</p>

            <div className="button-column">
                <Button className="btn btn-primary mt-4" onClick={() => navigateToSpaceframeSelection() }>{t('SpaceframeOptionPage.button.standardSpaceframe')}</Button>
                <Button className="btn btn-primary mt-4" onClick={() => navigateToCustomSpaceframe() }>{t('SpaceframeOptionPage.button.customSpaceframe')}</Button>
            </div>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship
    };
}

export default connect(mapStateToProps)(SpaceframePage);