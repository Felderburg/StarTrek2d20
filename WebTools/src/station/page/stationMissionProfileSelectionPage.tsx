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

const StationMissionProfileSelectionPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSelection = (missionProfile: MissionProfileModel) => {

    }

    const missionProfiles = MissionProfileHelper.getStationMissionProfiles().map((m, i) => {
        return (
                <tbody key={i}>
                    <tr>
                        <td className=""><div className="selection-header">{m.localizedName}</div></td>
                        <td className="text-end">
                            <CheckBox
                                isChecked={false}
                                text=""
                                value={m.id}
                                onChanged={() => { onSelection(m); } }/>
                        </td>
                    </tr>
                </tbody>
            );
        });


    return (<LcarsFrame activePage={PageIdentity.StationMissionProfile}>
        <div id="app">
            <div className="page container ms-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>{t('Page.title.home')}</Link></li>
                    <li className="breadcrumb-item"><Link to={"/station"}>{t('Page.title.stationIndex')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('Page.title.stationMissionProfile')}</li>
                </ol>
                </nav>
                <main>

                    <Header>{t('Page.title.stationMissionProfile')}</Header>

                    <ReactMarkdown>{t('StationMissionProfile.instruction')}</ReactMarkdown>

                    <table className="selection-list w-100">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="d-none d-md-table-cell" style={{ paddingLeft: "0.75rem"}}>Talent options</th>
                            <th></th>
                        </tr>
                    </thead>
                    {missionProfiles}
                </table>


                    <div className="text-end mt-5">
                        <Button onClick={() => {}}>{t('Common.button.next')}</Button>
                    </div>
                </main>
            </div>
        </div>
    </LcarsFrame>);
}

export default StationMissionProfileSelectionPage;