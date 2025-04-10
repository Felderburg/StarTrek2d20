import { useTranslation } from "react-i18next";
import { makeKey } from "../common/translationKey";
import { Attribute, AttributesHelper } from "../helpers/attributes"
import { CheckBox } from "./checkBox";
import { ICharacterPageProperties } from "../common/iCharacterPageProperties";
import { Character } from "../common/character";

interface ISimpleAttributeSelectorProperties extends ICharacterPageProperties {

    isChecked: (attribute: Attribute) => boolean;
    onSelectAttribute: (attribute:Attribute) => void;
    isUpdateable?: (attribute: Attribute, character: Character) => boolean;
}

export const SimpleAttributeSelector: React.FC<ISimpleAttributeSelectorProperties> = ({onSelectAttribute, isChecked, isUpdateable, character}) => {

    const { t } = useTranslation();
    if (isUpdateable == null) {
        isUpdateable = (attribute, character) => { return true; }
    }
    const attributes = character.attributes;
    return (<table className="selection-list">
        <tbody>
            {AttributesHelper.getAllAttributes().map((a, i) => {
                const disabled = !isUpdateable(a, character);
                return (<tr key={i}>
                    <td className={"selection-header-small" + (disabled ? " text-grey" : "")}>{t(makeKey("Construct.attribute.", Attribute[a]))}</td>
                    <td className="d-flex align-items-center justify-content-end">
                        <div className={"me-2" + (disabled ? " text-grey" : "")}>{attributes[a]}</div>
                        <CheckBox text="" value={a} isChecked={isChecked(a)}
                            disabled={disabled}
                            onChanged={(val) => onSelectAttribute(a)}/>
                    </td>
                </tr>);
            })}
        </tbody>
    </table>);
}