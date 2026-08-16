import i18n from 'i18next';
import { makeKey } from '../common/translationKey';
import { isSecondEdition } from '../state/contextFunctions';
import { Era } from './erasEnum';

export class EraModel {
  id: Era;
  private name: string;

  constructor(id: Era, name: string) {
    this.id = id;
    this.name = name;
  }

  get localizedName() {
    return i18n.t(makeKey('Era.name.', Era[this.id]));
  }
}

export const eraDefaultYear = (era: Era) => {
  switch (era) {
    case Era.Enterprise:
      return 2155;
    case Era.OriginalSeries:
      return 2269;
    case Era.NextGeneration:
      return 2371;
    case Era.PicardProdigy:
      return 2400;
    case Era.Discovery32:
      return 3190;
    default:
      break;
  }
};

export class Eras {
  private static singleton: Eras;

  static get instance() {
    if (Eras.singleton == null) {
      Eras.singleton = new Eras();
    }
    return Eras.singleton;
  }

  private eras: { [id: number]: EraModel } = {
    [Era.Enterprise]: new EraModel(
      Era.Enterprise,
      'Enterprise (mid-22nd century)',
    ),
    [Era.OriginalSeries]: new EraModel(
      Era.OriginalSeries,
      'Original Series (mid-23rd century)',
    ),
    [Era.NextGeneration]: new EraModel(
      Era.NextGeneration,
      'Next Generation (mid-24th century)',
    ),
    [Era.PicardProdigy]: new EraModel(
      Era.PicardProdigy,
      'Picard/Prodigy (late 24th, early 25th century)',
    ),
    [Era.Discovery32]: new EraModel(
      Era.Discovery32,
      'Discovery (32nd century)',
    ),
  };

  getBasicEras() {
    if (isSecondEdition()) {
      return [
        this.eras[Era.Enterprise],
        this.eras[Era.OriginalSeries],
        this.eras[Era.NextGeneration],
        this.eras[Era.Discovery32],
      ];
    } else {
      return [
        this.eras[Era.Enterprise],
        this.eras[Era.OriginalSeries],
        this.eras[Era.NextGeneration],
      ];
    }
  }

  getEras() {
    const eras: EraModel[] = [];
    for (const era in this.eras) {
      const er = this.eras[era];
      eras.push(er);
    }

    return eras;
  }

  getEra(era: Era) {
    return this.eras[era];
  }
  getEraByName(name: string): Era | null {
    const results = Object.keys(this.eras)
      .map((e) => this.eras[e].id)
      .filter((e) => Era[e] === name);
    if (results.length === 1) {
      return results[0];
    } else {
      return null;
    }
  }
}
