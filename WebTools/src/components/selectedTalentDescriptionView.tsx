import React from 'react';
import replaceDiceWithArrowhead from '../common/arrowhead';
import { CHALLENGE_DICE_NOTATION } from '../common/challengeDiceNotation';
import Markdown from 'react-markdown';
import { Header } from './header';
import { SelectedTalent } from '../common/selectedTalent';

interface ISelectedTalentDescriptionProperties {
    version: number;
    talent: SelectedTalent;
}

export const SelectedTalentDescriptionView: React.FC<ISelectedTalentDescriptionProperties> = ({version, talent}) => {
    if (talent == null) {
        return undefined;
    } else {
        const talentDescription = version === 1
            ? talent.talentModel.localizedDescription
            : talent.talentModel.localizedDescription2e;
        const desc = (talentDescription.indexOf(CHALLENGE_DICE_NOTATION) >= 0)
            ? <p>{replaceDiceWithArrowhead(talentDescription)}</p>
            : <Markdown>{talentDescription}</Markdown>;

        return (
            <div>
                <Header level={3}>{talent.talentModel.localizedName}</Header>
                {desc}
            </div>
        );
    }
}