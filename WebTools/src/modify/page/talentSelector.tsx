import type { SelectedTalent } from '../../common/selectedTalent';
import { CheckBox } from '../../components/checkBox';

interface ITalentSelectorProperties {
  values: SelectedTalent[];
  isChecked: (t: SelectedTalent, i: number) => boolean;
  onSelect: (t: SelectedTalent, i: number) => void;
}

export const TalentSelector: React.FC<ITalentSelectorProperties> = ({
  onSelect,
  values,
  isChecked,
}) => {
  return (
    <table className="selection-list">
      <tbody>
        {values.map((s, i) => {
          return (
            <tr key={i}>
              <td className="selection-header-small">{s.displayName}</td>
              <td className="text-end">
                <CheckBox
                  text=""
                  value={s}
                  isChecked={isChecked(s, i)}
                  onChanged={(val) => onSelect(s, i)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
