import i18next from "i18next";
import { makeKey } from "../common/translationKey";

export enum PropulsionSystemType {

    DisplacementActivatedSporeHubDrive,
    ProtostarDrive,
    QuantumSlipstreamDrive,
    Transwarp
}

export class PropulsionSystemModel {
    readonly type: PropulsionSystemType;

    constructor(type: PropulsionSystemType) {
        this.type = type;
    }

    get localizedName() {
        let key = makeKey("PropulsionSystemType.", PropulsionSystemType[this.type]);
        return i18next.t(key);
    }
    static readonly types = [
        new PropulsionSystemModel(PropulsionSystemType.DisplacementActivatedSporeHubDrive),
        new PropulsionSystemModel(PropulsionSystemType.ProtostarDrive),
        new PropulsionSystemModel(PropulsionSystemType.QuantumSlipstreamDrive),
        new PropulsionSystemModel(PropulsionSystemType.Transwarp)
    ];
}
