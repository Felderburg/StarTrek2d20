import { useTranslation } from "react-i18next";
import { Header } from "../components/header";
import { TALENT_NAME_AUGMENTED_ABILITY, TalentModel, TalentsHelper } from "../helpers/talents";
import replaceDiceWithArrowhead from "../common/arrowhead";
import { Stereotype } from "../common/construct";
import { Starship } from "../common/starship";
import { Character } from "../common/character";
import { CHALLENGE_DICE_NOTATION } from "../common/challengeDiceNotation";
import ReactMarkdown from "react-markdown";
import { Creature } from "../creature/model/creature";
import { makeKey } from "../common/translationKey";
import { Attribute } from "../helpers/attributes";

interface IConstructPageProperties {
    construct: Character|Starship|Creature;
}

const TalentsBlockView: React.FC<IConstructPageProperties> = ({construct}) => {

    const { t } = useTranslation();

    const renderDescription = (talentName: string, talent: TalentModel, x?: number) => {
        let description = construct.version === 1 ? talent.localizedDescription : talent.localizedDescription2e;
        if (talent.isXQualified && x !== undefined) {
            if (description.includes(" X.")) {
                description = description.replace(" X.", " " + x + ".");
            }
            if (description.includes(" X ")) {
                description = description.replace(" X ", " " + x + " ");
            }
        }

        if (description.indexOf(CHALLENGE_DICE_NOTATION) >= 0) {
            return (
                <>
                    <strong>{talent.localizedDisplayName + (talent.maxRank > 1 ? " [x" + construct.getRankForTalent(t.name) + "]" : "")}:</strong> {' '}
                    {replaceDiceWithArrowhead(description)}
                    {renderExtraDetails(talent)}
                </>)
        } else {
            return (<>
                <ReactMarkdown className="markdown-sm">{'**' + talentName + ':** ' + description}</ReactMarkdown>
                {renderExtraDetails(talent)}
            </>)
        }
    }

    const renderExtraDetails = (talent: TalentModel) => {
        if (talent.name === TALENT_NAME_AUGMENTED_ABILITY) {
            let character = construct as Character;
            let selectedAttributes = character.talents
                .filter(s => s.talent === TALENT_NAME_AUGMENTED_ABILITY)
                .map(s => t(makeKey("Construct.attribute.", Attribute[s.attribute])))
                .join(", ");
            return (<div className="text-sm px-4"><b>{t("Construct.other.attribute") + ": "}</b>
                {selectedAttributes}</div>);
        } else {
            return undefined;
        }
    }

    const renderStarshipTalents = () => {

        const talents = construct?.getDistinctTalentNameList().map((tName, i) => {
            let t = TalentsHelper.getTalent(tName);
            let name = t.localizedDisplayName;
            let starship = construct as Starship;
            let qualifier = starship.getQualifierForTalent(tName);
            if (qualifier?.length) {
                name += " [" + qualifier + "]";
            }
            let talentName = name + (t.maxRank > 1 ? " [x" + construct.getRankForTalent(t.name) + "]" : "");
            if (t.specialRule) {
                return null;
            } else if (construct.stereotype === Stereotype.SoloStarship) {
                return (<div className="text-white view-border-bottom py-2" key={'talent-' + i}>
                    <strong>{t.localizedDisplayName + (t.maxRank > 1 ? " [x" + construct.getRankForTalent(t.name) + "]" : "")}:</strong> {' '}
                    {replaceDiceWithArrowhead(t.localizedSoloDescription)}
                </div>);
            } else {
                return (<div className="text-white view-border-bottom py-2" key={'talent-' + i}>
                    {renderDescription(talentName, t)}
                </div>);
            }
        });

        const specialRules = construct?.getDistinctTalentNameList().map((tName, i) => {
            let t = TalentsHelper.getTalent(tName);
            let name = t.localizedDisplayName;
            let starship = construct as Starship;
            let qualifier = starship.getQualifierForTalent(tName);
            if (qualifier?.length) {
                name += " [" + qualifier + "]";
            }
            let talentName = name + (t.maxRank > 1 ? " [x" + construct.getRankForTalent(t.name) + "]" : "");
            if (!t.specialRule) {
                return null;
            } else if (construct.stereotype === Stereotype.SoloStarship) {
                return (<div className="text-white view-border-bottom py-2" key={'talent-' + i}>
                    <strong>{t.localizedDisplayName + (t.maxRank > 1 ? " [x" + construct.getRankForTalent(t.name) + "]" : "")}:</strong> {' '}
                    {replaceDiceWithArrowhead(t.localizedSoloDescription)}
                </div>);
            } else {
                return (<div className="text-white view-border-bottom py-2" key={'talent-' + i}>
                    {renderDescription(talentName, t)}
                </div>);
            }
        });

        return (<>

            {talents?.filter(s => s != null)?.length
                ? (<>
                    <Header level={2} className="mt-4">{t('Construct.other.talents')}</Header>
                    {talents}
                </>)
                : null
            }
            {specialRules?.filter(s => s != null)?.length
                ? (<>
                    <Header level={2} className="mt-4">{t('Construct.other.specialRules')}</Header>
                    {specialRules}
                </>)
                : null
            }
        </>)

    }

    const renderCharacterTalents = () => {
        return (<>
            <Header level={2} className="mt-4">{construct.stereotype === Stereotype.Npc ? t('Construct.other.specialRules') : t('Construct.other.talents')}</Header>
            {construct?.getDistinctTalentNameList().map((tName, i) => {
                let t = TalentsHelper.getTalent(tName);
                let talentName = t.localizedDisplayName;
                if (t.maxRank > 1 && t.name !== TALENT_NAME_AUGMENTED_ABILITY) {
                    talentName += " [x" + construct.getRankForTalent(t.name) + "]";
                }
                return (<div className="text-white view-border-bottom py-2" key={'talent-' + i}>
                    {renderDescription(talentName, t)}
                </div>);
            })}
        </>);
    }

    const renderCreatureTalents = () => {
        const creature = construct as Creature;
        let x = undefined;
        return (<>
            <Header level={2} className="mt-4">{t('Construct.other.specialRules')}</Header>
            {creature?.getDistinctTalentNameList().map((tName, i) => {
                const temp = creature.talents.filter(t => t.talent === tName);
                if (temp.length) {
                    const selectedTalent = temp[0];
                    return (<div className="text-white view-border-bottom py-2" key={'talent-' + i}>
                        {renderDescription(selectedTalent.displayName, TalentsHelper.getTalent(selectedTalent.talent), x)}
                    </div>);
                } else {
                    return undefined;
                }

            })}
        </>);
    }

    if (construct?.getDistinctTalentNameList()?.length) {
        if (construct instanceof Character) {
            return renderCharacterTalents();
        } else if (construct instanceof Starship) {
            return renderStarshipTalents();
        } else {
            return renderCreatureTalents();
        }
    } else {
        return undefined;
    }
}

export default TalentsBlockView;