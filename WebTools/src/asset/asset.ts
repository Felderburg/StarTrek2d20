import { Rank } from "../helpers/ranks";
import { Spaceframe } from "../helpers/spaceframeEnum";
import { AssetType } from "./assetType";

export class AssetAbility {
    readonly title: string;
    readonly description: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}

export class AssetStat {
    readonly base?: number;
    readonly critical?: number;

    constructor(base?: number, critical?: number) {
        this.base = base;
        this.critical = critical;
    }

    get asString() {
        if (this.base == null || this.critical == null) {
            return "-";
        } else {
            return this.base + "/" + this.critical;
        }
    }
}

export class Asset {
    readonly type: AssetType;
    readonly name: string;
    readonly additionalInformation?: Spaceframe|Rank;
    readonly stats: AssetStat[];
    readonly specialAbility?: AssetAbility;

    constructor(type: AssetType, name: string, stats: AssetStat[], additionalInformation?: Spaceframe|Rank, specialAbility?: AssetAbility) {
        this.type = type;
        this.name = name;
        this.stats = stats;
        this.additionalInformation = additionalInformation;
        this.specialAbility = specialAbility;
    }
}