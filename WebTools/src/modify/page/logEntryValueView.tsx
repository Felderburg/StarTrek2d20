import { useState } from "react";
import { LogValueEntry } from "../../common/logEntry";
import { useTranslation } from "react-i18next";
import { CheckBox } from "../../components/checkBox";


interface ILogEntryValueProperties {
    value: LogValueEntry;
    selected: boolean;
    onChange: (entry?: LogValueEntry) => void;
}

export const LogEntryValueView: React.FC<ILogEntryValueProperties> = ({ value, selected, onChange }) => {
    const { t } = useTranslation();

    const modifySelection = () => {
        if (selected) {
            onChange(undefined);
        } else {
            onChange(value);
        }
    }

    return (<tbody>
        <tr>
            <td>
                <CheckBox isChecked={selected} value={selected ? "true" : "false"} text={value.value}
                    onChanged={() => modifySelection() }/>
            </td>
        </tr>
    </tbody>
    );
}