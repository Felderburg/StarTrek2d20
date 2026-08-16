import type { Character } from '../common/character';
import { Attribute } from '../helpers/attributes';
import { SpeciesHelper } from '../helpers/species';
import type { SpeciesModel } from '../helpers/speciesModel';
import { Species } from '../helpers/speciesEnum';
import {
  StepContext,
  modifyCharacterAttribute,
} from '../state/characterActions';
import { store } from '../state/store';
import type { IAttributeController } from './attributeController';

export class SpeciesAttributeController implements IAttributeController {
  readonly character: Character;
  readonly species: SpeciesModel;

  constructor(character: Character, species: SpeciesModel) {
    this.character = character;
    this.species = species;
  }

  isShown(attribute: Attribute) {
    return this.species.attributes.includes(attribute);
  }
  isEditable(attribute: Attribute): boolean {
    return this.species.attributes.length > 3;
  }
  getValue(attribute: Attribute): number {
    return this.character.attributes[attribute];
  }
  getDeltaValue(attribute: Attribute): number {
    return (
      (this.character.speciesStep?.attributes?.filter((a) => a === attribute)
        ?.length ?? 0) -
      (this.character.speciesStep?.decrementAttributes?.filter(
        (a) => a === attribute,
      )?.length ?? 0)
    );
  }
  canIncrease(attribute: Attribute): boolean {
    return (
      this.isEditable(attribute) &&
      this.character.speciesStep?.attributes?.length < 3 &&
      !this.character.speciesStep?.attributes?.includes(attribute)
    );
  }
  canDecrease(attribute: Attribute): boolean {
    return (
      this.isEditable(attribute) &&
      this.character.speciesStep?.attributes?.includes(attribute)
    );
  }
  onIncrease(attribute: Attribute): void {
    store.dispatch(modifyCharacterAttribute(attribute, StepContext.Species));
  }
  onDecrease(attribute: Attribute): void {
    store.dispatch(
      modifyCharacterAttribute(attribute, StepContext.Species, false),
    );
  }
  get instructions() {
    return [];
  }

  public static create(character: Character, species: SpeciesModel) {
    if (species.id === Species.Ktarian) {
      return new KtarianSpeciesAttributeController(character, species);
    } else if (species.id === Species.Kobali) {
      return new KobaliSpeciesAttributeController(character, species);
    } else if (species.id === Species.Napean) {
      return new NapeanSpeciesAttributeController(character, species);
    } else {
      return new SpeciesAttributeController(character, species);
    }
  }
}

export class CustomSpeciesAttributeController implements IAttributeController {
  readonly character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  isShown(attribute: Attribute) {
    return true;
  }
  isEditable(attribute: Attribute): boolean {
    return true;
  }
  getValue(attribute: Attribute): number {
    return this.character.attributes[attribute];
  }
  getDeltaValue(attribute: Attribute): number {
    return (
      (this.character.speciesStep?.attributes?.filter((a) => a === attribute)
        ?.length ?? 0) -
      (this.character.speciesStep?.decrementAttributes?.filter(
        (a) => a === attribute,
      )?.length ?? 0)
    );
  }
  canIncrease(attribute: Attribute): boolean {
    return (
      this.isEditable(attribute) &&
      this.character.speciesStep?.attributes?.length < 3 &&
      !this.character.speciesStep?.attributes?.includes(attribute)
    );
  }
  canDecrease(attribute: Attribute): boolean {
    return (
      this.isEditable(attribute) &&
      this.character.speciesStep?.attributes?.includes(attribute)
    );
  }
  onIncrease(attribute: Attribute): void {
    store.dispatch(modifyCharacterAttribute(attribute, StepContext.Species));
  }
  onDecrease(attribute: Attribute): void {
    store.dispatch(
      modifyCharacterAttribute(attribute, StepContext.Species, false),
    );
  }
  get instructions() {
    return [];
  }
}

class KtarianSpeciesAttributeController extends SpeciesAttributeController {
  isShown(attribute: Attribute) {
    return (
      super.isShown(attribute) ||
      this.species.secondaryAttributes.includes(attribute)
    );
  }
  isEditable(attribute: Attribute) {
    return this.species.secondaryAttributes.includes(attribute);
  }
}

class NapeanSpeciesAttributeController extends SpeciesAttributeController {
  isEditable(attribute: Attribute) {
    return false;
  }

  isShown(attribute: Attribute) {
    return [
      Attribute.Control,
      Attribute.Insight,
      Attribute.Presence,
      Attribute.Reason,
    ].includes(attribute);
  }
}

class KobaliSpeciesAttributeController extends SpeciesAttributeController {
  originalSpecies: SpeciesModel;

  constructor(character: Character, species: SpeciesModel) {
    super(character, species);
    this.originalSpecies = SpeciesHelper.getSpeciesByType(
      character.speciesStep.originalSpecies,
    );
  }

  isShown(attribute: Attribute) {
    return (
      this.species.secondaryAttributes.includes(attribute) ||
      this.originalSpecies.attributes.includes(attribute) ||
      this.originalSpecies.secondaryAttributes.includes(attribute)
    );
  }

  isEditable(attribute: Attribute) {
    return true;
  }

  countOriginalSpeciesAttributes() {
    let result = 0;
    this.originalSpecies.attributes.forEach(
      (a) =>
        (result += this.character.speciesStep.attributes.includes(a) ? 1 : 0),
    );
    return result;
  }

  canIncrease(attribute: Attribute): boolean {
    if (this.character.speciesStep.attributes.length === 3) {
      return false;
    } else {
      return !this.character.speciesStep.attributes.includes(attribute);
    }
  }

  canDecrease(attribute: Attribute) {
    if (
      this.originalSpecies.attributes.includes(attribute) &&
      this.countOriginalSpeciesAttributes() >= 3
    ) {
      return (
        this.isEditable(attribute) &&
        this.character.speciesStep.attributes.includes(attribute)
      );
    } else if (this.originalSpecies.attributes.includes(attribute)) {
      return false;
    } else {
      return super.canDecrease(attribute);
    }
  }

  get instructions() {
    return [
      'By default, Kobali characters have the attribute increases of the original species, but can substitute one of those attributes for either Reason or Fitness.',
    ];
  }
}
