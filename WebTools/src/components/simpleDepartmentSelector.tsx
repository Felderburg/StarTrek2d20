import { useTranslation } from "react-i18next";
import { makeKey } from "../common/translationKey";
import { Department, DepartmentsHelper } from "../helpers/department"
import { CheckBox } from "./checkBox";
import { ICharacterPageProperties } from "../common/iCharacterPageProperties";
import { Character } from "../common/character";
import { Starship } from "../common/starship";

interface ISimpleDepartmentSelectorProperties extends ICharacterPageProperties {

    isChecked: (department: Department) => boolean;
    onSelectDepartment: (department: Department) => void;
    isUpdateable?: (department: Department, character: Character) => boolean;
}

export const SimpleDepartmentSelector: React.FC<ISimpleDepartmentSelectorProperties> =
    ({onSelectDepartment, isChecked, character, isUpdateable}) => {

    const { t } = useTranslation();

    const isIncrementable = (s: Department, departments: number[]) => {
        if (departments[s] === Character.maxDepartment(character)) {
            return false;
        } else if (character.hasMaxedDepartment() && departments[s] === (Character.ABSOLUTE_MAX_DEPARTMENT - 1)) {
            return false;
        } else {
            return true;
        }
    }

    const departments = character.departments;
    if (isUpdateable == null) {
        isUpdateable = (d, character) => { return isIncrementable(d, character.departments); };
    }

    return (<table className="selection-list">
        <tbody>
            {DepartmentsHelper.instance.getDepartments().map((d, i) => {
                const disabled = !isUpdateable(d, character);
                return (<tr key={i}>
                    <td className={"selection-header-small" + (disabled ? " text-grey" : "")}>{t(makeKey("Construct.discipline.", Department[d]))}</td>
                    <td className="d-flex align-items-center justify-content-end">
                        <div className={"me-2" + (disabled ? " text-grey" : "")}>{departments[d]}</div>
                        <CheckBox text="" value={d} isChecked={isChecked(d)}
                            onChanged={(val) => onSelectDepartment(d)}
                            disabled={disabled} />
                    </td>
                </tr>);
            })}
        </tbody>
    </table>);
}

interface IStarshipDepartmentSelectorProperties {

    starship: Starship;
    isChecked: (department: Department) => boolean;
    onSelectDepartment: (department: Department) => void;
    isUpdateable?: (department: Department, starship: Starship) => boolean;
}

export const StarshipDepartmentSelector: React.FC<IStarshipDepartmentSelectorProperties> =
    ({onSelectDepartment, isChecked, starship, isUpdateable}) => {

    const { t } = useTranslation();

    const departments = starship.departments;
    if (isUpdateable == null) {
        isUpdateable = (d, starship) => { return true; };
    }

    return (<table className="selection-list">
        <tbody>
            {DepartmentsHelper.instance.getDepartments().map((d, i) => {
                const disabled = !isUpdateable(d, starship);
                return (<tr key={i}>
                    <td className={"selection-header-small" + (disabled ? " text-grey" : "")}>{t(makeKey("Construct.discipline.", Department[d]))}</td>
                    <td className="d-flex align-items-center justify-content-end">
                        <div className={"me-2" + (disabled ? " text-grey" : "")}>{departments[d]}</div>
                        <CheckBox text="" value={d} isChecked={isChecked(d)}
                            onChanged={(val) => onSelectDepartment(d)}
                            disabled={disabled} />
                    </td>
                </tr>);
            })}
        </tbody>
    </table>);
}