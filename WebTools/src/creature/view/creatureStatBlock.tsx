import { useTranslation } from "react-i18next";
import { Header } from "../../components/header";
import { StatView } from "../../components/StatView";
import { makeKey } from "../../common/translationKey";
import { Attribute } from "../../helpers/attributes";
import { Skill } from "../../helpers/skills";
import { Creature } from "../model/creature";

interface ICreatureStatBlockProperties {
    creature: Creature;
}

const CreatureStatBlock: React.FC<ICreatureStatBlockProperties> = ({creature}) => {

    const { t } = useTranslation();

    return (<>
        <Header level={2}>{t('Construct.other.attributes')}</Header>

        <div className="row row-cols-1 row-cols-md-3 mt-3">
            <StatView name={t(makeKey('Construct.attribute.', Attribute[Attribute.Control]))} value={creature.attributes ? creature.attributes[Attribute.Control] : undefined} className="col mb-2" />
            <StatView name={t(makeKey('Construct.attribute.', Attribute[Attribute.Fitness]))} value={creature.attributes ? creature.attributes[Attribute.Fitness] : undefined} className="col mb-2" />
            <StatView name={t(makeKey('Construct.attribute.', Attribute[Attribute.Presence]))} value={creature.attributes ? creature.attributes[Attribute.Presence] : undefined} className="col mb-2" />
            <StatView name={t(makeKey('Construct.attribute.', Attribute[Attribute.Daring]))} value={creature.attributes ? creature.attributes[Attribute.Daring] : undefined} className="col mb-2" />
            <StatView name={t(makeKey('Construct.attribute.', Attribute[Attribute.Insight]))} value={creature.attributes ? creature.attributes[Attribute.Insight] : undefined} className="col mb-2" />
            <StatView name={t(makeKey('Construct.attribute.', Attribute[Attribute.Reason]))} value={creature.attributes ? creature.attributes[Attribute.Reason] : undefined} className="col mb-2" />
        </div>

        <Header level={2} className="mt-4">{t('Construct.other.departments')}</Header>
        <div className="row row-cols-1 row-cols-md-3 mt-3">
            <StatView name={t(makeKey('Construct.discipline.', Skill[Skill.Command]))} value={creature.departments ? creature.departments[Skill.Command] : undefined} className="col mb-2" showZero={true} />
            <StatView name={t(makeKey('Construct.discipline.', Skill[Skill.Engineering]))} value={creature.departments ? creature.departments[Skill.Engineering] : undefined} className="col mb-2" showZero={true} />
            <StatView name={t(makeKey('Construct.discipline.', Skill[Skill.Medicine]))} value={creature.departments ? creature.departments[Skill.Medicine] : undefined} className="col mb-2" showZero={true} />
            <StatView name={t(makeKey('Construct.discipline.', Skill[Skill.Conn]))} value={creature.departments ? creature.departments[Skill.Conn] : undefined} className="col mb-2" showZero={true} />
            <StatView name={t(makeKey('Construct.discipline.', Skill[Skill.Security]))} value={creature.departments ? creature.departments[Skill.Security] : undefined} className="col mb-2" showZero={true} />
            <StatView name={t(makeKey('Construct.discipline.', Skill[Skill.Science]))} value={creature.departments ? creature.departments[Skill.Science] : undefined} className="col mb-2" showZero={true} />
        </div>

    </>);
}


export default CreatureStatBlock;