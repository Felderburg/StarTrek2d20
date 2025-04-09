import React, { useEffect, useState } from 'react';
import {CheckBox} from './checkBox';
import {TALENT_NAME_BORG_IMPLANTS, TALENT_NAME_EXPANDED_PROGRAM, TALENT_NAME_VISIT_EVERY_STAR, TALENT_NAME_WARRIORS_SPIRIT, TALENT_NAME_WISDOM_OF_YEARS, TalentViewModel} from '../helpers/talents';
import replaceDiceWithArrowhead from '../common/arrowhead';
import { useTranslation } from 'react-i18next';
import { ITalent } from '../helpers/italent';
import { SelectedTalent } from '../common/selectedTalent';
import { DropDownElement, DropDownSelect } from './dropDownInput';
import { SpecialWeapon } from '../common/specialWeapon';
import { FocusSelectionView } from './focusSelectionView';
import { Character } from '../common/character';
import { Department } from '../helpers/department';
import ValueInput from './valueInputWithRandomOption';
import { ValueRandomTable } from '../solo/table/valueRandomTable';
import { Construct } from '../common/construct';
import { BorgImplants } from '../helpers/borgImplant';

interface ISingleTalentSelectionProperties {
    talents: TalentViewModel[]
    construct: Construct;
    initialSelection?: ITalent|SelectedTalent;
    onSelection: (talent?: SelectedTalent) => void;
}

