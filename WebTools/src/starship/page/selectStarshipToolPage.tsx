import React from "react";
import { CharacterType } from "../../common/characterType";
import { navigateTo, Navigation } from "../../common/navigator";
import { ShipBuildType, SimpleStats } from "../../common/starship";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { PageIdentity } from "../../pages/pageIdentity";
import { createNewStarship } from "../../state/starshipActions";
import store from "../../state/store";
import { ShipBuildWorkflow } from "../model/shipBuildWorkflow";
import { withTranslation, WithTranslation } from 'react-i18next';
import { eraDefaultYear } from "../../helpers/eras";
import { isSecondEdition } from "../../state/contextFunctions";

class SelectStarshipToolPage extends React.Component<WithTranslation, {}> {

    render() {
        const { t } = this.props;
        return (
            <div className="page">
                <div className="container ms-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => navigateTo(e, PageIdentity.Home)}>{t('Page.title.home')}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Page.title.starshipToolSelection')}</li>
                        </ol>
                    </nav>

                    <Header>{t('Page.title.starshipToolSelection')}</Header>

                    <p>{t('StarshipToolSelection.instruction')}</p>

                    <div className="d-flex mt-3">
                        <div className="me-5">
                            <Button className="btn btn-primary mt-0" onClick={() => { this.goToPage(PageIdentity.StarshipTypeSelection); } }
                            >{t('StarshipToolSelection.standardBuild')}</Button>
                        </div>
                        <p className="d-none d-lg-block">{t('StarshipToolSelection.standardBuildDescription')}
                        </p>
                    </div>
                    <div className="d-flex mt-4">
                        <div className="me-5">
                            <Button className="btn btn-primary mt-0" onClick={() => { this.startSimplifiedWorkflow(); } }
                            >{t('StarshipToolSelection.simplifiedBuild')}</Button>
                        </div>
                        <p className="d-none d-lg-block">
                            {t('StarshipToolSelection.simplifiedBuildDescription')}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    startSimplifiedWorkflow() {
        let workflow = ShipBuildWorkflow.createSimpleBuildWorkflow();
        let stats = new SimpleStats();
        stats.systems = [7, 7, 7, 7, 7, 7];
        stats.scale = 3;
        store.dispatch(createNewStarship(CharacterType.Other, store.getState().context?.era,
            eraDefaultYear(store.getState().context?.era), stats, workflow, ShipBuildType.Starship, isSecondEdition() ? 2 : 1));
        let page =workflow.currentStep().page;
        this.goToPage(page);
    }

    private goToPage(page: PageIdentity) {
        Navigation.navigateToPage(page);
    }
}

export default withTranslation()(SelectStarshipToolPage);