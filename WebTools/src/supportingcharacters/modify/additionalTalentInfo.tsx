import { Character } from "../../common/character";
import { SelectedTalent } from "../../common/selectedTalent";
import { SpecialWeapon } from "../../common/specialWeapon";
import { AugmentedAbilitySelectionView, BoldOrCautiousDepartmentSelectionView, CollaborationDepartmentSelectionView, ExpandedProgramSelectionView, VisitEveryStarSelectionView, WarriorsSpiritSelectionView, WisdomOfYearsSelectionView } from "../../components/selectedTalentDescriptionView";
import { ITalent } from "../../helpers/italent";
import { TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_BOLD, TALENT_NAME_CAUTIOUS, TALENT_NAME_COLLABORATION, TALENT_NAME_EXPANDED_PROGRAM, TALENT_NAME_VISIT_EVERY_STAR, TALENT_NAME_WARRIORS_SPIRIT, TALENT_NAME_WISDOM_OF_YEARS } from "../../helpers/talents";

interface IAdditionalTalentInfoProperties {
    character: Character;
    talentSelection: SelectedTalent;
    setTalentSelection: (selection: SelectedTalent) => void;
    simpleHeader?: boolean;
}

export const isAdditionalTalentSupported = (talent: ITalent) => {
    return [TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_BOLD, TALENT_NAME_CAUTIOUS,
        TALENT_NAME_COLLABORATION, TALENT_NAME_EXPANDED_PROGRAM,
        TALENT_NAME_VISIT_EVERY_STAR, TALENT_NAME_WARRIORS_SPIRIT,
        TALENT_NAME_WISDOM_OF_YEARS].includes(talent.name);
}

export const AdditionalTalentInfo: React.FC<IAdditionalTalentInfoProperties> = ({character, talentSelection, setTalentSelection, simpleHeader}) => {
        if (talentSelection?.talent === TALENT_NAME_COLLABORATION) {
            return (<CollaborationDepartmentSelectionView onDepartmentSelection={(d) => {
                    let temp = talentSelection.copy();
                    if (temp) {
                        temp.department = d;
                    }
                    setTalentSelection(temp);
                }} character={character}
                simpleHeader={simpleHeader}
                initialSelection={talentSelection.department}
                />);
        } else if (talentSelection?.talent === TALENT_NAME_AUGMENTED_ABILITY) {
            return (<AugmentedAbilitySelectionView onAttributeSelection={(a) => {
                    let temp = talentSelection.copy();
                    if (temp) {
                        temp.attribute = a;
                    }
                    setTalentSelection(temp);
                }}
                character={character}
                initialSelection={talentSelection.attribute}
                simpleHeader={simpleHeader}
                />);
        } else if (talentSelection?.talent === TALENT_NAME_VISIT_EVERY_STAR) {
            return (<VisitEveryStarSelectionView onSelection={(f) => {
                    let temp = talentSelection.copy();
                    if (temp) {
                        temp.focuses = f as string[];
                    }
                    setTalentSelection(temp);
                }} character={character}
                simpleHeader={simpleHeader}
                />);
        } else if (talentSelection?.talent === TALENT_NAME_EXPANDED_PROGRAM) {
            return (<ExpandedProgramSelectionView onSelection={(f) => {
                    let temp = talentSelection.copy();
                    if (temp) {
                        temp.focuses = f as string[];
                    }
                    setTalentSelection(temp);
                }} character={character}
                simpleHeader={simpleHeader}
                />);
        } else if (talentSelection?.talent === TALENT_NAME_WARRIORS_SPIRIT) {
            return (<WarriorsSpiritSelectionView onSelection={(w) => {
                    let temp = talentSelection.copy();
                    if (temp) {
                        temp.selection = w as SpecialWeapon;
                    }
                    setTalentSelection(temp);
                }} character={character}
                simpleHeader={simpleHeader}
                />);
        } else if (talentSelection?.talent === TALENT_NAME_WISDOM_OF_YEARS) {
            return (<WisdomOfYearsSelectionView onFocusSelection={(f) => {
                    let temp = talentSelection.copy();
                    if (temp) {
                        temp.focuses = [ f ];
                    }
                    setTalentSelection(temp);
                }}
                onValueSelection={v => {
                    let temp = talentSelection.copy();
                    if (temp) {
                        temp.value = v;
                    }
                    setTalentSelection(temp);
                }}
                character={character}
                />);
        } else if (talentSelection?.talent === TALENT_NAME_BOLD || talentSelection?.talent === TALENT_NAME_CAUTIOUS) {
            return (<BoldOrCautiousDepartmentSelectionView onDepartmentSelection={(d) => {
                    let temp = talentSelection?.copy();
                    if (temp) {
                        temp.department = d;
                    }
                    setTalentSelection(temp);
                }}
                talent={talentSelection.talentModel}
                initialSelection={talentSelection.department}
                character={character}
                simpleHeader={simpleHeader}
                />);
        } else {
            return undefined;
        }
    }