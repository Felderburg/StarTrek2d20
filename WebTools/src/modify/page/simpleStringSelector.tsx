import React from "react";
import { CheckBox } from "../../components/checkBox";

interface ISimpleStringSelectorProperties {

    values: string[];
    isChecked: (s: string) => boolean;
    onSelect: (s: string) => void;
}

export const SimpleStringSelector: React.FC<ISimpleStringSelectorProperties> =
    ({onSelect, values, isChecked}) => {

    return (<table className="selection-list">
        <tbody>
            {values.map((s, i) => {
                return (<tr key={i}>
                    <td className="selection-header-small">{s}</td>
                    <td className="text-end">
                        <CheckBox text="" value={s} isChecked={isChecked(s)}
                            onChanged={(val) => onSelect(s)} />
                    </td>
                </tr>);
            })}
        </tbody>
    </table>);
}