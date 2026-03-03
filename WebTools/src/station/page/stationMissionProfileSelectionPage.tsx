import React from "react";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { Link, useNavigate } from "react-router-dom";
import { MissionProfileHelper, MissionProfileModel } from "../../helpers/missionProfiles";
import { CheckBox } from "../../components/checkBox";
import { connect } from "react-redux";
import { IStationPageProperties, stationMapStateToProperties } from "../iStationPageProperties";
import store from "../../state/store";
import { setStationMissionProfile } from "../../state/stationActions";
import { Dialog } from "../../components/dialog";

const StationMissionProfileSelectionPage: React.FC<IStationPageProperties> = ({station}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSelection = (missionProfile: MissionProfileModel) => {
        store.dispatch(setStationMissionProfile(missionProfile.id));
    }

    const onNext = () => {
        if (station.missionProfileStep?.type == null) {
            Dialog.show(t("StationMissionProfile.error.selectProfile"));
        } else {
            navigate("/station/final");
        }
    }

    const missionProfiles = MissionProfileHelper.getStationMissionProfiles().map((m, i) => {
        return (
                <tbody key={i}>
                    <tr>
                        <td className="text-end">
                            <CheckBox
                                isChecked={station?.missionProfileStep?.type === m.id}
                                text=""
                                value={m.id}
                                onChanged={() => { onSelection(m); } }/>
                        </td>
                        <td className=""><div className="selection-header">{m.localizedName}</div></td>
                    </tr>
                </tbody>
            );
        });

    const selectedProfile = station.missionProfileStep?.type != null
        ? MissionProfileHelper.getStationMissionProfileByType(station.missionProfileStep.type)
        : undefined;

    return (<LcarsFrame activePage={PageIdentity.StationMissionProfile}>
        <div id="app">
            <div className="page container ms-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>{t('Page.title.home')}</Link></li>
                    <li className="breadcrumb-item"><Link to={"/station"}>{t('Page.title.stationIndex')}</Link></li>
                    <li className="breadcrumb-item"><Link to={"/station/frame"}>{t('Page.title.stationSpaceframe')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('Page.title.stationMissionProfile')}</li>
                </ol>
                </nav>
                <main>

                    <Header>{t('Page.title.stationMissionProfile')}</Header>

                    <ReactMarkdown>{t('StationMissionProfile.instruction')}</ReactMarkdown>

                    <section className="row">
                        <div className="col-12 col-md-6 mt-4">
                            <table className="selection-list w-100">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {missionProfiles}
                            </table>
                        </div>

                        {selectedProfile != null
                            ? (<div className="col-12 col-md-6 mt-4">
                                <Header level={2}>{selectedProfile.localizedName}</Header>
                                <div>
                                    <ReactMarkdown className="markdown-sm">{selectedProfile.localizedDescription}</ReactMarkdown>
                                </div>
                            </div>)
                            : undefined
                        }
                    </section>

                    <div className="text-end mt-5">
                        <Button onClick={() => onNext()}>{t('Common.button.next')}</Button>
                    </div>
                </main>
            </div>
        </div>
    </LcarsFrame>);
}

export default connect(stationMapStateToProperties)(StationMissionProfileSelectionPage);