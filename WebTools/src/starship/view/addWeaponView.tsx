import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { DropDownElement, DropDownInput, DropDownSelect } from "../../components/dropDownInput";
import { CaptureTypeModel, DeliverySystemModel, EnergyLoadTypeModel, MineType, MineTypeModel, TorpedoLoadTypeModel, Weapon, WeaponType, WeaponTypeModel } from "../../helpers/weapons";
import { useTranslation } from "react-i18next";

export enum AddWeaponMode {
    MinesOnly,
    NoMines,
    IncludeMines
}

interface IAddWeaponViewProperties {
    mode?: AddWeaponMode;
    serviceYear?: number;
    addWeapon: (Weapon) => void;
    onClose: () => void;
    version: number;
}

const AddWeaponView: React.FC<IAddWeaponViewProperties> = ({mode = AddWeaponMode.IncludeMines, serviceYear, addWeapon, version, onClose}) => {

    const getDeliverySystems = () => {
        if (serviceYear && version === 1) {
            return DeliverySystemModel.allTypesByYear(serviceYear);
        } else {
            return DeliverySystemModel.allTypes();
        }
    }

    const getEnergyLoadTypes = () => {
        if (serviceYear && version === 1) {
            return EnergyLoadTypeModel.allTypesByYear(serviceYear, version);
        } else {
            return EnergyLoadTypeModel.allTypes(version);
        }
    }

    const getWeaponTypes = () => {
        if (mode === AddWeaponMode.IncludeMines) {
            return WeaponTypeModel.allStarshipTypes();
        } else if (mode === AddWeaponMode.NoMines) {
            return WeaponTypeModel.allStarshipTypes().filter(t => t.type !== WeaponType.MINE);
        } else {
            return WeaponTypeModel.allStarshipTypes().filter(t => t.type === WeaponType.MINE);
        }
    }

    const { t } = useTranslation();
    const [ weaponType, setWeaponType ] = useState<WeaponTypeModel>(getWeaponTypes()[0]);
    const [ loadType, setLoadType ] = useState<EnergyLoadTypeModel|CaptureTypeModel|TorpedoLoadTypeModel|MineTypeModel>(getEnergyLoadTypes()[0]);
    const [ deliverySystem, setDeliverySystem ] = useState<DeliverySystemModel>(getDeliverySystems()[0]);

    const selectWeaponType = (type: WeaponTypeModel) => {
        let load = loadType;
        if (type.type === WeaponType.ENERGY && !(load instanceof EnergyLoadTypeModel)) {
            load = getEnergyLoadTypes()[0];
        } else if (type.type === WeaponType.TORPEDO && !(load instanceof TorpedoLoadTypeModel)) {
            load = getTorpedoLoadTypes()[0];
        } else if (type.type === WeaponType.CAPTURE && !(load instanceof CaptureTypeModel)) {
            load = getCaptureTypes()[0];
        } else if (type.type === WeaponType.MINE && !(load instanceof MineTypeModel)) {
            load = getMineTypes()[0];
        }

        setWeaponType(type);
        setLoadType(load);
    }

    const selectLoadType = (type: EnergyLoadTypeModel|CaptureTypeModel|TorpedoLoadTypeModel|MineTypeModel) => {
        setLoadType(type);
    }

    const selectDeliverySystem = (system: DeliverySystemModel) => {
        setDeliverySystem(system);
    }

    const getTorpedoLoadTypes = () => {
        if (serviceYear && version === 1) {
            return TorpedoLoadTypeModel.allTypesByYear(serviceYear, version);
        } else {
            return TorpedoLoadTypeModel.allTypes(version);
        }
    }

    const getMineTypes = () => {
        if (serviceYear && version === 1) {
            return MineTypeModel.allTypesByYear(serviceYear);
        } else if (mode !== AddWeaponMode.NoMines) {
            return MineTypeModel.allTypes();
        } else {
            return [];
        }
    }

    const getMineTypeById = (type: MineType) => {
        let types = MineTypeModel.allTypes().filter(t => t.type === type);
        return types?.length ? types[0] : null;
    }

    const getCaptureTypes = () => {
        return CaptureTypeModel.allTypes();
    }

    const addWeaponFunction = () => {
        if (weaponType.type === WeaponType.ENERGY) {
            let weapon = Weapon.createStarshipWeapon('', weaponType.type, loadType, deliverySystem);
            addWeapon(weapon);
        } else {
            let weapon = Weapon.createStarshipWeapon('', weaponType.type, loadType);
            addWeapon(weapon);
        }
        onClose();
    }

    let load = undefined;
    if (weaponType?.type === WeaponType.ENERGY) {
        load = (<div className="mt-4">
            <p>What kind of energy does the beam weapon discharge?</p>
            <DropDownInput
                items={ getEnergyLoadTypes().map(t => t.description) }
                defaultValue={ loadType.description }
                onChange={(index) => selectLoadType(getEnergyLoadTypes()[index] ) }/>
        </div>);
    } else if (weaponType?.type === WeaponType.TORPEDO) {
        load = (<div className="mt-4">
            <p>What type of charge does the torpedo carry?</p>
            <DropDownInput
                items={ getTorpedoLoadTypes().map(t => t.description) }
                defaultValue={ loadType.description }
                onChange={(index) => selectLoadType(getTorpedoLoadTypes()[index] ) }/>
        </div>);
    } else if (weaponType?.type === WeaponType.CAPTURE) {
        load = (<div className="mt-4">
            <p>What type of technology is used to capture/ensnare other vessels?</p>
            <DropDownInput
                items={ getCaptureTypes().map(t => t.description) }
                defaultValue={ loadType.description }
                onChange={(index) => selectLoadType(getCaptureTypes()[index] ) }/>
        </div>);
    } else if (weaponType?.type === WeaponType.MINE) {
        load = (<div className="mt-4">
            <p>What type of technology is used as the mine's load?</p>
            <DropDownSelect
                items={ getMineTypes().map(t => new DropDownElement(t.type, t.description)) }
                defaultValue={ loadType.type }
                onChange={(type) => selectLoadType(getMineTypeById(type as MineType) ) }/>
        </div>);
    }

    let deliveryType = undefined;
    if (weaponType != null && weaponType.type === WeaponType.ENERGY) {
        deliveryType = (<div className="mt-4">
            <p>What kind of delivery system is used for this energy weapon?</p>
            <DropDownInput
                items={ getDeliverySystems().map(t => t.description) }
                defaultValue={ deliverySystem.description }
                onChange={(index) => selectDeliverySystem(getDeliverySystems()[index] ) }/>
        </div>);
    }

    return (<div>
        <p>What kind of weapon is this?</p>
        <DropDownInput
            items={ getWeaponTypes().map((t, i) => t.description) }
            defaultValue={ weaponType.description }
            onChange={(index) => selectWeaponType(WeaponTypeModel.allStarshipTypes()[index] ) }/>
        {load}
        {deliveryType}
        <div className="text-center mt-4">
            <Button onClick={() => addWeaponFunction()}>{t('Common.button.add')}</Button>
        </div>
    </div>);
}

export default AddWeaponView;