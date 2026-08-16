import { useTranslation } from 'react-i18next';
import { InputFieldAndLabel } from '../../common/inputFieldAndLabel';
import {
  EquipmentHelper,
  EquipmentModel,
  EquipmentType,
} from '../../helpers/equipment';
import type { ICharacterProperties } from '../../solo/page/soloCharacterProperties';
import { useState } from 'react';
import { CheckBox } from '../../components/checkBox';
import { Button } from 'react-bootstrap';

interface IAddEquipmentViewProperties extends ICharacterProperties {
  onClose: () => void;
  addEquipment: (equipment: EquipmentType | EquipmentModel) => void;
}

export const NpcAddEquipmentView: React.FC<IAddEquipmentViewProperties> = ({
  character,
  onClose,
  addEquipment,
}) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<EquipmentType | undefined>();
  const [otherText, setOtherText] = useState<string | undefined>();

  const existingTypes = character.equipmentModels.map((e) => e.type);
  const availableTypes = EquipmentHelper.instance.items
    .filter((e) => !existingTypes.includes(e.type))
    .filter(
      (e) =>
        !(
          e.type === EquipmentType.Clothing &&
          existingTypes.includes(EquipmentType.Uniform)
        ),
    );

  const items = availableTypes.map((e) => (
    <tr key={'equipment-' + EquipmentType[e.type]}>
      <td className="align-middle">
        <CheckBox
          isChecked={selectedType === e.type}
          value={EquipmentType[e.type]}
          onChanged={() => {
            if (selectedType === e.type) {
              setSelectedType(undefined);
            } else {
              setSelectedType(e.type);
            }
          }}
        />
      </td>
      <td className="align-middle">{e.localizedName}</td>
    </tr>
  ));

  const addSelectedEquipment = () => {
    if (selectedType === undefined) {
      onClose();
    } else if (selectedType === EquipmentType.Other) {
      addEquipment(new EquipmentModel(EquipmentType.Other, otherText));
      onClose();
    } else {
      addEquipment(selectedType);
      onClose();
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <table className="table table-dark">
            <tbody>
              {items}
              <tr>
                <td className="align-bottom">
                  <CheckBox
                    isChecked={selectedType === EquipmentType.Other}
                    value={EquipmentType[EquipmentType.Other]}
                    onChanged={() => {
                      if (selectedType === EquipmentType.Other) {
                        setSelectedType(undefined);
                      } else {
                        setSelectedType(EquipmentType.Other);
                      }
                    }}
                  />
                </td>
                <td className="align-middle">
                  <InputFieldAndLabel
                    id="other"
                    labelName={t('Common.text.other')}
                    value={otherText ?? ''}
                    onChange={(v) => {
                      setSelectedType(EquipmentType.Other);
                      setOtherText(v);
                    }}
                    placeholder="Equipment type"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-4">
        <Button onClick={() => addSelectedEquipment()}>
          {t('Common.button.add')}
        </Button>
      </div>
    </>
  );
};
