import { Character } from "../common/character";
import { Department } from "../helpers/department";
import { ValueRandomTable } from "../solo/table/valueRandomTable";
import ValueInput from "./valueInput";

export interface IValueInputWithRandom {
    value?: string;
    id?: string;
    textDescription?: string;
    onValueChanged: (string) => void;
    character: Character;
    department?: Department;
    labelName?: string;
}


const ValueInputWithRandom: React.FC<IValueInputWithRandom> = ({textDescription, id, value, onValueChanged, character, department, labelName}) => {

    const randomValue = () => {
        let done = false;
        while (!done) {
            let value = ValueRandomTable(character.speciesStep?.species, department);
            if (!character.values.includes(value)) {
                onValueChanged(value);
                done = true;
            }
        }
    }

    return (<ValueInput value={value} id={id ?? "value"}
        labelName={labelName}
        textDescription={textDescription ?? ""}
        onRandomClicked={randomValue}
        onValueChanged={onValueChanged}
    />);
}

export default ValueInputWithRandom;
