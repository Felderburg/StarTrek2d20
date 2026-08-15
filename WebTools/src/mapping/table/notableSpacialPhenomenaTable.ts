import { D20 } from '../../common/die';
import {
  NotableSpatialPhenomenon,
  NotableSpatialPhenomenonModel,
} from './notableSpacialPhenomena';
import { SpectralClass } from './spectralClass';
import { SpecialSectors } from './star';

export const notableSpatialPhenomenaTable = (
  spectralClass: SpectralClass,
  sector?: SpecialSectors,
) => {
  let roll = D20.roll();
  let result = [];
  if (sector === null) {
    switch (spectralClass) {
      case SpectralClass.G:
      case SpectralClass.K:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.StellarFlareClass1
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass1
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass1
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass2
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.StellarFlareClass1
              ],
            ];
        }
        break;
      case SpectralClass.F:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass2
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass2
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass1
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass3
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass3
              ],
            ];
        }
        break;
      case SpectralClass.A:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass1
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass3
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.GravittionalWavesClass1
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.StellarFlareClass2
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass3
              ],
            ];
        }
        break;
      case SpectralClass.B:
      case SpectralClass.O:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass4
              ],
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass4
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass3
              ],
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass3
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.GravittionalWavesClass2
              ],
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.GravittionalWavesClass3
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.StellarFlareClass4
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass4
              ],
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass4
              ],
            ];
        }
        break;
      default:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass2
              ],
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.StellarFlareClass2
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass1
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass1
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass1
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.StellarFlareClass3
              ],
            ];
        }
    }
  } else {
    switch (sector) {
      case SpecialSectors.PinwheelSector:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass1
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass2
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass1
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.GravittionalWavesClass2
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.GravittionalWavesClass3
              ],
            ];
            break;
        }
        break;
      case SpecialSectors.EnduranceDivide:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RoguePlanet
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass1
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass2
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass3
              ],
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass4
              ],
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.RadiationStormClass5
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NeutronStar
              ],
            ];
            break;
        }
        break;
      case SpecialSectors.EmberSector:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.StellarFlareClass1
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.EmberStar
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.EmberStar
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.EmberStar
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.StellarFlareClass2
              ],
            ];
            break;
        }
        break;
      case SpecialSectors.TKalNursery:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass2
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass3
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass4
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.StellarFlareClass1
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.TTauriStar
              ],
            ];
            break;
        }
        break;
      case SpecialSectors.GeneralExpanse:
      default:
        switch (roll) {
          case 1:
          case 2:
          case 3:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.GravittionalWavesClass1
              ],
            ];
            break;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass1
              ],
            ];
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.NebulaClass1
              ],
            ];
            break;
          case 14:
          case 15:
          case 16:
          case 17:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.GravittionalWavesClass2
              ],
            ];
            break;
          case 18:
          case 19:
          case 20:
            result = [
              NotableSpatialPhenomenonModel.allNotableSpatialPhenomenon()[
                NotableSpatialPhenomenon.IonStormClass2
              ],
            ];
            break;
        }
        break;
    }
  }

  return result.length === 0
    ? undefined
    : result[Math.floor(Math.random() * result.length)];
};
