import i18next from 'i18next';
import { makeKey } from '../common/translationKey';
import type { Attribute } from './attributes';
import type { Era } from './erasEnum';
import type { Source } from './sources';
import type { ISpecies, NameModel } from './species';
import { Species } from './speciesEnum';
import type { TalentModel } from './talentModel';

export class BasicAttributeHandler {
  readonly attributes: Attribute[];
  readonly decrementAttributes: Attribute[];

  constructor(attributes: Attribute[], decrementAttributes: Attribute[] = []) {
    this.attributes = attributes;
    this.decrementAttributes = decrementAttributes;
  }
}

export class SpeciesModel implements ISpecies {
  id: Species;
  name: string;
  eras: Era[];
  sources: Source[];
  private description: string[];
  attributesHandler: BasicAttributeHandler;
  trait: string;
  private traitDescription: string;
  exampleValues: string[];
  talents: TalentModel[];
  nameDescription: string;
  nameSuggestions: NameModel[];
  // at the moment, only Ktarians have secondary attributes
  secondaryAttributes: Attribute[];
  isMixedSpeciesAllowed: boolean;

  constructor(
    id: Species,
    name: string,
    eras: Era[],
    sources: Source[],
    description: string[],
    attributes: Attribute[] | BasicAttributeHandler,
    trait: string,
    traitDescription: string,
    exampleValues: string | string[],
    talents: TalentModel[],
    nameDescription: string,
    nameSuggestions: NameModel[],
    secondaryAttributes: Attribute[] = [],
    isMixedSpeciesAllowed: boolean = true,
  ) {
    this.id = id;
    this.name = name;
    this.eras = eras;
    this.description = description;

    if (attributes instanceof BasicAttributeHandler) {
      this.attributesHandler = attributes;
    } else {
      this.attributesHandler = new BasicAttributeHandler(attributes);
    }
    this.trait = trait;
    this.traitDescription = traitDescription;
    if (Array.isArray(exampleValues)) {
      this.exampleValues = exampleValues;
    } else if (exampleValues === '') {
      this.exampleValues = [];
    } else {
      this.exampleValues = [exampleValues];
    }
    this.talents = talents;
    this.nameDescription = nameDescription;
    this.nameSuggestions = nameSuggestions;
    this.sources = sources;
    this.secondaryAttributes = secondaryAttributes;
    this.isMixedSpeciesAllowed = isMixedSpeciesAllowed;
  }

  private get speciesKeyName() {
    let result = Species[this.id];
    if (result.indexOf('Ext') === result.length - 3) {
      result = result.substring(0, result.length - 3);
    }
    return result;
  }

  get isAttributeSelectionRequired() {
    const definedAttributeCount =
      this.attributes?.length - this.decrementAttributes?.length;
    if (definedAttributeCount <= 3) {
      return false;
    } else {
      return true;
    }
  }

  get attributes() {
    return this.attributesHandler.attributes;
  }

  get decrementAttributes() {
    return this.attributesHandler.decrementAttributes;
  }

  get localizedName() {
    const key = makeKey('Species.', this.speciesKeyName, '.name');
    const localized = i18next.t(key);
    return key === localized ? this.name : localized;
  }

  get localizedTrait() {
    const key = makeKey('Species.', this.speciesKeyName, '.trait');
    const localized = i18next.t(key);
    return key === localized ? this.localizedName : localized;
  }

  get localizedDescription() {
    const key = makeKey('Species.', this.speciesKeyName, '.description');
    const localized = i18next.t(key);
    return key === localized ? this.description.join('\n\n') : localized;
  }

  get localizedDescription2e() {
    const key = makeKey('Species.', this.speciesKeyName, '.description2e');
    const localized = i18next.t(key);
    return key === localized ? this.localizedDescription : localized;
  }

  get localizedSoloDescription() {
    const key = makeKey('Species.', this.speciesKeyName, '.soloDescription');
    const localized = i18next.t(key);
    return key === localized ? this.description : localized;
  }

  get localizedNameDescription() {
    const key = makeKey('Species.', this.speciesKeyName, '.aboutNames');
    const localized = i18next.t(key);
    return key === localized ? this.nameDescription : localized;
  }

  get localizedTraitDescription() {
    const key = makeKey('Species.', this.speciesKeyName, '.traitDescription');
    const localized = i18next.t(key);
    return key === localized ? this.traitDescription : localized;
  }

  get localizedTraitDescription2e() {
    const key = makeKey('Species.', this.speciesKeyName, '.traitDescription2e');
    const localized = i18next.t(key);
    return key === localized ? this.localizedTraitDescription : localized;
  }

  get localizedExampleValues(): string[] {
    const key = makeKey('Species.', this.speciesKeyName, '.exampleValue');
    const localized = i18next.t(key);
    return key === localized ? this.exampleValues : [localized];
  }
}
