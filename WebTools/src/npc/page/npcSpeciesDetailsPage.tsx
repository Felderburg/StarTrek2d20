import { characterMapStateToProperties, ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import SpeciesDetailsPage from "../../pages/speciesDetailsPage";
import { connect } from "react-redux";

const NpcSpeciesDetailsPage: React.FC<ICharacterProperties> = ({character}) => {

    return (<LcarsFrame activePage={PageIdentity.NpcSpeciesSelectionDetails}>
        <div id="app">
            <SpeciesDetailsPage />
        </div>
    </LcarsFrame>);
}

export default connect(characterMapStateToProperties)(NpcSpeciesDetailsPage);