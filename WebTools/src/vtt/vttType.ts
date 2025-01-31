
export enum VttType {
    FantasyGrounds, Foundry, Roll20
}


export class VttTypeModel {

    readonly type: VttType;
    readonly name: string;

    constructor(type: VttType, name: string) {
        this.type = type;
        this.name = name;
    }
}


export class VttTypes {
    private static _instance: VttTypes;

    private readonly types: VttTypeModel[] = [
        new VttTypeModel(VttType.FantasyGrounds, "Fantasy Grounds"),
        new VttTypeModel(VttType.Foundry, "Foundry VTT"),
        new VttTypeModel(VttType.Roll20, "Roll20")
    ];

    static get instance() {
        if (VttTypes._instance == null) {
            VttTypes._instance = new VttTypes();
        }
        return VttTypes._instance;
    }

    public getTypes() {
        return this.types;
    }

    getTypeByTypeName(name: string) {
        let results = this.types.filter(t => VttType[t.type] === name);
        return results.length === 1 ? results[0] : null;
    }
}