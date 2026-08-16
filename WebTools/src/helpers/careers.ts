import { TalentsHelper } from './talents';
import { Character } from '../common/character';
import { CharacterType } from '../common/characterType';
import { Career } from './careerEnum';
import i18next from 'i18next';
import { makeKey } from '../common/translationKey';
import { Stereotype } from '../common/construct';
import { TalentModel } from './talentModel';
import { isKlingonWarriorType } from './klingonWarrior';

export class CareerModel {
  readonly id: Career;
  private key: string;
  private name: string;
  readonly talent?: TalentModel;

  constructor(id: Career, key: string, name: string, talent?: TalentModel) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.talent = talent;
  }

  get localizedName() {
    return i18next.t(
      makeKey('CareerType.' + this.key + '.', Career[this.id], '.name'),
    );
  }

  get localizedDescription() {
    return i18next.t(
      makeKey('CareerType.' + this.key + '.', Career[this.id], '.description'),
    );
  }

  get localizedValueDescription() {
    return i18next.t(
      makeKey(
        'CareerType.' + this.key + '.',
        Career[this.id],
        '.valueInstruction',
      ),
    );
  }
}

export class CareersHelper {
  private static singleton: CareersHelper;

  static get instance() {
    if (CareersHelper.singleton == null) {
      CareersHelper.singleton = new CareersHelper();
    }
    return CareersHelper.singleton;
  }

  private careers: CareerModel[] = [
    new CareerModel(
      Career.Young,
      'core',
      'Young Officer',
      TalentsHelper.getTalent('Untapped Potential'),
    ),
    new CareerModel(Career.Experienced, 'core', 'Experienced Officer'),
    new CareerModel(
      Career.Veteran,
      'core',
      'Veteran Officer',
      TalentsHelper.getTalent('Veteran'),
    ),
  ];

  private civilianCareers: CareerModel[] = [
    new CareerModel(
      Career.Young,
      'civilian',
      'Young',
      TalentsHelper.getTalent('Untapped Potential'),
    ),
    new CareerModel(Career.Experienced, 'civilian', 'Experienced'),
    new CareerModel(
      Career.Veteran,
      'civilian',
      'Veteran',
      TalentsHelper.getTalent('Veteran'),
    ),
  ];

  private klingonCareers: CareerModel[] = [
    new CareerModel(
      Career.Young,
      'klingon',
      'Young Warrior',
      TalentsHelper.getTalent('Untapped Potential'),
    ),
    new CareerModel(Career.Experienced, 'klingon', 'Experienced Warrior'),
    new CareerModel(
      Career.Veteran,
      'klingon',
      'Veteran Warrior',
      TalentsHelper.getTalent('Veteran'),
    ),
  ];

  private soloCareerLengths: CareerModel[] = [
    new CareerModel(
      Career.Young,
      'solo',
      'Novice',
      TalentsHelper.getTalent('Untapped Potential'),
    ),
    new CareerModel(Career.Experienced, 'solo', 'Experienced'),
    new CareerModel(
      Career.Veteran,
      'solo',
      'Veteran',
      TalentsHelper.getTalent('Veteran'),
    ),
  ];

  private getBaseList(type: CharacterType) {
    if (isKlingonWarriorType(type)) {
      return this.klingonCareers;
    } else if (type === CharacterType.Starfleet) {
      return this.careers;
    } else {
      return this.civilianCareers; // also allied military
    }
  }

  private getList(type: CharacterType) {
    return this.getBaseList(type);
  }

  getCareers(character: Character) {
    if (
      character.stereotype === Stereotype.SoloCharacter ||
      character.version > 1
    ) {
      return this.getSoloCareerLengths();
    } else {
      const careers: CareerModel[] = [];
      const list = this.getList(character.type);
      for (const career of list) {
        careers.push(career);
      }

      return careers;
    }
  }

  getSoloCareerLength(careerLength: Career) {
    const result = this.soloCareerLengths.filter((c) => c.id === careerLength);
    return result ? result[0] : undefined;
  }

  getSoloCareerLengths() {
    return this.soloCareerLengths;
  }

  getCareer(career: Career, c: Character) {
    if (c.stereotype === Stereotype.SoloCharacter || c.version > 1) {
      return this.getSoloCareerLength(career);
    } else {
      const list = this.getBaseList(c.type);
      return list[career];
    }
  }

  getCareerByType(
    career: Career,
    stereotype: Stereotype = Stereotype.MainCharacter,
    version: number = 2,
  ) {
    if (stereotype === Stereotype.SoloCharacter || version > 1) {
      return this.getSoloCareerLength(career);
    } else {
      const list = this.getBaseList(CharacterType.Civilian);
      return list[career];
    }
  }

  getCareerByTypeName(
    typeName: string,
    type: CharacterType,
    version: number = 1,
  ) {
    const list =
      version === 1 ? this.getBaseList(type) : this.soloCareerLengths;
    const filtered = list.filter((c) => Career[c.id] === typeName);
    return filtered.length === 0 ? undefined : filtered[0];
  }
}
