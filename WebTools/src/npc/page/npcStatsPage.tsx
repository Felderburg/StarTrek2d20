import { connect } from "react-redux";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { characterMapStateToProperties, ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import CharacterCreationBreadcrumbs from "../../components/characterCreationBreadcrumbs";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Header } from "../../components/header";
import { useTranslation } from "react-i18next";
import NpcDepartmentView from "../view/npcDepartmentView";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import store from "../../state/store";
import { setCharacterAssignment } from "../../state/characterActions";

const NpcStatsPage: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (character == null) {
            navigate("/npc");
        }
    }, [character]);

    return character
        ? (<LcarsFrame activePage={PageIdentity.NpcStats}>
            <div id="app">
                <div className="page container ms-0">
                    <CharacterCreationBreadcrumbs pageIdentity={PageIdentity.NpcStats} character={character} />

                    <main>
                        <Header>{t('Page.title.npcStats')}</Header>

                        <div className="row">
                            <div className="col-12 col-md-6 mt-4">
                                <Header level={2} className="my-3">{t('Construct.other.departments')}</Header>
                                <NpcDepartmentView />
                            </div>

                            <div className="col-12 col-md-6 mt-4">
                                <Header level={2} className="my-3">{t('Construct.other.role')}</Header>
                                <InputFieldAndLabel id="role"
                                    labelName={t('Construct.other.role')}
                                    value={character.jobAssignment}
                                    onChange={(v) => store.dispatch(setCharacterAssignment(v))}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </LcarsFrame>)
        : undefined;
}

export default connect(characterMapStateToProperties)(NpcStatsPage);