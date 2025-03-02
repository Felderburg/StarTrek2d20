import { connect } from "react-redux";
import { ILocalStorageConstructRecord } from "../common/iLocalStorageConstructRecord"
import { Header } from "./header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";

interface IRecentCreationsProperties {
    records: ILocalStorageConstructRecord[];
}

const RecentCreationsView: React.FC<IRecentCreationsProperties> = ({records}) => {

    const { t } = useTranslation();

    if (records?.length) {
        return (<>
            <Header level={2}>{t('RecentCreationsView.title')}</Header>
            <Markdown>{t('RecentCreationsView.instruction')}</Markdown>
            {records.map(r =>
                (<p className="m-0">
                    <Link to={"/view?s=" + r.marshalled} target="_blank" rel="noopener noreferrer">
                        {r.name}
                    </Link>
                </p>))}
        </>);
    } else {

        return undefined;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        records: state.savedConstructReducer.records
    };
}

export default connect(mapStateToProps)(RecentCreationsView);