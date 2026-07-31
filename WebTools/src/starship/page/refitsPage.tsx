import React from "react";
import { connect } from "react-redux";
import { Navigation } from "../../common/navigator";
import Button from "react-bootstrap/Button";
import { Dialog } from "../../components/dialog";
import { Header } from "../../components/header";
import RefitsView from "../../components/refitsView";
import { System } from "../../helpers/systems";
import { addStarshipRefit, deleteStarshipRefit, nextStarshipWorkflowStep } from "../../state/starshipActions";
import store from "../../state/store";
import ShipBuildingBreadcrumbs from "../view/shipBuildingBreadcrumbs";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { PageIdentity } from "../../pages/pageIdentity";
import { IStarshipProperties } from "../iStarshipProperties";

const RefitPage: React.FC<IStarshipProperties> = ({starship}) => {

    const { t } = useTranslation();
    const refitCount = starship.numberOfRefits;

    const addRefit = (system: System) => {
        store.dispatch(addStarshipRefit(system));
    }

    const removeRefit = (system: System) => {
        store.dispatch(deleteStarshipRefit(system));
    }

    const nextPage = () => {
        if (starship.refits.length !== starship.numberOfRefits) {
            Dialog.show("Please choose all refits.");
        } else {
            store.dispatch(nextStarshipWorkflowStep());
            Navigation.navigateToPage(PageIdentity.FinalStarshipDetails);
        }
    }


    return (<div className="page container ms-0">
        <ShipBuildingBreadcrumbs />
        <Header>{t('Construct.other.refits')}</Header>

        <ReactMarkdown>{t('StarshipRefits.instruction', {count: refitCount})}</ReactMarkdown>

        <RefitsView refits={starship.refits} points={refitCount} starship={starship}
                    onIncrease={(s) => { addRefit(s)} } onDecrease={(s) => { removeRefit(s); } }/>

        <div className="text-end">
            <Button onClick={() => nextPage()}>{t('Common.button.next')}</Button>
        </div>
    </div>);
}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship
    };
}

export default connect(mapStateToProps)(RefitPage);