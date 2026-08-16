import { Button } from 'react-bootstrap';
import type { SelectedTalent } from '../common/selectedTalent';
import type { Starship } from '../common/starship';
import { SelectedTalentDescriptionView } from './selectedTalentDescriptionView';
import { useTranslation } from 'react-i18next';
import {
  TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM,
  TALENT_NAME_CUSTOM_TALENT,
  TALENT_NAME_DEDICATED_PERSONNEL,
  TALENT_NAME_EXPANDED_MUNITIONS,
  TALENT_NAME_EXPANSIVE_DEPARTMENT,
  TALENT_NAME_MINELAYER,
  TALENT_NAME_REDUNDANT_SYSTEMS,
  TalentsHelper,
} from '../helpers/talents';
import { ModalControl } from './modal';
import { SimpleTalentSelectionList } from './simpleTalentSelectionList';
import { isMultiSelectionTalent } from '../helpers/isMultiSelectionTalent';
import { StarshipDepartmentSelector } from './simpleDepartmentSelector';
import { InputFieldAndLabel } from '../common/inputFieldAndLabel';
import { SimpleSystemSelector } from './simpleSystemSelector';
import { DropDownElement, DropDownSelect } from './dropDownInput';
import type { PropulsionSystemType } from '../helpers/propulsionSystem';
import { PropulsionSystemModel } from '../helpers/propulsionSystem';
import { Weapon } from '../helpers/weapons';
import { AddWeaponView, AddWeaponMode } from '../starship/view/addWeaponView';

interface IStarshipFreeformTalentSelectionProperties {
  starship: Starship;
  selectedTalent?: SelectedTalent;
  setSelectedTalent: (selectedTalent?: SelectedTalent) => void;
}

export const StarshipFreeformTalentSelectionView: React.FC<
  IStarshipFreeformTalentSelectionProperties
