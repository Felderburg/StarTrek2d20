import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { Link } from "react-router-dom";

const StationIndexPage = () => {

    const { t } = useTranslation();
    return (<LcarsFrame activePage={PageIdentity.StationIndex}>
        <div id="app">
            <div className="page container ms-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>{t('Page.title.home')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('Page.title.otherTools')}</li>
                </ol>
                </nav>
                <main>

                    <Header>{t('Page.title.stationIndex')}</Header>

                    <ReactMarkdown>{t('StationIndexPage.instruction')}</ReactMarkdown>

                    <div className="text-end">
                        <Button onClick={() => {}}>{t('Common.button.create')}</Button>
                    </div>
                </main>
            </div>
        </div>
    </LcarsFrame>);
}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship
    };
}

export default connect(mapStateToProps)(StationIndexPage);