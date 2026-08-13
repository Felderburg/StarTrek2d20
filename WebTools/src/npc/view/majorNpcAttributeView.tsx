import { useTranslation } from "react-i18next";
import { characterMapStateToProperties, ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import { makeKey } from "../../common/translationKey";
import { StatControl } from "../../starship/view/statControl";
import { Attribute } from "../../helpers/attributes";
import store from "../../state/store";
import { setNpcCharacterAttributes } from "../../state/characterActions";
import { useEffect } from "react";
import { NpcType, NpcTypes } from "../model/npcType";
import { connect } from "react-redux";
import { Character } from "../../common/character";

const MajorNpcAttributeView: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();

    useEffect(() => {
        if (!(character.npcGenerationStep?.attributes?.filter(d => d != null)?.length)) {
            store.dispatch(setNpcCharacterAttributes(NpcTypes.attributePoints(character.npcGenerationStep?.type, true).map(v => v - 7)));
        }
    }, [character.npcGenerationStep?.attributes, character.npcGenerationStep?.type])


    const getAttribute = (attribute: Attribute) => {
        return character.attributes[attribute];
    }
    const canIncreaseAttribute = (attribute: Attribute) => {
        let total = 0;
        character.npcGenerationStep?.attributes?.forEach(n => total += n);
        const attributes = character.attributes;

        if (character.hasMaxedAttribute()) {
            return total < NpcTypes.attributePointCount(NpcType.Major) && attributes[attribute] < (Character.ABSOLUTE_MAX_ATTRIBUTE - 1);
        } else {
            return total < NpcTypes.attributePointCount(NpcType.Major) && attributes[attribute] < Character.ABSOLUTE_MAX_ATTRIBUTE;
        }
    }

    const canDecreaseAttribute = (attribute: Attribute) => {
        return character.npcGenerationStep.attributes[attribute] > 0;
    }

    const setAttribute = (attribute: Attribute, delta: number) => {
        let attributes = [...character.npcGenerationStep?.attributes];
        attributes[attribute] = attributes[attribute] + delta;
        store.dispatch(setNpcCharacterAttributes(attributes));
    }

    return (<>
        <div className="stats-row mt-4">
            <StatControl statName={t(makeKey('Construct.attribute.', Attribute[Attribute.Control]))} value={getAttribute(Attribute.Control)}
                showIncrease={canIncreaseAttribute(Attribute.Control)}
                showDecrease={canDecreaseAttribute(Attribute.Control)}
                onIncrease={() => {setAttribute(Attribute.Control, 1) }}
                onDecrease={() => {setAttribute(Attribute.Control, -1)}} />

            <StatControl statName={t(makeKey('Construct.attribute.', Attribute[Attribute.Fitness]))} value={getAttribute(Attribute.Fitness)}
                showIncrease={canIncreaseAttribute(Attribute.Fitness)}
                showDecrease={canDecreaseAttribute(Attribute.Fitness)}
                onIncrease={() => { setAttribute(Attribute.Fitness, 1) }}
                onDecrease={() => {setAttribute(Attribute.Fitness, -1)}} />

            <StatControl statName={t(makeKey('Construct.attribute.', Attribute[Attribute.Presence]))} value={getAttribute(Attribute.Presence)}
                showIncrease={canIncreaseAttribute(Attribute.Presence)}
                showDecrease={canDecreaseAttribute(Attribute.Presence)}
                onIncrease={() => { setAttribute(Attribute.Presence, 1) }}
                onDecrease={() => {setAttribute(Attribute.Presence, -1)}} />
        </div>

        <div className="stats-row">
            <StatControl statName={t(makeKey('Construct.attribute.', Attribute[Attribute.Daring]))} value={getAttribute(Attribute.Daring)}
                showIncrease={canIncreaseAttribute(Attribute.Daring)}
                showDecrease={canDecreaseAttribute(Attribute.Daring)}
                onIncrease={() => { setAttribute(Attribute.Daring, 1) }}
                onDecrease={() => {setAttribute(Attribute.Daring, -1)}} />

            <StatControl statName={t(makeKey('Construct.attribute.', Attribute[Attribute.Insight]))} value={getAttribute(Attribute.Insight)}
                showIncrease={canIncreaseAttribute(Attribute.Insight)}
                showDecrease={canDecreaseAttribute(Attribute.Insight)}
                onIncrease={() => { setAttribute(Attribute.Insight, 1) }}
                onDecrease={() => {setAttribute(Attribute.Insight, -1)}} />

            <StatControl statName={t(makeKey('Construct.attribute.', Attribute[Attribute.Reason]))} value={getAttribute(Attribute.Reason)}
                showIncrease={canIncreaseAttribute(Attribute.Reason)}
                showDecrease={canDecreaseAttribute(Attribute.Reason)}
                onIncrease={() => { setAttribute(Attribute.Reason, 1) }}
                onDecrease={() => {setAttribute(Attribute.Reason, -1)}} />
        </div>
    </>);
}

export default connect(characterMapStateToProperties)(MajorNpcAttributeView);