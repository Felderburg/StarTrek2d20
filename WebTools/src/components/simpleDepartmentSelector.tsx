import { useTranslation } from "react-i18next";
import { makeKey } from "../common/translationKey";
import { Department, DepartmentsHelper } from "../helpers/skills"
import { CheckBox } from "./checkBox";
import { ICharacterPageProperties } from "../common/iCharacterPageProperties";
import { Character } from "../common/character";

interface ISimpleDepartmentSelectorProperties extends ICharacterPageProperties {

    isChecked: (department: Department) => boolean;
    onSelectDepartment: (department: Department) => void;
}

export const SimpleDepartmentSelector: React.FC<ISimpleDepartmentSelectorProperties> =
    ({onSelectDepartment, isChecked, character}) => {

    const { t } = useTranslation();

    const isIncrementable = (s: Department, departments: number[]) => {
        if (departments[s] !== Character.maxDepartment(character)) {
            return false;
        } else if (character.hasMaxedDepartment() && departments[s] === (Character.ABSOLUTE_MAX_DEPARTMENT - 1)) {
            return false;
        } else {
            return true;
        }
    }

    const departments = character.departments;
    return (<table className="selection-list">
        <tbody>
            {DepartmentsHelper.instance.getDepartments().map((s, i) => {
                return (<tr key={i}>
                    <td className="selection-header-small">{t(makeKey("Construct.discipline.", Department[s]))}</td>
                    <td className="text-end">
                        <span>{departments[s]}</span>
                        <CheckBox text="" value={s} isChecked={isChecked(s)}
                            onChanged={(val) => onSelectDepartment(s)}
                            disabled={!isIncrementable(s, departments)} />
                    </td>
                </tr>);
            })}
        </tbody>
    </table>);
}