> = ({ starship, selectedTalent, setSelectedTalent }) => {
  const { t } = useTranslation();

  const showTalentSelectionModal = () => {
    const talents = TalentsHelper.getStarshipOrStationTalents(
      starship,
      true,
    ).filter(
      (t) =>
        !starship.hasTalent(t.name) ||
        t.maxRank > 1 ||
        isMultiSelectionTalent(t),
    );
    ModalControl.show(
      'xl',
      () => ModalControl.hide(),

      <div>
        <SimpleTalentSelectionList
          construct={starship}
          talents={talents}
          onSelection={(t) => setSelectedTalent(t == null ? undefined : t)}
        />
        <div className="text-center mt-4">
          <Button size="sm" onClick={() => ModalControl.hide()}>
            {t('Common.button.ok')}
          </Button>
        </div>
      </div>,
      t('ModifySupportingCharacter.talentModal.title'),
    );
  };

  const handleAdditionalTalentSelections = () => {
    if (selectedTalent?.name === TALENT_NAME_DEDICATED_PERSONNEL) {
      return (
        <div className="my-3">
          <StarshipDepartmentSelector
            starship={starship}
            isChecked={(d) => selectedTalent.department === d}
            onSelectDepartment={(d) => {
              const temp = selectedTalent?.copy();
              if (temp) {
                temp.department = d;
              }
              setSelectedTalent(temp);
            }}
          />
        </div>
      );
    } else if (selectedTalent?.name === TALENT_NAME_CUSTOM_TALENT) {
      return (
        <div className="my-3">
          <div>
            <InputFieldAndLabel
              labelName={t('Common.text.talentName')}
              id="customName"
              value={selectedTalent.customTalentName}
              onChange={(n) => {
                const temp = selectedTalent?.copy();
                if (temp) {
                  temp.customTalentName = n;
                }
                setSelectedTalent(temp);
              }}
            />
          </div>
          <div>
            <textarea
              className="w-100 mt-3"
              value={selectedTalent.customTalentDescription}
              placeholder={t('Common.text.description')}
              onChange={(e) => {
                const description = e.target.value;
                const temp = selectedTalent?.copy();
                if (temp) {
                  temp.customTalentDescription = description;
                }
                setSelectedTalent(temp);
              }}
            />
          </div>
        </div>
      );
    } else if (selectedTalent?.name === TALENT_NAME_EXPANSIVE_DEPARTMENT) {
      return (
        <div className="my-3">
          <StarshipDepartmentSelector
            starship={starship}
            isChecked={(d) => selectedTalent.department === d}
            onSelectDepartment={(d) => {
              const temp = selectedTalent?.copy();
              if (temp) {
                temp.department = d;
              }
              setSelectedTalent(temp);
            }}
            isUpdateable={(d) => starship.departments[d] === 5}
          />
        </div>
      );
    } else if (selectedTalent?.name === TALENT_NAME_REDUNDANT_SYSTEMS) {
      return (
        <div className="my-3">
          <SimpleSystemSelector
            starship={starship}
            isChecked={(d) => selectedTalent.system === d}
            onSelectSystem={(s) => {
              const temp = selectedTalent?.copy();
              if (temp) {
                temp.system = s;
              }
              setSelectedTalent(temp);
            }}
          />
        </div>
      );
    } else if (
      selectedTalent?.name === TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM
    ) {
      const getItems = () => {
        const result = [new DropDownElement('', '')];
        result.push(
          ...PropulsionSystemModel.types.map(
            (t) => new DropDownElement(t.type, t.localizedName),
          ),
        );
        return result;
      };

      return (
        <div className="my-3">
          <DropDownSelect
            items={getItems()}
            defaultValue={selectedTalent.selection as PropulsionSystemType}
            onChange={(s) => {
              const temp = selectedTalent?.copy();
              if (temp) {
                if (s === '') {
                  temp.selection = undefined;
                } else {
                  temp.selection = s as PropulsionSystemType;
                }
                setSelectedTalent(temp);
              }
            }}
          />
        </div>
      );
    } else if (
      [TALENT_NAME_EXPANDED_MUNITIONS, TALENT_NAME_MINELAYER].includes(
        selectedTalent?.name,
      )
    ) {
      let weaponName = '';
      if (selectedTalent?.weapon) {
        if (selectedTalent.weapon instanceof Weapon) {
          weaponName = selectedTalent.weapon.name;
        } else {
          weaponName = selectedTalent.weapon as string;
        }
      }

      const closeModal = () => {
        ModalControl.hide();
      };

      const showModal = () => {
        let mode =
          starship.version === 1
            ? AddWeaponMode.IncludeMines
            : AddWeaponMode.NoMines;
        if (selectedTalent.name === TALENT_NAME_MINELAYER) {
          mode = AddWeaponMode.MinesOnly;
        } else if (starship.isMineLayer) {
          mode = AddWeaponMode.IncludeMines;
        }
        ModalControl.show(
          'lg',
          () => closeModal(),
          <AddWeaponView
            onClose={() => closeModal()}
            version={starship.version}
            addWeapon={(w) => {
              const temp = selectedTalent?.copy();
              if (temp) {
                temp.weapon = w;
                setSelectedTalent(temp);
              }
            }}
            mode={mode}
          />,
          'Add Weapon',
        );
      };

      return (
        <div className="d-flex justify-content-between align-items-baseline my-3">
          <p className="mb-0">{weaponName}</p>
          <Button size="sm" onClick={() => showModal()}>
            {t('Common.button.select')}
          </Button>
        </div>
      );
    } else {
      return undefined;
    }
  };

  return (
    <>
      <div className="text-end mb-4">
        <Button size="sm" onClick={() => showTalentSelectionModal()}>
          {t('Common.text.select')}
        </Button>
      </div>
      {selectedTalent == null ? (
        <p>No talent selected.</p>
      ) : (
        <SelectedTalentDescriptionView
          talent={selectedTalent}
          version={starship.version}
        />
      )}
      {handleAdditionalTalentSelections()}
    </>
  );
};
