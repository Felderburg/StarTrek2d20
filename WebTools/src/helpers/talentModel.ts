import i18next from 'i18next';
import { AliasModel } from './aliases';
import { ITalent } from './italent';
import {
  AllOfPrerequisite,
  AnyOfPrerequisite,
  AnySpeciesPrerequisite,
  ICompositePrerequisite,
  IConstructPrerequisite,
  ServiceYearPrerequisite,
  SourcePrerequisite,
  SpeciesPrerequisite,
} from './prerequisite';
import { Species } from './speciesEnum';
import { TalentCategorization, TalentCategory } from './talentCategory';
import { toCamelCase } from '../common/camelCaseUtil';
import { Source, SourcesHelper } from './sources';
import { Character } from '../common/character';
import { Starship } from '../common/starship';
import { Creature } from '../creature/model/creature';
import { Station } from '../common/station';
import { NotSourcePrerequisite } from './spaceframes';
import { MaxServiceYearPrerequisite } from './talents';

export class TalentModel implements ITalent {
  readonly name: string;
  private description: string;
  prerequisites: IConstructPrerequisite[];
  maxRank: number;
  category: TalentCategorization;
  aliases: AliasModel[];
  specialRule: (version: number) => boolean;

  constructor(
    name: string,
    desc: string,
    prerequisites: IConstructPrerequisite[],
    maxRank: number = 1,
    category: string | TalentCategorization = new TalentCategorization(
      TalentCategory.General,
    ),
    specialRule: boolean | ((version: number) => boolean) = false,
    ...aliases: AliasModel[]
  ) {
    this.name = name;
    this.description = desc;
    this.prerequisites = prerequisites;
    this.maxRank = maxRank;
    if (category instanceof TalentCategorization) {
      this.category = category;
    } else {
      const species = Object.keys(Species).filter(
        (item) => !isNaN(Number(item)) && Species[item] === category,
      );
      if (species?.length === 0) {
        console.log('Talent category ' + category);
      } else {
        this.category = new TalentCategorization(
          TalentCategory.Species,
          parseInt(species[0]),
        );
      }
    }

    if (typeof specialRule == 'boolean') {
      const f = (version: number) => {
        return specialRule;
      };
      this.specialRule = f;
    } else {
      this.specialRule = specialRule;
    }
    this.aliases = aliases || AliasModel[0];
  }

  isSpecialRule(version: number): boolean {
    return this.specialRule(version);
  }

  get isStarshipTalent() {
    if (this.category instanceof TalentCategorization) {
      return this.category.category === TalentCategory.Starship;
    } else {
      return this.category === 'Starship';
    }
  }

  get isStarbaseTalent() {
    if (this.category instanceof TalentCategorization) {
      return this.category.category === TalentCategory.Starbase;
    } else {
      return this.category === 'Starbase';
    }
  }

  get is2eSupported() {
    let result = false;
    const sources = SourcesHelper.getSources();
    this.sources.forEach((s) => {
      const source = sources.filter((src) => src.id === s)[0];
      if (source.version === 2) {
        result = true;
      }
    });
    return result || this.is2eDescriptionPresent;
  }

  get is2eDescriptionPresent() {
    const key = 'Talent.' + this.rootKey + '.description2e';
    const result = i18next.t(key);
    return result !== key;
  }

  get displayName() {
    if (this.category) {
      const suffix = ' (' + this.category + ')';
      if (this.name.indexOf(suffix) >= 0) {
        return this.name.substring(0, this.name.indexOf(suffix));
      } else {
        return this.name;
      }
    } else {
      return this.name;
    }
  }

  get localizedDisplayName() {
    const key = 'Talent.' + this.rootKey;
    const result = i18next.t(key);

    if (result === key) {
      const name = this.localizedName;
      if (this.category) {
        const suffix = ' (' + this.category + ')';
        if (name.indexOf(suffix) >= 0) {
          return name.substring(0, name.indexOf(suffix));
        } else {
          return name;
        }
      } else {
        return name;
      }
    } else {
      return result;
    }
  }

  get localizedDescription() {
    const key = 'Talent.' + this.rootKey + '.description';
    const result = i18next.t(key);
    return result === key ? this.description : result;
  }

  get localizedDescription2e() {
    const key = 'Talent.' + this.rootKey + '.description2e';
    const result = i18next.t(key);
    return result === key ? this.localizedDescription : result;
  }

  get rootKey() {
    return toCamelCase(this.name);
  }

  get localizedName() {
    const key = 'Talent.' + this.rootKey;
    const result = i18next.t(key);
    return result === key ? this.name : result;
  }

