export enum NotableSpatialPhenomenon {
  EmberStar,
  GravittionalWavesClass1,
  GravittionalWavesClass2,
  GravittionalWavesClass3,
  IonStormClass1,
  IonStormClass2,
  IonStormClass3,
  IonStormClass4,
  NebulaClass1,
  NebulaClass2,
  NebulaClass3,
  NebulaClass4,
  NeutronStar,
  RadiationStormClass1,
  RadiationStormClass2,
  RadiationStormClass3,
  RadiationStormClass4,
  RadiationStormClass5,
  RoguePlanet,
  StellarFlareClass1,
  StellarFlareClass2,
  StellarFlareClass3,
  StellarFlareClass4,
  TTauriStar,
}

export class NotableSpatialPhenomenonModel {
  id: NotableSpatialPhenomenon;
  name: string;

  private static phenomenon = [
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.EmberStar,
      'Ember Star',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.GravittionalWavesClass1,
      'Gravitational Waves, Class 1',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.GravittionalWavesClass2,
      'Gravitational Waves, Class 2',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.GravittionalWavesClass3,
      'Gravitational Waves, Class 3',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.IonStormClass1,
      'Ion Storm, Class 1',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.IonStormClass2,
      'Ion Storm, Class 2',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.IonStormClass3,
      'Ion Storm, Class 3',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.IonStormClass4,
      'Ion Storm, Class 4',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.NebulaClass1,
      'Nebula, Class 1',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.NebulaClass2,
      'Nebula, Class 2',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.NebulaClass3,
      'Nebula, Class 3',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.NebulaClass4,
      'Nebula, Class 4',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.NeutronStar,
      'Neutron Star',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.RadiationStormClass2,
      'Radiation Storm, Class 1',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.RadiationStormClass2,
      'Radiation Storm, Class 2',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.RadiationStormClass3,
      'Radiation Storm, Class 3',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.RadiationStormClass4,
      'Radiation Storm, Class 4',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.RadiationStormClass5,
      'Radiation Storm, Class 5',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.RoguePlanet,
      'Rogue Planet',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.StellarFlareClass1,
      'Stellar Flare, Class 1',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.StellarFlareClass2,
      'Stellar Flare, Class 2',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.StellarFlareClass3,
      'Stellar Flare, Class 3',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.StellarFlareClass4,
      'Stellar Flare, Class 4',
    ),
    new NotableSpatialPhenomenonModel(
      NotableSpatialPhenomenon.TTauriStar,
      'T-Tauri Star',
    ),
  ];

  constructor(id: NotableSpatialPhenomenon, name: string) {
    this.id = id;
    this.name = name;
  }

  public static allNotableSpatialPhenomenon() {
    return NotableSpatialPhenomenonModel.phenomenon;
  }
}
