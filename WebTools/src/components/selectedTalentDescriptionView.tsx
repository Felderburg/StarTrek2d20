import React, { useState } from 'react';
import replaceDiceWithArrowhead from '../common/arrowhead';
import { CHALLENGE_DICE_NOTATION } from '../common/challengeDiceNotation';
import Markdown from 'react-markdown';
import { Header } from './header';
import { SelectedTalent } from '../common/selectedTalent';
import { SpecialWeapon } from '../common/specialWeapon';
import { useTranslation } from 'react-i18next';
import { DropDownElement, DropDownSelect } from './dropDownInput';
import { FocusSelectionView } from './focusSelectionView';
import { Character } from '../common/character';

interface ISelectedTalentDescriptionProperties {
    version: number;
    talent: SelectedTalent;
}

interface ITalentAdditionalSelectionProperties {
    character: Character;
    onSelection: (selection: string[]|SpecialWeapon|undefined) => void;
}

export const WarriorsSpiritSelectionView: React.FC<ITalentAdditionalSelectionProperties> = ({onSelection}) => {

    const { t } = useTranslation();
    const [ selection, setSelection ] = useState<SpecialWeapon|undefined>(undefined);

    const options = () => {
        let result = [];
        result.push(new DropDownElement("", t('Common.select.choose')));
        result.push(new DropDownElement(SpecialWeapon.BatLeth, "Bat'leth"));
        result.push(new DropDownElement(SpecialWeapon.MekLeth, "Mek'leth"));
        return result;
    }

    return (
        <div>
            <Header level={2} className="my-4">{t('Talent.warriorsSpirit')}</Header>
            <DropDownSelect items={options()}
                defaultValue={selection ?? ""}
                onChange={(value) => {
                    if (value === "") {
                        onSelection(undefined);
                        setSelection(undefined);
                    } else {
                        onSelection(value as SpecialWeapon);
                        setSelection(value as SpecialWeapon);
                    }
                }} />
        </div>
    );
}

export const VisitEveryStarSelectionView: React.FC<ITalentAdditionalSelectionProperties> = ({onSelection, character}) => {

    const { t } = useTranslation();
    const [ selection, setSelection ] = useState<string|undefined>(undefined);

    return (
        <div>
            <Header level={2} className="my-4">{t('Talent.visitEveryStar')}</Header>
            <FocusSelectionView addFocus={(f) => {
                setSelection(f);
                onSelection(f == null ? undefined : [ f ])
            }} value={selection ?? ""} character={character} />
        </div>
    );


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