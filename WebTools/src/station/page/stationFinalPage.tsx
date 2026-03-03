import React from "react";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { Link } from "react-router-dom";
import store from "../../state/store";
import { setStationName, setStationTraits } from "../../state/stationActions";
import { connect } from "react-redux";
import { IStationPageProperties, stationMapStateToProperties } from "../iStationPageProperties";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { ViewButton } from "../../components/viewButton";

const StationFinalPage: React.FC<IStationPageProperties> = ({station}) => {

    const { t } = useTranslation();

    return (<LcarsFrame activePage={PageIdentity.StationFinal}>
        <div id="app">
            <div className="page container ms-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>{t('Page.title.home')}</Link></li>
                    <li className="breadcrumb-item"><Link to={"/station/frame"}>{t('Page.title.stationSpaceframe')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('Page.title.stationFinal')}</li>
                </ol>
                </nav>
                <main>

                    <Header>{t('Page.title.stationFinal')}</Header>

                    <ReactMarkdown>{t('StationFinalPage.instruction')}</ReactMarkdown>

                    <section className="row">

                        <div className="col-lg-6 mt-3 mb-4">
                            <Header level={2}>{t('Construct.other.name')}</Header>
                            <ReactMarkdown>
                                {t('StationFinalPage.name.instruction')}
                            </ReactMarkdown>
                            <div className="d-sm-flex align-items-stretch">
                                <InputFieldAndLabel
                                    id="name"
                                    labelName={t('Construct.other.name')}
                                    onChange={(name) => store.dispatch(setStationName(name)) }
                                    value={station.name} />
                            </div>
                        </div>

                        <div className="col-lg-6 mt-3 mb-4">
                            <Header level={2}>{t('Construct.other.traits')}</Header>
                            <ReactMarkdown>
                                {t('StationFinalPage.traits.instruction')}
                            </ReactMarkdown>
                            <textarea className="w-100"
                                rows={8}
                                onChange={(ev) => {
                                    let temp = ev.target.value.split(",");
                                    store.dispatch(setStationTraits(temp));
                                }}
                                onBlur={(ev) => {
                                    let temp = ev.target.value.split(",");
                                    store.dispatch(setStationTraits(temp));
                                }}
                                value={station.traits} />
                        </div>
                    </section>

                    <div className="mt-5">
                        <ViewButton construct={station} />
                        <Button size="sm" onClick={() => {}}>{t('Common.button.exportPdf')}</Button>
                    </div>
                </main>
            </div>
        </div>
    </LcarsFrame>);
}

export default connect(stationMapStateToProperties)(StationFinalPage);