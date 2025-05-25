import { useTranslation } from "react-i18next";
import { characterMapStateToProperties, ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import CharacterCreationBreadcrumbs from "../../components/characterCreationBreadcrumbs";
import { connect } from "react-redux";
import { Header } from "../../components/header";
import { Button } from "react-bootstrap";
import store from "../../state/store";
import { marshaller } from "../../helpers/marshaller";
import { saveCharacterToLocalStorage } from "../../state/savedConstructActions";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { setCharacterName, setCharacterPronouns } from "../../state/characterActions";

const NpcFinalPage: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();

    const showViewPage = () => {
        setTimeout(() => {
            let c = store.getState().character.currentCharacter;
            const value = marshaller.encodeCharacter(c);
            store.dispatch(saveCharacterToLocalStorage(c));
            window.open('/view?s=' + value, "_blank");
        }, 200);
    }

    return (<LcarsFrame activePage={PageIdentity.NpcFinal}>
        <div id="app">
            <div className="page container ms-0">
                <CharacterCreationBreadcrumbs character={character}
                    pageIdentity={PageIdentity.NpcFinal} />
                <main>
                    <Header>{t('Page.title.npcFinal')}</Header>

                    <div className="row">
                        <div className="col-lg-6 my-5">
                            <Header level={2}>{t('Construct.other.name')}</Header>
                            <InputFieldAndLabel labelName={t('Construct.other.name')} id="name"
                                onChange={(value) => store.dispatch(setCharacterName(value))}
                                value={character.name ?? ""} />

                            <div className="mt-3">
                                <InputFieldAndLabel labelName={t('Construct.other.pronouns')} id="pronouns"
                                    onChange={(value) => store.dispatch(setCharacterPronouns(value))}
                                    value={character.pronouns ?? ""} />
                                <div className="text-white mt-1"><small><b>{t('Common.text.suggestions')}: </b> <i>she/her, they/them, etc.</i></small></div>
                            </div>
                        </div>
                    </div>

                    <div className="button-container mt-4">
                        <Button size="sm" className="me-2 mb-2" onClick={() => showViewPage() }>{t('Common.button.view')}</Button>
                    </div>
                </main>
            </div>
        </div>
    </LcarsFrame>);
}

export default connect(characterMapStateToProperties)(NpcFinalPage);