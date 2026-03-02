import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { Link, useNavigate } from "react-router-dom";
import { Station } from "../../common/station";
import store from "../../state/store";
import { createStation } from "../../state/stationActions";
import { CharacterType, CharacterTypeModel } from "../../common/characterType";
import { connect } from "react-redux";
import { Era } from "../../helpers/eras";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";

interface IStationIndexPageProperties {
    era: Era;
}

const StationIndexPage: React.FC<IStationIndexPageProperties> = ({era}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [characterType, setCharacterType] = useState(CharacterType.Starfleet);

    const createNewStation = () => {
        store.dispatch(createStation(Station.create(characterType, 2, era)));
        navigate("/station/frame");
    }

    const getCharacterTypeElements = () => {
        const supportedType = [CharacterType.Starfleet, CharacterType.KlingonWarrior,
            CharacterType.Ferengi, CharacterType.Cardassian, CharacterType.Romulan,
            CharacterType.Other];
        return CharacterTypeModel.getAllTypes()
            .filter(t => supportedType.includes(t.type))
            .map(t => new DropDownElement(t.type, t.localizedName));
    }

    return (<LcarsFrame activePage={PageIdentity.StationIndex}>
        <div id="app">
            <div className="page container ms-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>{t('Page.title.home')}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{t('Page.title.stationIndex')}</li>
                </ol>
                </nav>
                <main>

                    <Header>{t('Page.title.stationIndex')}</Header>

                    <ReactMarkdown>{t('StationIndexPage.instruction')}</ReactMarkdown>

                    <section className="row">
                        <div className="col-12 col-md-6">

                            <Header level={2} className="my-4">{t('StationIndexPage.characterType')}</Header>
                            <DropDownSelect items={getCharacterTypeElements()}
                                defaultValue={characterType}
                                onChange={(v) => setCharacterType(v as CharacterType)} />

                        </div>
                    </section>

                    <div className="text-end mt-5">
                        <Button onClick={createNewStation}>{t('Common.button.create')}</Button>
                    </div>
                </main>
            </div>
        </div>
    </LcarsFrame>);
}

function mapStateToProps(state, ownProps) {
    return {
        era: state.context.era
    };
}

export default connect(mapStateToProps)(StationIndexPage);