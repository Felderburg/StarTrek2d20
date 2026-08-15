import i18next from 'i18next';
import { StationFrameAppearance } from './stationFrame';
import { makeKey } from '../common/translationKey';

export class StationFrameAppearanceModel {
  id: StationFrameAppearance;

  constructor(id: StationFrameAppearance) {
    this.id = id;
  }

  get localizedName() {
    return i18next.t(
      makeKey('StationFrameAppearance.', StationFrameAppearance[this.id]),
    );
  }

  static from(id: StationFrameAppearance) {
    return new StationFrameAppearanceModel(id);
  }

  static getAllAppearanceModels() {
    const allAppearances = Object.keys(StationFrameAppearance)
      .filter((item) => {
        return !isNaN(Number(item));
      })
      .map((item) => Number(item));
    return allAppearances.map((a) => StationFrameAppearanceModel.from(a));
  }
}
