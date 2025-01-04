import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { preventDefaultAnchorEvent } from "../../common/navigator";
import { Header } from "../../components/header";
import InstructionText from "../../components/instructionText";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { Habitat, HabitatHelper } from "../model/habitat";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { CreatureGenerator } from "../model/creatureGenerator";
import { connect } from "react-redux";
import { Era } from "../../helpers/eras";
import { marshaller } from "../../helpers/marshaller";

interface IRandomCreatureConfigurationProperties {
    era: Era;
}

const RandomCreatureConfigurationPage: React.FC<IRandomCreatureConfigurationProperties> = ({era}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [ habitat, setHabitat] = useState<Habitat|null>(null);

    const getHabitatTypes = () => {
        let result = [ new DropDownElement("", t('RandomCreatureConfiguration.anyHabitat'))];
        result.push(...HabitatHelper.instance.getTypes().map(h => new DropDownElement(h.id, h.localizedName)));
        return result;
    }

    const createCreature = () => {
        let creature = CreatureGenerator(era, habitat);
        console.log(creature);

        const value = marshaller.encodeCreature(creature);
        window.open('/view?s=' + value, "_blank");
    }

    return (
        <LcarsFrame activePage={PageIdentity.RandomCreature}>
            <div id="app">
                <div className="page container ms-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => preventDefaultAnchorEvent(e, () => navigate("/"))}>{t('Page.title.home')}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{t('Page.title.randomCreature')}</li>
                    </ol>
                    </nav>
                    <main>
                        <Header>{t('Page.title.randomCreature')}</Header>

                        <div className="my-4">
                            <InstructionText text={t('RandomCreatureConfiguration.text')} />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mt-4">
                                <Header level={2}>{t('RandomCreatureConfiguration.habitat')}</Header>

                                <div className="my-4">
                                    <DropDownSelect
                                        items={getHabitatTypes()}
                                        defaultValue={ habitat ?? "" }
                                        onChange={(type) => setHabitat(type === "" ? undefined : type as Habitat)} />
                                </div>

                            </div>
                        </div>

                        <div className="text-end">
                            <Button onClick={() => createCreature()}>{t('Common.button.create')}</Button>
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
export default connect(mapStateToProps)(RandomCreatureConfigurationPage);