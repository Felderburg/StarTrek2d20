import { Character } from '../common/character';
import { Department } from '../helpers/department';
import { randomUniqueValue } from '../solo/table/valueRandomTable';
import ValueInput from './valueInput';

export interface IValueInputWithRandom {
  value?: string;
  id?: string;
  textDescription?: string;
  onValueChanged: (string) => void;
  character: Character;
  department?: Department;
  labelName?: string;
}

const ValueInputWithRandom: React.FC<IValueInputWithRandom> = ({
  textDescription,
  id,
  value,
  onValueChanged,
  character,
  department,
  labelName,
}) => {
  const randomValue = () => {
    const value = randomUniqueValue(
      character.values,
      character.speciesStep?.species,
      department,
    );
    onValueChanged(value);
  };

  return (
    <ValueInput
      value={value}
      id={id ?? 'value'}
      labelName={labelName}
      textDescription={textDescription ?? ''}
      onRandomClicked={randomValue}
      onValueChanged={onValueChanged}
    />
  );
};

export default ValueInputWithRandom;
