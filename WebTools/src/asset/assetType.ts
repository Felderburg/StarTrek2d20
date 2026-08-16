export enum AssetType {
  Ship,
  Character,
  Resource,
}

export class AssetTypeModel {
  readonly type: AssetType;
  readonly name: string;

  constructor(type: AssetType, name: string) {
    this.type = type;
    this.name = name;
  }
}

export class AssetTypes {
  private static singleton: AssetTypes;

  private readonly types: AssetTypeModel[] = [
    new AssetTypeModel(AssetType.Ship, 'Ship'),
    new AssetTypeModel(AssetType.Character, 'Character'),
    new AssetTypeModel(AssetType.Resource, 'Resource'),
  ];

  static get instance() {
    if (AssetTypes.singleton == null) {
      AssetTypes.singleton = new AssetTypes();
    }
    return AssetTypes.singleton;
  }

  public getTypes() {
    return this.types;
  }

  getTypeByTypeName(name: string) {
    const results = this.types.filter((t) => AssetType[t.type] === name);
    return results.length === 1 ? results[0] : null;
  }
}
