import { useTranslation } from "react-i18next";
import { characterMapStateToProperties, ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import LcarsFrame from "../../components/lcarsFrame";
import CharacterCreationBreadcrumbs from "../../components/characterCreationBreadcrumbs";
import { PageIdentity } from "../../pages/pageIdentity";
import { Header } from "../../components/header";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

const NpcSpecialRulesPage: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (character == null) {
            navigate("/npc");
        }
    }, [character]);

    const onNext = () => {
        navigate("/npc/final");
    }

    return (<LcarsFrame activePage={PageIdentity.NpcFinal}>
        <div id="app">
            <div className="page container ms-0">
                <CharacterCreationBreadcrumbs character={character}
                    pageIdentity={PageIdentity.NpcTalents} />
                <main>
                    <Header>{t('Page.title.npcTalents')}</Header>


                    <div className="mt-4 text-end">
                        <Button className="mt-4" onClick={() => { onNext(); } } >{t('Common.button.next')}</Button>
                    </div>
                </main>
            </div>
        </div>
    </LcarsFrame>);
}

export default connect(characterMapStateToProperties)(NpcSpecialRulesPage);