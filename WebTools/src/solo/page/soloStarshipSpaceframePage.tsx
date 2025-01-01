import { useTranslation } from "react-i18next";
import { Navigation } from "../../common/navigator";
import { PageIdentity } from "../../pages/pageIdentity";
import { Header } from "../../components/header";
import { connect } from "react-redux";
import { Window } from "../../common/window";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import store from "../../state/store";
import { Era } from "../../helpers/eras";
import { Starship } from "../../common/starship";
import { SpaceframeHelper } from "../../helpers/spaceframes";
import { Department } from "../../helpers/departments";
import { SpaceframeModel } from "../../helpers/spaceframeModel";
import { setStarshipSpaceframe } from "../../state/starshipActions";
import { SpaceframeRandomTable } from "../table/starshipRandomTable";
import { StatView } from "../../components/StatView";
import { System, } from "../../helpers/systems";
import SoloStarshipBreadcrumbs from "../component/soloStarshipBreadcrumbs";

interface ISoloStarshipSpaceframePageProperties {
    era: Era;
    starship: Starship;
}

const SoloStarshipSpaceframePage: React.FC<ISoloStarshipSpaceframePageProperties> = ({era, starship}) => {

    const selectSpaceframe = (spaceframe: SpaceframeModel) => {
        store.dispatch(setStarshipSpaceframe(spaceframe));
        Navigation.navigateToPage(PageIdentity.SoloStarshipTalents);
    }

    const { t } = useTranslation();
    const [randomSpaceframe, setRandomSpaceframe] = useState(starship?.spaceframeModel?.id);

    let selectionList = SpaceframeHelper.instance().soloSpaceframesByEra(era).map(s => SpaceframeHelper.instance().getSpaceframe(s));
    if (randomSpaceframe != null) {
        selectionList = [SpaceframeHelper.instance().getSpaceframe(randomSpaceframe)];
    }
    let selectionRows = selectionList.map((s,i) => {
        const departments = (<>
                <StatView name={t('Construct.department.command')} value={s.soloStats?.departments[Department.Command]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-dept-command'}/>
                <StatView name={t('Construct.department.security')} value={s.soloStats?.departments[Department.Security]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-dept-security'}/>
                <StatView name={t('Construct.department.science')} value={s.soloStats?.departments[Department.Science]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-dept-science'}/>
                <StatView name={t('Construct.department.conn')} value={s.soloStats?.departments[Department.Conn]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-dept-conn'}/>
                <StatView name={t('Construct.department.engineering')} value={s.soloStats?.departments[Department.Engineering]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-dept-engineering'}/>
                <StatView name={t('Construct.department.medicine')} value={s.soloStats?.departments[Department.Medicine]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-dept-medicine'}/>
            </>);

        const systems = (<>
                <StatView name={t('Construct.system.comms')} value={s.soloStats?.systems[System.Comms]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-sys-comms'}/>
                <StatView name={t('Construct.system.engines')} value={s.soloStats?.systems[System.Engines]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-sys-engines'}/>
                <StatView name={t('Construct.system.structure')} value={s.soloStats?.systems[System.Structure]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-sys-structure'}/>
                <StatView name={t('Construct.system.computer')} value={s.soloStats?.systems[System.Computer]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-sys-commputer'}/>
                <StatView name={t('Construct.system.sensors')} value={s.soloStats?.systems[System.Sensors]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-sys-sensors'}/>
                <StatView name={t('Construct.system.weapons')} value={s.soloStats?.systems[System.Weapons]} className="col mb-1" showZero={true}
                    key={'frame-' + s + '-sys-weapons'}/>
            </>);

        return (
            <tr key={i} onClick={() => { if (Window.isCompact()) selectSpaceframe(s); }}>
                <td className="selection-header">{s.localizedName}</td>
                <td className="d-none d-md-table-cell">
                    <div className="row row-cols-1 row-cols-lg-3" style={{maxWidth: "600px"}}>
                    {systems}
                    </div>
                    <div className="row row-cols-1 row-cols-lg-3 mt-2" style={{maxWidth: "600px"}}>
                    {departments}
                    </div>
                    <div className="row row-cols-1 row-cols-lg-3 mt-2 mb-3" style={{maxWidth: "600px"}}>
                    <StatView name={t('Construct.other.scale')} value={s.scale} className="col mb-1" showZero={true}
                        key={'frame-' + s + '-scale'} colourClass="red"/>
                    </div>
                </td>
                <td className="text-end"><Button size="sm" onClick={() => { selectSpaceframe(s) }} >{t('Common.button.select')}</Button></td>
            </tr>
        );
    });

    return (
        <div className="page container ms-0">
            <SoloStarshipBreadcrumbs pageIdentity={PageIdentity.SoloStarshipSpaceframe} />
            <Header>{t('Page.title.spaceframeSelection')}</Header>
            <p className="mt-3">
                {t('SoloSpeciesPage.instruction')}
            </p>

            <div className="my-4">
                <Button size="sm" className="me-3" onClick={() => setRandomSpaceframe( SpaceframeRandomTable(era)) }>
                    <><img src="/static/img/d20.svg" style={{height: "24px", aspectRatio: "1"}} className="me-1" alt={t('Common.button.random')}/> {t('Common.button.random')}</>
                </Button>
                {randomSpaceframe != null ? (<Button size="sm" className="me-3" onClick={() => setRandomSpaceframe(null)} >{t('Common.button.showAll')}</Button>) : undefined}
            </div>

            <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td className="d-none d-md-table-cell"><b>{t('Construct.other.stats')}</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {selectionRows}
                    </tbody>
                </table>
        </div>);
}

function mapStateToProps(state, ownProps) {
    return {
        era: state.context.era,
        starship: state.starship.starship
    };
}



export default connect(mapStateToProps)(SoloStarshipSpaceframePage);