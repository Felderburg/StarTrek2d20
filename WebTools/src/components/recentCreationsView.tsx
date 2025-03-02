import { connect } from "react-redux";
import { ILocalStorageConstructRecord } from "../common/iLocalStorageConstructRecord"
import { Header } from "./header";
import { Link } from "react-router-dom";

interface IRecentCreationsProperties {
    records: ILocalStorageConstructRecord[];
}

const RecentCreationsView: React.FC<IRecentCreationsProperties> = ({records}) => {

    if (records?.length) {

        return (<>
            <Header level={2}>Recents</Header>
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