import { useTranslation } from 'react-i18next';
import { makeKey } from '../common/translationKey';
import { allSystems, System } from '../helpers/systems';
import { CheckBox } from './checkBox';
import { Starship } from '../common/starship';

interface ISimpleSystemSelectorProperties {
  starship: Starship;
  isChecked: (attribute: System) => boolean;
  onSelectSystem: (attribute: System) => void;
  isUpdateable?: (attribute: System, starship: Starship) => boolean;
}

export const SimpleSystemSelector: React.FC<
  ISimpleSystemSelectorProperties
> = ({ onSelectSystem, isChecked, isUpdateable, starship }) => {
  const { t } = useTranslation();
  if (isUpdateable == null) {
    isUpdateable = (attribute, character) => {
      return true;
    };
  }
  const systems = starship.systems;
  return (
    <table className="selection-list">
      <tbody>
        {allSystems().map((s, i) => {
          const disabled = !isUpdateable(s, starship);
          return (
            <tr key={i}>
              <td
                className={
                  'selection-header-small' + (disabled ? ' text-grey' : '')
                }
              >
                {t(makeKey('Construct.system.', System[s]))}
              </td>
              <td className="d-flex align-items-center justify-content-end">
                <div className={'me-2' + (disabled ? ' text-grey' : '')}>
                  {systems[s]}
                </div>
                <CheckBox
                  text=""
                  value={s}
                  isChecked={isChecked(s)}
                  disabled={disabled}
                  onChanged={(val) => onSelectSystem(s)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
