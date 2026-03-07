import { useTranslation } from "react-i18next";
import { Station } from "../../common/station";
import { PageIdentity } from "../../pages/pageIdentity";
import { Link } from "react-router-dom";

interface IStationBreadcrumbProperties {
    pageIdentity: PageIdentity;
    station?: Station;
}

const StationBreadcrumbs: React.FC<IStationBreadcrumbProperties> = ({station, pageIdentity}) => {

    const { t } = useTranslation();

    const renderSpaceframe = () => {
        if (station == null) {
            return undefined;
        } else if (pageIdentity === PageIdentity.StationSpaceframe) {
            return (<li className="breadcrumb-item active">{t('Page.title.stationSpaceframe')}</li>)
        } else {
            return (<li className="breadcrumb-item"><Link to={"/station/frame"}>{t('Page.title.stationSpaceframe')}</Link></li>)
        }
    }

    const renderMissionProfile = () => {
        if (station == null || station?.missionProfileStep == null) {
            return undefined;
        } else if (pageIdentity === PageIdentity.StationMissionProfile) {
            return (<li className="breadcrumb-item active" aria-current="page">{t('Page.title.stationMissionProfile')}</li>);
        } else {
            return (<li className="breadcrumb-item"><Link to={"/station/profile"}>{t('Page.title.stationMissionProfile')}</Link></li>)
        }
    }

    return (<nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/"}>{t('Page.title.home')}</Link></li>

            {pageIdentity === PageIdentity.StationIndex
                ? (<li className="breadcrumb-item active">{t('Page.title.stationIndex')}</li>)
                : (<li className="breadcrumb-item"><Link to={"/station"}>{t('Page.title.stationIndex')}</Link></li>)}

            {renderSpaceframe()}
            {renderMissionProfile()}
        </ol>
    </nav>);
}

export default StationBreadcrumbs;