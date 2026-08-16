import { useTranslation } from 'react-i18next';
import type { ICharacterProperties } from '../../solo/page/soloCharacterProperties';
import { useEffect, useState } from 'react';
import { CheckBox } from '../../components/checkBox';
import { Button } from 'react-bootstrap';
import { PersonalWeapons, PersonalWeaponType } from '../../helpers/weapons';

interface IAddWeaponViewProperties extends ICharacterProperties {
  onClose: () => void;
  addWeapon: (weapon: PersonalWeaponType) => void;
}

export const NpcAddWeaponView: React.FC<IAddWeaponViewProperties> = ({
  character,
  onClose,
  addWeapon,
}) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<
    PersonalWeaponType | undefined
  >(undefined);

  const existingTypes = character
    .determineWeapons()
    .map((e) => e.personalWeaponType)
    .filter((e) => e != null);

  useEffect(() => {
    if (existingTypes.includes(selectedType)) {
      setSelectedType(undefined);
    }
  }, [existingTypes, selectedType]);

  const items = PersonalWeapons.instance(character.version)
    .allTypes()
    .filter((t) => !existingTypes.includes(t))
    .map((t) => PersonalWeapons.instance(character.version).getWeaponByType(t))
    .filter((w) => w != null)
    .map((w) => (
      <tr key={'weapon-' + PersonalWeaponType[w.personalWeaponType]}>
        <td className="align-middle">
          <CheckBox
            isChecked={selectedType === w.personalWeaponType}
            value={PersonalWeaponType[w.personalWeaponType]}
            onChanged={() => {
              if (selectedType === w.personalWeaponType) {
                setSelectedType(undefined);
              } else {
                setSelectedType(w.personalWeaponType);
              }
            }}
            text={w.name}
          />
        </td>
      </tr>
    ));

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <table className="table table-dark">
            <tbody>{items}</tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-4">
        <Button
          onClick={() => {
            addWeapon(selectedType);
            onClose();
          }}
        >
          {t('Common.button.add')}
        </Button>
      </div>
    </>
  );
};
