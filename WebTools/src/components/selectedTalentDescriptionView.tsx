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
import ValueInput from './valueInputWithRandomOption';
import { ValueRandomTable } from '../solo/table/valueRandomTable';

interface ISelectedTalentDescriptionProperties {
    version: number;
    talent: SelectedTalent;
}

interface ITalentAdditionalSelectionProperties {
    character: Character;
    onSelection: (selection: string[]|SpecialWeapon|undefined) => void;
}

interface ITalentAdditionalFocusAndValueSelectionProperties {
    character: Character;
    onFocusSelection: (selection: string|undefined) => void;
    onValueSelection: (selection: string|undefined) => void;
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
            }} value={selection ?? ""} character={character}
            hints={["Astronagivation", "Stellar Cartography", "Warp Field Theory", "Astronomy",
                "Heliophysics", "Cosmology", "Astrometry", "Planetology"]}
            suggestions="Astronavigation, Stellar Cartography, or a similar field of space science." />
        </div>
    );
}

const randomValue = (character: Character) => {
    let value = ValueRandomTable(character.speciesStep?.species, character.educationStep?.primaryDiscipline);
    while (character.values.includes(value)) {
        value = ValueRandomTable(character.speciesStep?.species, character.educationStep?.primaryDiscipline);
    }
    return value;
}

export const WisdomOfYearsSelectionView: React.FC<ITalentAdditionalFocusAndValueSelectionProperties> = ({onFocusSelection, onValueSelection, character}) => {

    const { t } = useTranslation();
    const [ focusSelection, setFocusSelection ] = useState<string|undefined>(undefined);
    const [ valueSelection, setValueSelection ] = useState<string|undefined>(undefined);

    return (
        <div>
            <Header level={2} className="my-4">{t('Talent.wisdomOfYears')}</Header>
            <FocusSelectionView addFocus={(f) => {
                    setFocusSelection(f);
                    onFocusSelection(f)
                }} value={focusSelection ?? ""} character={character}
            />

            <ValueInput onValueChanged={(v) => {
                    setValueSelection(v);
                    onValueSelection(v);
                }} value={valueSelection ?? ""}
                onRandomClicked={() => {
                    let value = randomValue(character);
                    setValueSelection(value);
                    onValueSelection(value);
                }}
            />
        </div>
    );
}

export const ExpandedProgramSelectionView: React.FC<ITalentAdditionalSelectionProperties> = ({onSelection, character}) => {

    const { t } = useTranslation();
    const [ selection, setSelection ] = useState<string[]>([]);

    return (
        <div>
            <Header level={2} className="my-4">{t('Talent.expandedProgram')}</Header>
            <FocusSelectionView
                label={t('Construct.other.focus1')}
                value={selection[0] ?? ""}
                addFocus={(f) => {
                    let temp = [...selection];
                    if (temp?.length) {
                        temp[0] = f;
                    } else {
                        temp.push(f);
                    }
                    setSelection(temp);
                    onSelection(temp);
                }}
                character={character}
            />
            <FocusSelectionView
                label={t('Construct.other.focus2')}
                value={selection[1] ?? ""}
                addFocus={(f) => {
                    let temp = [...selection];
                    if (temp) {
                        if (!temp.length) {
                            temp = ["", f];
                        } else if (temp?.length === 1) {
                            temp.push(f);
                        } else {
                            temp[1] = f;
                        }
                    }
                    setSelection(temp);
                    onSelection(temp);
                }}
                suggestions="Holonovel writing, Opera, Holo-photography, or anything else"
                character={character}
            />
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