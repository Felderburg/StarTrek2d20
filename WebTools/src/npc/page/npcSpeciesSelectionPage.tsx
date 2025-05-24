import { useTranslation } from "react-i18next";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import SpeciesPage from "../../pages/speciesPage";
import { characterMapStateToProperties, ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";


const NpcSpeciesSelectionPage: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (character == null) {
            navigate("/npc");
        }
    }, [character]);

    if (character) {
        return (<LcarsFrame activePage={PageIdentity.NpcSpeciesSelection}>
            <div id="app">
                <SpeciesPage />
            </div>
        </LcarsFrame>);
    } else {
        return undefined;
    }
}

export default connect(characterMapStateToProperties)(NpcSpeciesSelectionPage);