import ReactMarkdown from "react-markdown";
import { Character } from "../common/character";
import { Header } from "./header";
import { useTranslation } from "react-i18next";
import { Species } from "../helpers/speciesEnum";
import { InputFieldAndLabel } from "../common/inputFieldAndLabel";
import store from "../state/store";
import D20IconButton from "../solo/component/d20IconButton";
import { localizedFocus } from "./focusHelper";
import { FocusRandomTableWithHints } from "../solo/table/focusRandomTable";
import { addCharacterBorgImplantSpeciesOption, removeCharacterBorgImplantSpeciesOption, setCharacterSpeciesAbilityFocus } from "../state/characterActions";
import { Department } from "../helpers/department";
import { hasSource } from "../state/contextFunctions";
import { Source } from "../helpers/sources";
import { BorgImplants, BorgImplantType } from "../helpers/borgImplant";
import { CheckBox } from "./checkBox";
import { CHALLENGE_DICE_NOTATION } from "../common/challengeDiceNotation";
import Markdown from "react-markdown";

interface ISpeciesAbilityProperties{
    character: Character;
    showInstruction?: boolean;
    skill?: Department;
}

export const SpeciesAbilityView: React.FC<ISpeciesAbilityProperties> = ({character, showInstruction, skill}) => {

    const { t } = useTranslation()

    const selectRandomFocus = (index: number) => {
        let done = false;
        while (!done) {
            let focus = localizedFocus(FocusRandomTableWithHints(skill));
            if (character.focuses.indexOf(focus) < 0) {
                done = true;
                store.dispatch(setCharacterSpeciesAbilityFocus(focus, index));
            }
        }
    }

    const renderDenobulanFocuses = () => {
        return (<div className="mb-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                <InputFieldAndLabel id="speciesFocus1" labelName={t('Construct.other.focus1')}
                    value={character.speciesStep?.abilityOptions?.focuses[0] || ""} className="mt-1"
                    onChange={(v) => store.dispatch(setCharacterSpeciesAbilityFocus(v, 0))} />
                <div style={{ flexShrink: 0 }} className="mt-1">
                    <D20IconButton onClick={() => selectRandomFocus(0)}/>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <InputFieldAndLabel id="speciesFocus2" labelName={t('Construct.other.focus2')}
                    value={character.speciesStep?.abilityOptions?.focuses[1] || ""} className="mt-1"
                    onChange={(v) => store.dispatch(setCharacterSpeciesAbilityFocus(v, 1))} />
                <div style={{ flexShrink: 0 }} className="mt-1">
                    <D20IconButton onClick={() => selectRandomFocus(1)}/>
                </div>
            </div>
        </div>)

    }

    const renderBorgImplants = () => {
        const implants = BorgImplants.instance.implants.map(implant => {
            const description = character.version === 1 ? implant.localizedDescription : implant.localizedDescription2e
            return (
                <tr key={'implant-' + implant.type}>
                    <td>
                        <CheckBox
                            isChecked={character.speciesStep?.abilityOptions?.implants?.includes(implant.type) ?? false}
                            onChanged={(val) => {
                                if (character.speciesStep?.abilityOptions?.implants?.includes(implant.type)) {
                                    store.dispatch(removeCharacterBorgImplantSpeciesOption(implant.type))
                                } else {
                                    store.dispatch(addCharacterBorgImplantSpeciesOption(implant.type))
                                }
                            }}
                            value={implant.name} />
                    </td>
                    <td>
                        <div className="selection-header-small"><strong>{character.version === 1 ? implant.localizedName : implant.localizedName2e}</strong></div>
                        {description.includes(CHALLENGE_DICE_NOTATION)
                            ? (<div>replaceDiceWithArrowhead(implant.description)</div>)
                            : (<div><Markdown className="markdown-sm">{description}</Markdown></div>)}
                    </td>
                </tr>
            );
        });

        return (
            <table className="selection-list">
                <tbody>
                    {implants}
                </tbody>
            </table>
        );

        return undefined;
    }


    if (character?.speciesStep?.ability) {
        return (<>
            <Header level={2}>{t('Construct.other.speciesAbility')}</Header>
            {showInstruction === false ? undefined : (<ReactMarkdown>{t('SpeciesAbilityView.instruction')}</ReactMarkdown>)}

            <Header level={3}>{character.speciesStep?.ability?.name}</Header>
            <ReactMarkdown>{character.speciesStep?.ability?.description}</ReactMarkdown>

            {character.speciesStep?.species === Species.Denobulan
                ? renderDenobulanFocuses()
                : undefined}
            {character.speciesStep?.species === Species.LiberatedBorg && hasSource(Source.SpeciesSourcebook)
                ? renderBorgImplants()
                : undefined}
        </>);
    } else {
        return undefined;
    }
}