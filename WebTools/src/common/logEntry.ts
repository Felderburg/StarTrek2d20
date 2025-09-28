import i18next from "i18next";
import { makeKey } from "./translationKey";

export enum ValueUseType {
    UsedPositively,
    UsedNegatively,
    Challenged
}

export class ValueUseTypeModel {

    readonly type: ValueUseType;

    static get types() {
        return [
            new ValueUseTypeModel(ValueUseType.UsedPositively),
            new ValueUseTypeModel(ValueUseType.UsedNegatively),
            new ValueUseTypeModel(ValueUseType.Challenged)
        ];
    }

    constructor(type: ValueUseType) {
        this.type = type;
    }

    get name() {
        return i18next.t(makeKey('ValueUseType.', ValueUseType[this.type]));
    }

    static findTypeByTypeName(typeName: string) {
        let result = this.types.filter(t => ValueUseType[t.type] === typeName);
        return result?.length ? result[0].type : undefined;
    }
}

export class LogValueEntry {
    readonly value: string;
    readonly useType: ValueUseType;
    readonly newValue?: string;

    constructor(value: string, useType: ValueUseType = ValueUseType.UsedPositively, newValue?: string) {
        this.value = value;
        this.useType = useType;
        this.newValue = newValue;
    }
}

export class LogEntry {
    readonly id: number;
    adventureTitle?: string;
    missionDescription?: string;
    notes?: string;

    valuesUsed?: LogValueEntry[];
    directivesUsed?: string[];

    constructor(id: number) {
        this.id = id;
    }

    copy() {
        let result = new LogEntry(this.id);
        result.adventureTitle = this.adventureTitle;
        result.missionDescription = this.missionDescription;
        result.notes = this.notes;
        result.valuesUsed = this.valuesUsed?.length ? [...this.valuesUsed] : undefined;
        result.directivesUsed = this.directivesUsed?.length ? [...this.directivesUsed] : undefined;
        return result;
    }
}