import React, { useEffect, useState } from 'react';
import {CheckBox} from './checkBox';
import {TalentModel} from '../helpers/talentModel';
import {TALENT_NAME_CUSTOM_TALENT} from '../helpers/talents';
import replaceDiceWithArrowhead from '../common/arrowhead';
import { Construct } from '../common/construct';
import { SelectedTalent } from '../common/selectedTalent';
import { ITalent } from '../helpers/italent';

interface ISimpleTalentSelectionProperties {
    talents: TalentModel[]
    construct: Construct;
    initialSelection?: string;
    onSelection: (talent?: SelectedTalent) => void;
}

const SimpleTalentSelectionList: React.FC<ISimpleTalentSelectionProperties> = ({talents, construct, onSelection, initialSelection}) => {

    const [ selection, setSelection] = useState<string|undefined>(initialSelection);

    useEffect(() => {
        if (selection == null) {
            // do nothing
        } else if (talents.filter(t => t.name === selection)?.length) {
            // do nothing
        } else {
            setSelection(undefined);
            onSelection(undefined);
        }

    }, [talents, selection, onSelection]);

    talents = talents.sort((t1, t2) => {
        if (t1.name === TALENT_NAME_CUSTOM_TALENT) {
            return 1;
        } else if (t2.name === TALENT_NAME_CUSTOM_TALENT) {
            return -1;
        } else {
            return t1.localizedName.localeCompare(t2.localizedName);
        }
    })

    const selectTalent = (talent: ITalent) => {
        if (selection === talent.name) {
            setSelection(undefined);
            onSelection(undefined);
        } else {
            setSelection(talent.name);
            onSelection(new SelectedTalent(talent.name));
        }
    }

    const talentList = talents.map((t, i) => {
        let prerequisites = undefined;
        t.prerequisites.forEach((p) => {
            let desc = p.describe();
            if (desc) {
                if (prerequisites == null) {
                    prerequisites = desc;
                } else {
                    prerequisites += (", " + desc);
                }
            }
        });
        if (prerequisites) {
            prerequisites = (<div style={{ fontWeight: "bold" }}>{prerequisites}</div>);
        }

        let description = construct.version === 1 ? (t as TalentModel).localizedDescription : (t as TalentModel).localizedDescription2e;
        let lines = description.split('\n').map((l, i) => {
            return (<div className={i === 0 ? '' : 'mt-2'} key={'d-' + i}>{replaceDiceWithArrowhead(l)}</div>);
        })

        return (
            <tr key={i}>
                <td className="selection-header-small">{t.localizedName}</td>
                <td>{lines} {prerequisites}</td>
                <td>
                    <CheckBox
                        text=""
                        value={t.name}
                        isChecked={selection === t.name}
                        onChanged={() => selectTalent(t)}/>
                </td>
            </tr>
        );
    });

    return (
        <table className="selection-list">
            <tbody>
                {talentList}
            </tbody>
        </table>
    );
}

export default SimpleTalentSelectionList;