  get nameWithoutBracketedPart() {
    if (this.name.includes('(')) {
      return this.name.substring(0, this.name.indexOf('(')).trim();
    } else {
      return this.name;
    }
  }

  get isXQualified() {
    return this.nameWithoutBracketedPart.endsWith(' X');
  }

  localizedNameForSource(source: Source): string {
    const result = this.localizedDisplayName;
    const alias = this.aliases.filter((a) => a.source === source);
    return alias?.length ? alias[0].localizedName : result;
  }

  get localizedSoloDescription(): string {
    // for Starship talents, this is the short, abbreviated description of the talent
    const key = 'Talent.' + this.rootKey + '.soloDescription';
    const result = i18next.t(key);
    return result === key ? '' : result;
  }

  private sourcesFromPrerequsite(prerequisite: ICompositePrerequisite) {
    const result = [];
    const subList = prerequisite.prerequisites;
    subList.forEach((p) => {
      if (p instanceof SourcePrerequisite) {
        Array.prototype.push.apply(
          result,
          (p as SourcePrerequisite).getSources(),
        );
      } else if (
        p instanceof AnyOfPrerequisite ||
        p instanceof AllOfPrerequisite
      ) {
        Array.prototype.push.apply(result, this.sourcesFromPrerequsite(p));
      }
    });
    return result;
  }

  get sources(): Source[] {
    let src = [];

    this.prerequisites.forEach((p) => {
      if (p instanceof SourcePrerequisite) {
        src.push(
          ...(
            this.prerequisites.filter(
              (p) => p instanceof SourcePrerequisite,
            )[0] as SourcePrerequisite
          ).getSources(),
        );
      } else if (
        p instanceof AnyOfPrerequisite ||
        p instanceof AllOfPrerequisite
      ) {
        src.push(...this.sourcesFromPrerequsite(p));
      }
    });

    if (src.length === 0) {
      src = [Source.Core];
    } else {
      src = src.filter((item, i) => src.indexOf(item) === i);
    }

    return src;
  }

  isAvailableExcludingSpecies(character: Character) {
    let available = true;
    this.prerequisites.forEach((p, i) => {
      if (
        !(p instanceof SpeciesPrerequisite) &&
        !(p instanceof AnySpeciesPrerequisite) &&
        !p.isPrerequisiteFulfilled(character)
      ) {
        available = false;
      }
    });
    return available;
  }

  isAvailableForServiceYear(s: Starship) {
    let available = true;
    this.prerequisites.forEach((p, i) => {
      if (
        (p instanceof ServiceYearPrerequisite ||
          p instanceof MaxServiceYearPrerequisite) &&
        !p.isPrerequisiteFulfilled(s)
      ) {
        available = false;
      }
    });
    return available;
  }

  isPrerequisiteFulfilled(c: Starship | Character | Creature | Station) {
    let include = true;
    this.prerequisites.forEach((p, i) => {
      if (!p.isPrerequisiteFulfilled(c)) {
        include = false;
      }
    });
    return include;
  }

  isSourcePrerequisiteFulfilled(c: Starship | Character | Creature | Station) {
    let include = true;
    this.prerequisites.forEach((p, i) => {
      if (p instanceof SourcePrerequisite && !p.isPrerequisiteFulfilled(c)) {
        include = false;
      } else if (
        p instanceof NotSourcePrerequisite &&
        c instanceof Starship &&
        !p.isPrerequisiteFulfilled(c as Starship)
      ) {
        include = false;
      }
    });
    return include;
  }

  nameForSource(source: Source) {
    let result = this.name;
    for (const a of this.aliases) {
      if (a.source === source) {
        result = a.name;
        break;
      }
    }
    return result;
  }

  matches(name: string) {
    if (
      this.name === name ||
      this.name.replace('’', "'") === name.replace('’', "'")
    ) {
      return true;
    } else {
      let result = false;
      this.aliases.forEach((a) => {
        if (
          a.name === name ||
          a.name.replace('’', "'") === name.replace('’', "'")
        ) {
          result = true;
        }
      });
      return result;
    }
  }

  get requirement() {
    let prerequisites = undefined;
    this.prerequisites.forEach((p) => {
      const desc = p.describe();
      if (desc) {
        if (prerequisites == null) {
          prerequisites = desc;
        } else {
          prerequisites += ', ' + desc;
        }
      }
    });
    return prerequisites;
  }

  get localizedCategoryString(): string {
    return this.category.localizedDescription;
  }
}
