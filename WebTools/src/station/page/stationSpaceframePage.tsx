import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { Link, useNavigate } from "react-router-dom";
import store from "../../state/store";
import { IStationPageProperties, stationMapStateToProperties } from "../iStationPageProperties";
import { connect } from "react-redux";
import { StatControl } from "../../starship/view/statControl";
import { makeKey } from "../../common/translationKey";
import { System } from "../../helpers/systems";
import { Department } from "../../helpers/department";

enum SpaceframeTab {
    Custom,
    Standard
}

const StationSpaceframePage: React.FC<IStationPageProperties> = ({station}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [tab, setTab] = useState<SpaceframeTab>(SpaceframeTab.Custom);

    const onNext = () => {
        navigate("/station/profile");
    }

    const canIncreaseDepartment = (department: Department) => {
        return getDepartment(department) < 5;
    }

    const canDecreaseDepartment = (department: Department) => {
        return getDepartment(department) > 0;
    }

    const canIncreaseSystem = (system: System) => {
        return getSystem(system) < 15;
    }

    const canDecreaseSystem= (system: System) => {
        return getSystem(system) > 1;
    }

    const canIncreaseScale = () => {
        return station.scale < 7;
    }

    const canDecreaseScale = () => {
        return station.scale > 1;
    }

    const getSystem = (system: System) => {
        let result = station.systems[system];
        return result == null ? 0 : result;
    }

    const getDepartment = (department: Department) => {
        let result = station.departments[department];
        return result == null ? 0 : result;
    }

    const setSystem = (system: System, delta: number) => {
//        store.dispatch(changeStationCustomFrameSystem(delta, system));
    }

    const setDepartment = (department: Department, delta: number) => {
//        store.dispatch(changeStationCustomFrameDepartment(delta, department));
    }


    const renderSystemsText = () => {
        return undefined;
    }

    const renderDepartmentText = () => {
        return undefined;
    }

    const renderCustomStats = () => {
        return (<>
            <section className="my-5">
                <Header level={2}>{t('Construct.other.systems')}</Header>

                {renderSystemsText()}

                <div className="stats-row mt-4">
                    <StatControl statName={t(makeKey('Construct.system.', System[System.Comms]))} value={getSystem(System.Comms)}
                        showIncrease={canIncreaseSystem(System.Comms)} showDecrease={canDecreaseSystem(System.Comms)}
                        onIncrease={() => {setSystem(System.Comms, 1) }}
                        onDecrease={() => {setSystem(System.Comms, -1)}} />

                    <StatControl statName={t(makeKey('Construct.system.', System[System.Engines]))} value={getSystem(System.Engines)}
                        showIncrease={canIncreaseSystem(System.Engines)} showDecrease={canDecreaseSystem(System.Engines)}
                        onIncrease={() => { setSystem(System.Engines, 1) }}
                        onDecrease={() => {setSystem(System.Engines, -1)}} />

                    <StatControl statName={t(makeKey('Construct.system.', System[System.Structure]))} value={getSystem(System.Structure)}
                        showIncrease={canIncreaseSystem(System.Structure)} showDecrease={canDecreaseSystem(System.Structure)}
                        onIncrease={() => { setSystem(System.Structure, 1) }}
                        onDecrease={() => {setSystem(System.Structure, -1)}} />
                </div>

                <div className="stats-row">
                    <StatControl statName={t(makeKey('Construct.system.', System[System.Computer]))} value={getSystem(System.Computer)}
                        showIncrease={canIncreaseSystem(System.Computer)} showDecrease={canDecreaseSystem(System.Computer)}
                        onIncrease={() => { setSystem(System.Computer, 1) }}
                        onDecrease={() => {setSystem(System.Computer, -1)}} />

                    <StatControl statName={t(makeKey('Construct.system.', System[System.Sensors]))} value={getSystem(System.Sensors)}
                        showIncrease={canIncreaseSystem(System.Sensors)} showDecrease={canDecreaseSystem(System.Sensors)}
                        onIncrease={() => { setSystem(System.Sensors, 1) }}
                        onDecrease={() => {setSystem(System.Sensors, -1)}} />

                    <StatControl statName={t(makeKey('Construct.system.', System[System.Weapons]))} value={getSystem(System.Weapons)}
                        showIncrease={canIncreaseSystem(System.Weapons)} showDecrease={canDecreaseSystem(System.Weapons)}
                        onIncrease={() => { setSystem(System.Weapons, 1) }}
                        onDecrease={() => {setSystem(System.Weapons, -1)}} />
                </div>
            </section>

            <section className="my-5">
                <Header level={2}>{t('Construct.other.departments')}</Header>

                {renderDepartmentText()}

                <div className="stats-row mt-4">
                    <StatControl statName={t(makeKey('Construct.department.', Department[Department.Command]))} value={getDepartment(Department.Command)}
                        showIncrease={canIncreaseDepartment(Department.Command)} showDecrease={canDecreaseDepartment(Department.Command)}
                        onIncrease={() => {setDepartment(Department.Command, 1) }}
                        onDecrease={() => {setDepartment(Department.Command, -1)}} />

                    <StatControl statName={t(makeKey('Construct.department.', Department[Department.Security]))} value={getDepartment(Department.Security)}
                        showIncrease={canIncreaseDepartment(Department.Security)} showDecrease={canDecreaseDepartment(Department.Security)}
                        onIncrease={() => { setDepartment(Department.Security, 1) }}
                        onDecrease={() => {setDepartment(Department.Security, -1)}} />

                    <StatControl statName={t(makeKey('Construct.department.', Department[Department.Science]))} value={getDepartment(Department.Science)}
                        showIncrease={canIncreaseDepartment(Department.Science)} showDecrease={canDecreaseDepartment(Department.Science)}
                        onIncrease={() => { setDepartment(Department.Science, 1) }}
                        onDecrease={() => {setDepartment(Department.Science, -1)}} />
                </div>

                <div className="stats-row">
                    <StatControl statName={t(makeKey('Construct.department.', Department[Department.Conn]))} value={getDepartment(Department.Conn)}
                        showIncrease={canIncreaseDepartment(Department.Conn)} showDecrease={canDecreaseDepartment(Department.Conn)}
                        onIncrease={() => { setDepartment(Department.Conn, 1) }}
                        onDecrease={() => {setDepartment(Department.Conn, -1)}} />

                    <StatControl statName={t(makeKey('Construct.department.', Department[Department.Engineering]))} value={getDepartment(Department.Engineering)}
                        showIncrease={canIncreaseDepartment(Department.Engineering)} showDecrease={canDecreaseDepartment(Department.Engineering)}
                        onIncrease={() => { setDepartment(Department.Engineering, 1) }}
                        onDecrease={() => {setDepartment(Department.Engineering, -1)}} />

                    <StatControl statName={t(makeKey('Construct.department.', Department[Department.Medicine]))} value={getDepartment(Department.Medicine)}
                        showIncrease={canIncreaseDepartment(Department.Medicine)} showDecrease={canDecreaseDepartment(Department.Medicine)}
                        onIncrease={() => { setDepartment(Department.Medicine, 1) }}
                        onDecrease={() => {setDepartment(Department.Medicine, -1)}} />
                </div>
            </section>
        </>);
    }


    return (<LcarsFrame activePage={PageIdentity.StationSpaceframe}>
        <div id="app">
            <div className="page container ms-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>{t('Page.title.home')}</Link></li>
                    <li className="breadcrumb-item"><Link to={"/station"}>{t('Page.title.stationIndex')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('Page.title.stationSpaceframe')}</li>
                </ol>
                </nav>

                <main>
                    <Header>{t('Page.title.stationSpaceframe')}</Header>

                    <ReactMarkdown>{t('StationSpaceframePage.instruction')}</ReactMarkdown>

                    <div className="btn-group w-100" role="group" aria-label={t('StationSpaceframePage.frameType')}>
                        <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === SpaceframeTab.Custom ? "active" : "")}
                                onClick={() => setTab(SpaceframeTab.Custom)}>{t('StationSpaceframePage.custom')}</button>
                        <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === SpaceframeTab.Standard ? "active" : "")}
                                onClick={() => setTab(SpaceframeTab.Standard)}>{t('StationSpaceframePage.standard')}</button>
                    </div>

                    {renderCustomStats()}

                    <div className="text-end mt-5">
                        <Button onClick={() => onNext()}>{t('Common.button.next')}</Button>
                    </div>

                </main>
            </div>
        </div>
    </LcarsFrame>);
}

export default connect(stationMapStateToProperties)(StationSpaceframePage);