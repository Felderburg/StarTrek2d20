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

    static getByType(type: PropulsionSystemType) {
        let result = this.types.filter(t => t.type === type);
        return result.length ? result[0] : undefined;
    }

    static getByTypeName(type: string) {
        let result = this.types.filter(t => PropulsionSystemType[t.type] === type);
        return result.length ? result[0] : undefined;
    }
}
