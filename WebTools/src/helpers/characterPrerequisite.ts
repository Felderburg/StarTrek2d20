import type { Character } from '../common/character';
import { CharacterType } from '../common/characterType';
import { store } from '../state/store';
import type { Career } from './careerEnum';
import type { Era } from './erasEnum';
import type { Role } from './roles';
import type { Source } from './sources';

export interface ICharacterPrerequisite {
  isPrerequisiteFulfilled(character: Character): boolean;
}

export class OfficerCharacterPrerequisite implements ICharacterPrerequisite {
  isPrerequisiteFulfilled(character: Character) {
    return !character.enlisted && !character.isCivilian();
  }
}

export class KlingonCharacterPrerequisite implements ICharacterPrerequisite {
  isPrerequisiteFulfilled(character: Character) {
    return character.isKlingonWarrior();
  }
}

export class CareersCharacterPrerequisite implements ICharacterPrerequisite {
  private careers: Career[];

  constructor(...careers: Career[]) {
    this.careers = careers;
  }

  isPrerequisiteFulfilled(character: Character) {
    return (
      character.careerStep?.career != null &&
      this.careers.indexOf(character.careerStep?.career) > -1
    );
  }
}

export class NotRolesCharacterPrerequisite implements ICharacterPrerequisite {
  private roles: Role[];

  constructor(roles: Role[]) {
    this.roles = roles;
  }

  isPrerequisiteFulfilled(character: Character) {
    return (
      character.role == null ||
      (this.roles.indexOf(character.role) < 0 &&
        (character.secondaryRole == null ||
          this.roles.indexOf(character.secondaryRole) < 0))
    );
  }
}

export class CharacterTypePrerequisite implements ICharacterPrerequisite {
  private types: CharacterType[];

  constructor(...type: CharacterType[]) {
    this.types = type;
  }

  isPrerequisiteFulfilled(character: Character) {
    return this.types.indexOf(character.type) >= 0;
  }
}

export class NotCharacterPrerequisite implements ICharacterPrerequisite {
  private prereq: ICharacterPrerequisite;

  constructor(prereq: ICharacterPrerequisite) {
    this.prereq = prereq;
  }
  isPrerequisiteFulfilled(character: Character): boolean {
    return !this.prereq.isPrerequisiteFulfilled(character);
  }
  describe(): string {
    return '';
  }
}

export class AllOfCharacterPrerequisite implements ICharacterPrerequisite {
  private prequisites: ICharacterPrerequisite[];

  constructor(...prequisites: ICharacterPrerequisite[]) {
    this.prequisites = prequisites;
  }

  isPrerequisiteFulfilled(character: Character) {
    if (this.prequisites.length === 0) {
      return true;
    } else {
      let result = true;
      this.prequisites.forEach((req) => {
        result = result && req.isPrerequisiteFulfilled(character);
      });
      return result;
    }
  }
}

export class AnyOfCharacterPrerequisite implements ICharacterPrerequisite {
  private prequisites: ICharacterPrerequisite[];

  constructor(...prequisites: ICharacterPrerequisite[]) {
    this.prequisites = prequisites;
  }

  isPrerequisiteFulfilled(character: Character) {
    if (this.prequisites.length === 0) {
      return true;
    } else {
      let result = false;
      this.prequisites.forEach((req) => {
        result = result || req.isPrerequisiteFulfilled(character);
      });
      return result;
    }
  }
}

export class EnlistedCharacterPrerequisite implements ICharacterPrerequisite {
  isPrerequisiteFulfilled(character: Character) {
    return character.enlisted;
  }
}

export class SourceCharacterPrerequisite implements ICharacterPrerequisite {
  private sources: Source[];

  constructor(...sources: Source[]) {
    this.sources = sources;
  }

  isPrerequisiteFulfilled(c: Character) {
    let result = false;
    this.sources.forEach((s) => {
      result = result || store.getState().context.sources.indexOf(s) >= 0;
    });
    return result;
  }

  getSources() {
    return this.sources;
  }
}

export class AnyEraCharacterPrerequisite implements ICharacterPrerequisite {
  private eras: Era[];

  constructor(...era: Era[]) {
    this.eras = era;
  }

  isPrerequisiteFulfilled(construct: Character) {
    return this.eras.indexOf(construct.era) >= 0;
  }
}

export class CadetPrerequisite implements ICharacterPrerequisite {
  isPrerequisiteFulfilled(character: Character): boolean {
    return character.type === CharacterType.Cadet;
  }
}
