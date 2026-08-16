import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  DropDownElement,
  DropDownSelect,
} from '../../components/dropDownInput';
import type {
  CaptureType,
  DeliverySystem,
  EnergyLoadType,
  MineType,
  TorpedoLoadType,
} from '../../helpers/weapons';
import {
  CaptureTypeModel,
  DeliverySystemModel,
  EnergyLoadTypeModel,
  MineTypeModel,
  TorpedoLoadTypeModel,
  Weapon,
  WeaponType,
  WeaponTypeModel,
} from '../../helpers/weapons';
import { useTranslation } from 'react-i18next';

export enum AddWeaponMode {
  MinesOnly,
  NoMines,
  IncludeMines,
}

interface IAddWeaponViewProperties {
  mode?: AddWeaponMode;
  serviceYear?: number;
  addWeapon: (Weapon) => void;
  onClose: () => void;
  version: number;
}

export const AddWeaponView: React.FC<IAddWeaponViewProperties> = ({
  mode = AddWeaponMode.IncludeMines,
  serviceYear,
  addWeapon,
  version,
  onClose,
}) => {
  const getDeliverySystems = () => {
    if (serviceYear && version === 1) {
      return DeliverySystemModel.allTypesByYear(serviceYear);
    } else {
      return DeliverySystemModel.allTypes();
    }
  };

  const getEnergyLoadTypes = () => {
    if (serviceYear && version === 1) {
      return EnergyLoadTypeModel.allTypesByYear(serviceYear, version);
    } else {
      return EnergyLoadTypeModel.allTypes(version);
    }
  };

  const getWeaponTypes = () => {
    if (mode === AddWeaponMode.IncludeMines) {
      return WeaponTypeModel.allStarshipTypes();
    } else if (mode === AddWeaponMode.NoMines) {
      return WeaponTypeModel.allStarshipTypes().filter(
        (t) => t.type !== WeaponType.MINE,
      );
    } else {
      return WeaponTypeModel.allStarshipTypes().filter(
        (t) => t.type === WeaponType.MINE,
      );
    }
  };

  const getMineTypes = () => {
    if (serviceYear && version === 1) {
      return MineTypeModel.allTypesByYear(version, serviceYear);
    } else if (mode !== AddWeaponMode.NoMines) {
      return MineTypeModel.allTypes(version);
    } else {
      return [];
    }
  };

  const getTorpedoLoadTypes = () => {
    if (serviceYear && version === 1) {
      return TorpedoLoadTypeModel.allTypesByYear(serviceYear, version);
    } else {
      return TorpedoLoadTypeModel.allTypes(version);
    }
  };

  const getCaptureTypes = () => {
    return CaptureTypeModel.allTypes();
  };

  const chooseInitialLoadType = (weaponType: WeaponType) => {
    if (weaponType === WeaponType.ENERGY) {
      return getEnergyLoadTypes()[0];
    } else if (weaponType === WeaponType.TORPEDO) {
      return getTorpedoLoadTypes()[0];
    } else if (weaponType === WeaponType.CAPTURE) {
      return getCaptureTypes()[0];
    } else if (weaponType === WeaponType.MINE) {
      return getMineTypes()[0];
    } else {
      return undefined;
    }
  };

  const { t } = useTranslation();
  const [weaponType, setWeaponType] = useState<WeaponTypeModel>(
    getWeaponTypes()[0],
  );
  const [loadType, setLoadType] = useState<
    | EnergyLoadTypeModel
    | CaptureTypeModel
    | TorpedoLoadTypeModel
    | MineTypeModel
  >(chooseInitialLoadType(getWeaponTypes()[0].type));
  const [deliverySystem, setDeliverySystem] = useState<DeliverySystemModel>(
    getDeliverySystems()[0],
  );

  const selectWeaponType = (type?: WeaponType) => {
    let load = loadType;
    if (type === WeaponType.ENERGY && !(load instanceof EnergyLoadTypeModel)) {
      load = getEnergyLoadTypes()[0];
    } else if (
      type === WeaponType.TORPEDO &&
      !(load instanceof TorpedoLoadTypeModel)
    ) {
      load = getTorpedoLoadTypes()[0];
    } else if (
      type === WeaponType.CAPTURE &&
      !(load instanceof CaptureTypeModel)
    ) {
      load = getCaptureTypes()[0];
    } else if (type === WeaponType.MINE && !(load instanceof MineTypeModel)) {
      load = getMineTypes()[0];
    }

    setWeaponType(WeaponTypeModel.getWeaponTypeModelByType(type));
    setLoadType(load);
  };

  const selectLoadType = (
    type:
      | EnergyLoadTypeModel
      | CaptureTypeModel
      | TorpedoLoadTypeModel
      | MineTypeModel,
  ) => {
    setLoadType(type);
  };

  const selectDeliverySystem = (system: DeliverySystemModel) => {
    setDeliverySystem(system);
  };

  const addWeaponFunction = () => {
    if (weaponType.type === WeaponType.ENERGY) {
      const weapon = Weapon.createStarshipWeapon(
        '',
        weaponType.type,
        loadType,
        deliverySystem,
      );
      addWeapon(weapon);
    } else {
      const weapon = Weapon.createStarshipWeapon('', weaponType.type, loadType);
      addWeapon(weapon);
    }
    onClose();
  };

  let load = undefined;
  if (weaponType?.type === WeaponType.ENERGY) {
    load = (
      <div className="mt-4">
        <p>What kind of energy does the beam weapon discharge?</p>
        <DropDownSelect
          items={getEnergyLoadTypes().map(
            (t) => new DropDownElement(t.type, t.description),
          )}
          defaultValue={loadType?.type}
          onChange={(index) =>
            selectLoadType(
              EnergyLoadTypeModel.getEnergyLoadTypeModelByType(
                index as EnergyLoadType,
                version,
              ),
            )
          }
        />
      </div>
    );
  } else if (weaponType?.type === WeaponType.TORPEDO) {
    load = (
      <div className="mt-4">
        <p>What type of charge does the torpedo carry?</p>
        <DropDownSelect
          items={getTorpedoLoadTypes().map(
            (t) => new DropDownElement(t.type, t.description),
          )}
          defaultValue={loadType?.type}
          onChange={(index) =>
            selectLoadType(
              TorpedoLoadTypeModel.getTorpedoLoadTypeModelByType(
                index as TorpedoLoadType,
                version,
              ),
            )
          }
        />
      </div>
    );
  } else if (weaponType?.type === WeaponType.CAPTURE) {
    load = (
      <div className="mt-4">
        <p>What type of technology is used to capture/ensnare other vessels?</p>
        <DropDownSelect
          items={getCaptureTypes().map(
            (t) => new DropDownElement(t.type, t.description),
          )}
          defaultValue={loadType?.type}
          onChange={(index) =>
            selectLoadType(
              CaptureTypeModel.getCaptureTypeModelByType(index as CaptureType),
            )
          }
        />
      </div>
    );
  } else if (weaponType?.type === WeaponType.MINE) {
    load = (
      <div className="mt-4">
        <p>What type of technology is used as the mine's load?</p>
        <DropDownSelect
          items={getMineTypes().map(
            (t) => new DropDownElement(t.type, t.description),
          )}
          defaultValue={loadType?.type}
          onChange={(type) =>
            selectLoadType(
              MineTypeModel.getMineTypeById(type as MineType, version),
            )
          }
        />
      </div>
    );
  }

  let deliveryType = undefined;
  if (weaponType != null && weaponType.type === WeaponType.ENERGY) {
    deliveryType = (
      <div className="mt-4">
        <p>What kind of delivery system is used for this energy weapon?</p>
        <DropDownSelect
          items={getDeliverySystems().map(
            (t) => new DropDownElement(t.type, t.description),
          )}
          defaultValue={deliverySystem?.type}
          onChange={(index) =>
            selectDeliverySystem(
              getDeliverySystems().filter(
                (d) => d.type === (index as DeliverySystem),
              )[0],
            )
          }
        />
      </div>
    );
  }

  return (
    <div>
      <p>What kind of weapon is this?</p>
      <DropDownSelect
        items={getWeaponTypes().map(
          (t, i) => new DropDownElement(t.type, t.description),
        )}
        defaultValue={weaponType.type}
        onChange={(index) =>
          selectWeaponType(index === '' ? undefined : (index as WeaponType))
        }
      />
      {load}
      {deliveryType}
      <div className="text-center mt-4">
        <Button onClick={() => addWeaponFunction()}>
          {t('Common.button.add')}
        </Button>
      </div>
    </div>
  );
};