const SingleTalentSelectionList: React.FC<ISingleTalentSelectionProperties> = ({talents, construct, initialSelection, onSelection}) => {

    let original = null;
    if (initialSelection == null) {
        // do nothing
    } else if (initialSelection instanceof SelectedTalent) {
        original = (initialSelection as SelectedTalent).copy();
    } else {
        original = new SelectedTalent(initialSelection.name);
    }
    const [selection, setSelection]  = useState<SelectedTalent|undefined>(original);
    const { t } = useTranslation();

    useEffect(() => {
        if (selection == null) {
            // do nothing
        } else if (talents.filter(t => t.name === selection.talent)?.length) {
            // do nothing
        } else {
            setSelection(undefined);
            onSelection(undefined);
        }

    }, [talents]);

    const specialWeaponOptions = () => {
        let result = [];
        result.push(new DropDownElement("", t('Common.select.choose')));
        result.push(new DropDownElement(SpecialWeapon.BatLeth, "Bat'leth"));
        result.push(new DropDownElement(SpecialWeapon.MekLeth, "Mek'leth"));
        return result;
    }

    const selectTalent = (talent: TalentViewModel) => {
        if (selection?.talent === talent?.name) {
            setSelection(undefined);
            onSelection(undefined);
        } else {
            let temp = new SelectedTalent(talent.name);
            setSelection(temp);
            onSelection(temp);
        }
    }

    const renderBorgImplantsSelection = () => {

        const implants = BorgImplants.instance.implants.map(implant => {
            return (
                <tr key={'implant-' + implant.type}>
                    <td>
                        <CheckBox
                            isChecked={selection.implants.includes(implant.type)}
                            onChanged={(val) => {
                                let temp = selection.copy();
                                if (temp.implants?.includes(implant.type)) {
                                    temp.implants.splice(temp.implants.indexOf(implant.type), 1);
                                } else {
                                    if (temp.implants == null) {
                                        temp.implants = [];
                                    }
                                    temp.implants.push(implant.type);
                                }
                                if (temp.implants.length > 3) {
                                    temp.implants.splice(0, temp.implants.length-3);
                                }
                                setSelection(temp);
                                onSelection(temp);
                            }}
                            value={implant.name} />
                    </td>
                    <td>
                        <div className="selection-header-small"><strong>{implant.name}</strong></div>
                        <div>{replaceDiceWithArrowhead(implant.description)}</div></td>
                </tr>
            );
        });

        return (
            <div className="row">
                <div className="col-12 col-md-6">
                    <table className="selection-list">
                        <tbody>
                            {implants}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    const renderWisdomOfYearsSelection = () => {
        return (<>
            <div className="row">
                <div className="col-12 col-md-6">
                    <FocusSelectionView
                        value={selection.focuses[0] ?? ""}
                        addFocus={(f) => {
                            let temp = selection?.copy();
                            if (temp) {
                                if (temp.focuses?.length) {
                                    temp.focuses[0] = f;
                                } else {
                                    temp.focuses = [ f ];
                                }
                            }
                            setSelection(temp);
                            onSelection(temp);
                        }}
                        character={construct as Character}
                    />
                    <ValueInput
                        value={selection.value ?? ""}
                        onValueChanged={(v) => {
                            let temp = selection?.copy();
                            if (temp) {
                                temp.value = v;
                            }
                            setSelection(temp);
                            onSelection(temp);
                        }}
                        onRandomClicked={() => {
                            let value = ValueRandomTable((construct as Character).speciesStep?.species, (construct as Character).educationStep?.primaryDiscipline);
                            let temp = selection?.copy();
                            if (temp) {
                                temp.value = value;
                            }
                            setSelection(temp);
                            onSelection(temp);
                        }}
                    />
                </div>
            </div>
        </>);
    }

    const renderExpandedProgramSelection = () => {
        return (<>
            <div className="row">
                <div className="col-12 col-md-6">
                    <FocusSelectionView
                        label={t('Construct.other.focus1')}
                        value={selection.focuses[0] ?? ""}
                        addFocus={(f) => {
                            let temp = selection?.copy();
                            if (temp) {
                                if (temp.focuses?.length) {
                                    temp.focuses[0] = f;
                                } else {
                                    temp.focuses = [ f ];
                                }
                            }
                            setSelection(temp);
                            onSelection(temp);
                        }}
                        character={construct as Character}
                    />
                    <FocusSelectionView
                        label={t('Construct.other.focus2')}
                        value={selection.focuses[1] ?? ""}
                        addFocus={(f) => {
                            let temp = selection?.copy();
                            if (temp) {
                                if (!temp.focuses?.length) {
                                    temp.focuses = ["", f];
                                } else if (temp.focuses?.length === 1) {
                                    temp.focuses.push(f);
                                } else {
                                    temp.focuses[1] = f;
                                }
                            }
                            setSelection(temp);
                            onSelection(temp);
                        }}
                        suggestions="Holonovel writing, Opera, Holo-photography, or anything else"
                        character={construct as Character}
                    />
                </div>
            </div>
        </>);
    }


    talents = talents.sort((t1, t2) => {
        return t1.localizedName.localeCompare(t2.localizedName);
    })

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

        let lines = t.description.split('\n').map((l, i) => {
            return (<div className={i === 0 ? '' : 'mt-2'} key={'d-' + i}>{replaceDiceWithArrowhead(l)}</div>);
        })

        return (<tbody key={i}>
            <tr>
                <td className="selection-header-small">{t.localizedName}</td>
                <td>{lines} {prerequisites}</td>
                <td>
                    <CheckBox
                        text=""
                        value={t.name}
                        isChecked={selection?.talent === t.name}
                        onChanged={() => {
                            selectTalent(t);
                        } }/>
                </td>
            </tr>
            {selection?.talent === t.name && t.name === TALENT_NAME_WARRIORS_SPIRIT
                ? (<tr>
                    <td></td>
                    <td colSpan={2}>
                        <DropDownSelect items={specialWeaponOptions()}
                            defaultValue={selection?.selection ?? ""}
                            onChange={(value) => {
                                let temp = selection?.copy();
                                if (temp) {
                                    temp.selection = (value as SpecialWeapon);
                                }
                                setSelection(temp);
                                onSelection(temp);
                            }} />
                    </td>
                </tr>)
                : undefined
            }
            {selection?.talent === t.name && t.name === TALENT_NAME_VISIT_EVERY_STAR
                ? (<tr>
                    <td></td>
                    <td colSpan={2}>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <FocusSelectionView
                                    character={construct as Character}
                                    addFocus={(f) => {
                                        let temp = selection?.copy();
                                        if (temp) {
                                            temp.focuses = [ f ];
                                        }
                                        setSelection(temp);
                                        onSelection(temp);
                                    }}
                                    value={selection.focuses?.length ? selection.focuses[0] : undefined}
                                    hints={["Astronagivation", "Stellar Cartography", "Warp Field Theory", "Astronomy",
                                        "Heliophysics", "Cosmology", "Astrometry", "Planetology"]}
                                    suggestions="Astronavigation, Stellar Cartography, or a similar field of space science."
                                    randomFocusDepartment={Department.Conn}
                                />
                            </div>
                        </div>
                    </td>
                </tr>)
                : undefined
            }
            {selection?.talent === t.name && t.name === TALENT_NAME_EXPANDED_PROGRAM
                ? (<tr>
                    <td></td>
                    <td colSpan={2}>
                        {renderExpandedProgramSelection()}
                    </td>
                </tr>)
                : undefined}
            {selection?.talent === t.name && t.name === TALENT_NAME_WISDOM_OF_YEARS
                ? (<tr>
                    <td></td>
                    <td colSpan={2}>
                        {renderWisdomOfYearsSelection()}
                    </td>
                </tr>)
                : undefined}
            {selection?.talent === t.name && t.name === TALENT_NAME_BORG_IMPLANTS
                ? (<tr>
                    <td></td>
                    <td colSpan={2}>
                        {renderBorgImplantsSelection()}
                    </td>
                </tr>)
                : undefined}
            </tbody>);
    });

    return (
        <table className="selection-list">
            {talentList}
        </table>
    );
}

export default SingleTalentSelectionList;