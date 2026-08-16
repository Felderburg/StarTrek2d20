import { LogValueEntry, ValueUseType } from '../../common/logEntry';
import { CheckBox } from '../../components/checkBox';
import { cyrb53 } from '../../common/cyrb53';
import ValueInputWithRandom from '../../components/valueInputWithRandomOption';
import type { Character } from '../../common/character';
import {
  DropDownElement,
  DropDownSelect,
} from '../../components/dropDownInput';

interface ILogEntryValueProperties {
  character: Character;
  value: LogValueEntry;
  selected: boolean;
  onChange: (entry?: LogValueEntry) => void;
}

export const LogEntryValueView: React.FC<ILogEntryValueProperties> = ({
  value,
  selected,
  character,
  onChange,
}) => {
  const modifySelection = () => {
    if (selected) {
      onChange(undefined);
    } else {
      onChange(value);
    }
  };

  const modifyValueUseType = (type: ValueUseType) => {
    const entry = new LogValueEntry(value.value, type, value.newValue);
    onChange(entry);
  };

  const modifyNewValue = (newValue: string) => {
    const entry = new LogValueEntry(value.value, value.useType, newValue);
    onChange(entry);
  };

  const getTypes = () => {
    return [
      new DropDownElement(ValueUseType.UsedPositively, 'Used Positively'),
      new DropDownElement(ValueUseType.UsedNegatively, 'Used Negatively'),
      new DropDownElement(ValueUseType.Challenged, 'Challenged'),
    ];
  };

  return selected ? (
    <tbody>
      <tr>
        <td>
          <CheckBox
            isChecked={selected}
            value={selected ? 'true' : 'false'}
            text={value.value}
            onChanged={() => modifySelection()}
          />
        </td>
        <td>
          <div className="d-flex justify-content-end w-100">
            <DropDownSelect
              items={getTypes()}
              defaultValue={value.useType}
              onChange={(type) => modifyValueUseType(type as ValueUseType)}
            />
          </div>
        </td>
      </tr>
      {value.useType === ValueUseType.Challenged ? (
        <tr>
          <td colSpan={2}>
            <div className="row">
              <div className="offset-md-1 col-12 col-md-6">
                <ValueInputWithRandom
                  labelName="New Value"
                  value={value.newValue}
                  character={character}
                  onValueChanged={(v) => modifyNewValue(v)}
                  id={'newValue-' + cyrb53(value.value)}
                />
              </div>
            </div>
          </td>
        </tr>
      ) : undefined}
    </tbody>
  ) : (
    <tbody>
      <tr>
        <td colSpan={2}>
          <CheckBox
            isChecked={selected}
            value={selected ? 'true' : 'false'}
            text={value.value}
            onChanged={() => modifySelection()}
          />
        </td>
      </tr>
    </tbody>
  );
};
