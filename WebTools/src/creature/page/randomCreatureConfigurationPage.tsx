import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { preventDefaultAnchorEvent } from "../../common/navigator";
import { Header } from "../../components/header";
import InstructionText from "../../components/instructionText";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { Habitat, HabitatHelper } from "../model/habitat";
import { useEffect, useState } from "react";
import { CreatureGenerator } from "../model/creatureGenerator";
import { connect } from "react-redux";
import { Era } from "../../helpers/eras";
import { marshaller } from "../../helpers/marshaller";
import { CreatureType, CreatureTypeHelper, habitatsByCreatureType } from "../model/creatureType";
import { LoadingButton } from "../../common/loadingButton";
import { CheckBox } from "../../components/checkBox";

interface IRandomCreatureConfigurationProperties {
    era: Era;
}

const RandomCreatureConfigurationPage: React.FC<IRandomCreatureConfigurationProperties> = ({era}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [ habitat, setHabitat] = useState<Habitat|null>(null);
    const [ creatureType, setCreatureType] = useState<CreatureType|null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ includeDescription, setIncludeDescription ] = useState<boolean>(true);

    useEffect(() => {
        let value = window.localStorage.getItem("settings.ai");
        setIncludeDescription(value !== "false");
    }, []);

    const updateIncludeDescription =(value: boolean) => {
        setIncludeDescription(value);
        window.localStorage.setItem("settings.ai", value ? "true" : "false");
    }


    const getHabitatTypes = () => {
        let result = [ new DropDownElement("", t('RandomCreatureConfiguration.anyHabitat'))];
        result.push(
            ...HabitatHelper.instance.getTypes()
            .filter(h => creatureType == null || habitatsByCreatureType(creatureType).includes(h.id))
            .map(h => new DropDownElement(h.id, h.localizedName)));
        return result;
    }

    const getCreatureTypes = () => {
        let result = [ new DropDownElement("", t('RandomCreatureConfiguration.anyCreatureType'))];
        result.push(...CreatureTypeHelper.instance.getTypes().map(c => new DropDownElement(c.id, c.localizedName)));
        return result;
    }

    const createCreature = async () => {
        setLoading(true);
        let creature = await CreatureGenerator(era, habitat, creatureType, includeDescription);

        const value = marshaller.encodeCreature(creature);
        window.open('/view?s=' + value, "_blank");
        setLoading(false);
    }

    const selectCreatureType = (type: string|number) => {
        if (type === "") {
            setCreatureType(undefined);
        } else {
            const c = type as CreatureType;
            setCreatureType(c);
            if (habitat != null && !habitatsByCreatureType(c).includes(habitat)) {
                setHabitat(undefined);
            }
        }
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

                            <div className="col-md-6 mt-4">
                                <Header level={2}>{t('Construct.creature.creatureType')}</Header>

                                <div className="my-4">
                                    <DropDownSelect
                                        items={getCreatureTypes()}
                                        defaultValue={ creatureType ?? "" }
                                        onChange={selectCreatureType} />
                                </div>

                            </div>

                            <div className="col-md-6 mt-4">
                                <Header level={2} className="mt-5">{t('Construct.other.description')}</Header>

                                <div className="mt-4">
                                    <CheckBox
                                        isChecked={ includeDescription }
                                        value={ "includeDescription" }
                                        text={t('NpcConfigurationPage.includeDescription')}
                                        onChanged={(_inc) => updateIncludeDescription(!includeDescription) }/>
                                </div>
                            </div>
                        </div>

                        <div className="text-end mt-5">
                            <LoadingButton loading={loading} enabled={!loading} size="sm" onClick={() => createCreature()}>{t('Common.button.create')}</LoadingButton>
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