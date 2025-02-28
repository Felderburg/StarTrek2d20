import React, { useState } from "react";
import { connect } from "react-redux";
import { Header } from "../../components/header";
import { Character } from "../../common/character";
import { navigateTo } from "../../common/navigator";
import { PageIdentity } from "../../pages/pageIdentity";
import Button from "react-bootstrap/Button";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { MilestoneType } from "../model/milestoneType";
import { makeKey } from "../../common/translationKey";
import { Department } from "../../helpers/skills";
import InstructionText from "../../components/instructionText";
import { StatControl } from "../../starship/view/statControl";
import { Dialog } from "../../components/dialog";
import store from "../../state/store";
import { applyNormalMilestoneDiscipline, applyNormalMilestoneFocus } from "../../state/characterActions";
import { CheckBox } from "../../components/checkBox";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { useTranslation } from "react-i18next";
import { ModifyBreadcrumb } from "../modifyBreadcrumb";
import { ModificationType } from "../model/modificationType";

interface IMilestonePageProperties {
    milestoneType: MilestoneType,
    character?: Character;
}

const MilestonePage: React.FC<IMilestonePageProperties> = ({character, milestoneType}) => {

    const [ normalOption, setNormalOption ] = useState(0);
    const [ normalDisciplineDecrease, setNormalDisciplineDecrease ] = useState(null);
    const [ normalDisciplineIncrease, setNormalDisciplineIncrease ] = useState(null);
    const [ normalDeletedFocus, setNormalDeletedFocus ] = useState(null);
    const [ normalAddedFocus, setNormalAddedFocus ] = useState(null);

    const { t } = useTranslation();

    function renderNormalMilestoneAdjustment() {
        if (normalOption === 0) {
            return (<>
                <div className="stats-row mt-4">
                    <StatControl statName={t(makeKey('Construct.discipline.', Department[Department.Command]))} value={getDepartmentValue(Department.Command)}
                        showIncrease={canIncreaseDepartment(Department.Command)} showDecrease={canDecreaseDepartment(Department.Command)}
                        onIncrease={() => {increaseDepartment(Department.Command) }}
                        onDecrease={() => {decreaseDepartment(Department.Command)}} />

                    <StatControl statName={t(makeKey('Construct.discipline.', Department[Department.Security]))} value={getDepartmentValue(Department.Security)}
                        showIncrease={canIncreaseDepartment(Department.Security)} showDecrease={canDecreaseDepartment(Department.Security)}
                        onIncrease={() => {increaseDepartment(Department.Security) }}
                        onDecrease={() => {decreaseDepartment(Department.Security)}} />

                    <StatControl statName={t(makeKey('Construct.discipline.', Department[Department.Science]))} value={getDepartmentValue(Department.Science)}
                        showIncrease={canIncreaseDepartment(Department.Science)} showDecrease={canDecreaseDepartment(Department.Science)}
                        onIncrease={() => {increaseDepartment(Department.Science) }}
                        onDecrease={() => {decreaseDepartment(Department.Science)}} />
                </div>

                <div className="stats-row">
                    <StatControl statName={t(makeKey('Construct.discipline.', Department[Department.Conn]))} value={getDepartmentValue(Department.Conn)}
                        showIncrease={canIncreaseDepartment(Department.Conn)} showDecrease={canDecreaseDepartment(Department.Conn)}
                        onIncrease={() => {increaseDepartment(Department.Conn) }}
                        onDecrease={() => {decreaseDepartment(Department.Conn)}} />

                    <StatControl statName={t(makeKey('Construct.discipline.', Department[Department.Engineering]))} value={getDepartmentValue(Department.Engineering)}
                        showIncrease={canIncreaseDepartment(Department.Engineering)} showDecrease={canDecreaseDepartment(Department.Engineering)}
                        onIncrease={() => {increaseDepartment(Department.Engineering) }}
                        onDecrease={() => {decreaseDepartment(Department.Engineering)}} />

                    <StatControl statName={t(makeKey('Construct.discipline.', Department[Department.Medicine]))} value={getDepartmentValue(Department.Medicine)}
                        showIncrease={canIncreaseDepartment(Department.Medicine)} showDecrease={canDecreaseDepartment(Department.Medicine)}
                        onIncrease={() => {increaseDepartment(Department.Medicine) }}
                        onDecrease={() => {decreaseDepartment(Department.Medicine)}} />
                </div>
            </>);
        } else {
            const focuses = character.focuses.map((f, i) => {
                return (
                    <tr key={i}>
                        <td>{f}</td>
                        <td>
                            <CheckBox
                                text=""
                                value={t.name}
                                isChecked={normalDeletedFocus === f}
                                onChanged={() => {
                                    selectNormalDeletedFocus(f);
                                } }/>
                        </td>
                    </tr>
                );
            });

            return (
                <div className="row">
                    <div className="col-md-6">
                        <Header level={2}>Replace Focus</Header>
                        <p>Select one of the following focuses to remove.</p>
                        <table className="selection-list">
                            <tbody>
                                {focuses}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <Header level={2}>New Focus</Header>
                        <p>Choose a new, replacement focus.</p>

                        <InputFieldAndLabel id="newFocus" labelName={t('Construct.other.focus')}
                            value={normalAddedFocus || ""}
                            onChange={(focus) => setNormalAddedFocus(focus)} />
                    </div>
                </div>);
        }
    }

    function selectNormalDeletedFocus(focus: string) {
        setNormalDeletedFocus(focus);
    }

    function canIncreaseDepartment(skill: Department) {
        let base = character.departments[skill];
        if (normalDisciplineDecrease == null) {
            return false;
        } else if (base >= 4) {
            return false;
        } else if (normalDisciplineIncrease == null) {
            return true;
        } else if (normalDisciplineDecrease === skill && normalDisciplineIncrease == null) {
            return true;
        } else {
            return false;
        }
    }

    function canDecreaseDepartment(skill: Department) {
        let base = character.departments[skill];
        if (base <= 1) {
            return false;
        } else if (normalDisciplineIncrease === skill) {
            return true;
        } else if (normalDisciplineDecrease == null) {
            return true;
        } else {
            return false;
        }
    }

    function decreaseDepartment(skill: Department) {
        if (normalDisciplineIncrease === skill) {
            setNormalDisciplineIncrease(null);
        } else {
            setNormalDisciplineDecrease(skill);
        }
    }

    function increaseDepartment(skill: Department) {
        if (normalDisciplineDecrease === skill) {
            setNormalDisciplineDecrease(null);
        } else {
            setNormalDisciplineIncrease(skill);
        };
    }

    function getDepartmentValue(skill: Department) {
        if (skill === normalDisciplineDecrease) {
            return character.departments[skill] - 1;
        } else if (skill === normalDisciplineIncrease) {
            return character.departments[skill] + 1;
        } else {
            return character.departments[skill];
        }
    }


    function describeNormalMilestoneOption() {
        if (normalOption === 0) {
            return "Reduce one discipline by 1 (to a minimum of 1) and increate a different discpline by 1 (to a maximum of 4)";
        } else {
            return "Choose a Focus and replace it with another Focus.";
        }
    }

    const getOptions = () => {
        return [ new DropDownElement(0, "Change discipline"), new DropDownElement(1, "Change focus")];
    }

    const nextPage = () => {
        if (normalOption === 0) {
            if (normalDisciplineDecrease == null || normalDisciplineIncrease == null) {
                Dialog.show("Decrease one discipline and increase another.");
            } else {
                store.dispatch(applyNormalMilestoneDiscipline(normalDisciplineDecrease, normalDisciplineIncrease));
                navigateTo(null, PageIdentity.ModificationCompletePage);
            }
        } else {
            if (!normalDeletedFocus || !normalAddedFocus) {
                Dialog.show("Please specify which focus you want to replace, and what the new focus is.");
            } else {
                store.dispatch(applyNormalMilestoneFocus(normalDeletedFocus, normalAddedFocus));
                navigateTo(null, PageIdentity.ModificationCompletePage);
            }
        }
    }


    return (<div className="page container ms-0">
        <ModifyBreadcrumb milestoneType={milestoneType} modificationType={ModificationType.Milestone} />

        <Header>{t(makeKey('Page.title.', MilestoneType[milestoneType]))}</Header>
        <p>{t('MilestonePage.instruction')}</p>

        <DropDownSelect items={getOptions()} onChange={(index) => setNormalOption(index as number)} defaultValue={normalOption}/>

        <div className="mt-4">
            <InstructionText text={describeNormalMilestoneOption()} />
        </div>

        {renderNormalMilestoneAdjustment()}

        <div className="mt-4 text-end">
            <Button onClick={() => nextPage()} size="sm">{t('Common.button.next')}</Button>
        </div>

    </div>);

}

function mapStateToProps(state, ownProps) {
    return {
        character: state.character.currentCharacter
    };
}

export default connect(mapStateToProps)(MilestonePage);
