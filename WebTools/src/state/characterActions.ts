import type { Character, CharacterRank } from '../common/character';
import type { CharacterType } from '../common/characterType';
import type { Age } from '../helpers/age';
import type { Attribute } from '../helpers/attributes';
import type { BorgImplantType } from '../helpers/borgImplant';
import type { Career } from '../helpers/careerEnum';
import type { Environment } from '../helpers/environments';
import type { Rank } from '../helpers/ranks';
import type { Role } from '../helpers/roles';
import type { Department } from '../helpers/department';
import type { Species } from '../helpers/speciesEnum';
import type { ITalent } from '../helpers/italent';
import type { Track } from '../helpers/trackEnum';
import type { EarlyOutlookModel } from '../helpers/upbringings';
import type { CharacterAdvancementChoice } from '../modify/model/characterAdvancementChoice';
import type { SelectedTalent } from '../common/selectedTalent';
import type { ModificationType } from '../modify/model/modificationType';
import type { EquipmentModel, EquipmentType } from '../helpers/equipment';
import type { PersonalWeaponType } from '../helpers/weapons';
import type { LogEntry } from '../common/logEntry';
import type { SpeciesAbilityChoice } from '../helpers/speciesAbility';
import { SpeciesAbilityList } from '../helpers/speciesAbility';
import { hasSource } from './contextFunctions';
import type {
  FocusAssembly,
  TalentAssembly,
  ValueAssembly,
} from '../common/characterAssembly';

export const SET_CHARACTER = 'SET_CHARACTER';
export const MODIFY_CHARACTER_REPUTATION = 'MODIFY_CHARACTER_REPUTATION';
export const MODIFY_CHARACTER_RANK = 'MODIFY_CHARACTER_RANK';
export const SET_CHARACTER_SPECIES = 'SET_CHARACTER_SPECIES';
export const SET_CHARACTER_FOCUS = 'SET_CHARACTER_FOCUS';
export const SET_CHARACTER_VALUE = 'SET_CHARACTER_VALUE';
export const SET_CHARACTER_AGE = 'SET_CHARACTER_AGE';
export const SET_CHARACTER_LINEAGE = 'SET_CHARACTER_LINEAGE';
export const SET_CHARACTER_ASSIGNED_SHIP = 'SET_CHARACTER_ASSIGNED_SHIP';
export const SET_CHARACTER_HOUSE = 'SET_CHARACTER_HOUSE';
export const SET_CHARACTER_ADDITIONAL_TRAITS =
  'SET_CHARACTER_ADDITIONAL_TRAITS';
export const SET_CHARACTER_NAME = 'SET_CHARACTER_NAME';
export const SET_CHARACTER_PASTIME = 'SET_CHARACTER_PASTIME';
export const SET_CHARACTER_RANK = 'SET_CHARACTER_RANK';
export const SET_CHARACTER_ROLE = 'SET_CHARACTER_ROLE';
export const SET_CHARACTER_PRONOUNS = 'SET_CHARACTER_PRONOUNS';
export const SET_CHARACTER_EDUCATION = 'SET_CHARACTER_EDUCATION';
export const SET_CHARACTER_ENVIRONMENT = 'SET_CHARACTER_ENVIRONMENT';
export const SET_CHARACTER_EARLY_OUTLOOK = 'SET_CHARACTER_EARLY_OUTLOOK';
export const SET_CHARACTER_FINISHING_TOUCHES =
  'SET_CHARACTER_FINISHING_TOUCHES';
export const SET_CHARACTER_CAREER_LENGTH = 'SET_CHARACTER_CAREER_LENGTH';
export const MODIFY_CHARACTER_ATTRIBUTE = 'MODIFY_CHARACTER_ATTRIBUTE';
export const MODIFY_CHARACTER_DISCIPLINE = 'MODIFY_CHARACTER_DISCIPLINE';
export const SET_CHARACTER_TYPE = 'SET_CHARACTER_TYPE';
export const ADD_CHARACTER_CAREER_EVENT = 'ADD_CHARACTER_CAREER_EVENT';
export const SET_CHARACTER_CAREER_EVENT_TRAIT =
  'SET_CHARACTER_CAREER_EVENT_TRAIT';
export const ADD_CHARACTER_BORG_IMPLANT = 'ADD_CHARACTER_BORG_IMPLANT';
export const ADD_CHARACTER_UNTAPPED_POTENTIAL_ATTRIBUTE =
  'ADD_CHARACTER_UNTAPPED_POTENTIAL_ATTRIBUTE';
export const REMOVE_CHARACTER_BORG_IMPLANT = 'REMOVE_CHARACTER_BORG_IMPLANT';
export const ADD_CHARACTER_TALENT = 'ADD_CHARACTER_TALENT';
export const ADD_CHARACTER_TALENT_FOCUS = 'ADD_CHARACTER_TALENT_FOCUS';
export const ADD_CHARACTER_TALENT_VALUE = 'ADD_CHARACTER_TALENT_VALUE';
export const SET_SUPPORTING_CHARACTER_DISCIPLINES =
  'SET_SUPPORTING_CHARACTER_DISCIPLINES';
export const SET_NPC_CHARACTER_DEPARTMENTS = 'SET_NPC_CHARACTER_DEPARTMENTS';
export const SET_SUPPORTING_CHARACTER_ATTRIBUTES =
  'SET_SUPPORTING_CHARACTER_ATTRIBUTES';
export const SET_SUPPORTING_CHARACTER_SUPERVISORY =
  'SET_SUPPORTING_CHARACTER_SUPERVISORY';
export const ADD_CHARACTER_SPECIES_ABILITY_FOCUS =
  'ADD_CHARACTER_SPECIES_ABILITY_FOCUS';
export const SET_CHARACTER_SPECIES_ABILITY_CHOICE =
  'SET_CHARACTER_SPECIES_ABILITY_CHOICE';
export const MODIFY_CHARACTER_ADD_ADVANCEMENT =
  'MODIFY_CHARACTER_ADD_ADVANCEMENT';
export const ADD_NPC_CHARACTER_VALUE = 'SET_NPC_CHARACTER_VALUE';
export const SET_NPC_CHARACTER_ATTRIBUTES = 'SET_NPC_CHARACTER_ATTRIBUTES';
export const ADD_NPC_CHARACTER_EQUIPMENT = 'ADD_NPC_CHARACTER_EQUIPMENT';
export const REMOVE_NPC_CHARACTER_EQUIPMENT = 'REMOVE_NPC_CHARACTER_EQUIPMENT';
export const REMOVE_NPC_CHARACTER_WEAPON = 'REMOVE_NPC_CHARACTER_WEAPON';
export const ADD_NPC_CHARACTER_WEAPON = 'ADD_NPC_CHARACTER_WEAPON';
export const SET_NPC_CHARACTER_TALENTS = 'SET_NPC_CHARACTER_TALENTS';
export const ADD_CHARACTER_LOG_ENTRY = 'ADD_CHARACTER_LOG_ENTRY';
export const REMOVE_CHARACTER_BORG_IMPLANT_SPECIES_OPTION =
  'REMOVE_CHARACTER_BORG_IMPLANT_SPECIES_OPTION';
export const ADD_CHARACTER_BORG_IMPLANT_SPECIES_OPTION =
  'ADD_CHARACTER_BORG_IMPLANT_SPECIES_OPTION';
export const UPDATE_CHARACTER_GENERAL_EDIT_VALUE =
  'UPDATE_CHARACTER_GENERAL_EDIT_VALUE';
export const UPDATE_CHARACTER_GENERAL_EDIT_SPECIES_ABILITY =
  'UPDATE_CHARACTER_GENERAL_EDIT_SPECIES_ABILITY';
export const UPDATE_CHARACTER_GENERAL_EDIT_FOCUS =
  'UPDATE_CHARACTER_GENERAL_EDIT_FOCUS';
export const UPDATE_CHARACTER_GENERAL_EDIT_TALENT =
  'UPDATE_CHARACTER_GENERAL_EDIT_TALENT';

export enum StepContext {
  Species,
  Environment,
  EarlyOutlook,
  Education,
  Career,
  CareerEvent1,
  CareerEvent2,
  FinishingTouches,
}

export function setCharacter(character: Character, replacementHash?: number) {
  const payload = { character: character, replacementHash: replacementHash };
  return {
    type: SET_CHARACTER,
    payload: payload,
  };
}

export function addCharacterBorgImplant(type: BorgImplantType) {
  const payload = { type: type };
  return {
    type: ADD_CHARACTER_BORG_IMPLANT,
    payload: payload,
  };
}

export function addCharacterBorgImplantSpeciesOption(type: BorgImplantType) {
  const payload = { type: type };
  return {
    type: ADD_CHARACTER_BORG_IMPLANT_SPECIES_OPTION,
    payload: payload,
  };
}

export function addCharacterUntappedPotentialAttribute(attribute: Attribute) {
  const payload = { attribute: attribute };
  return {
    type: ADD_CHARACTER_UNTAPPED_POTENTIAL_ATTRIBUTE,
    payload: payload,
  };
}

export function removeCharacterBorgImplant(type: BorgImplantType) {
  const payload = { type: type };
  return {
    type: REMOVE_CHARACTER_BORG_IMPLANT,
    payload: payload,
  };
}

export function removeCharacterBorgImplantSpeciesOption(type: BorgImplantType) {
  const payload = { type: type };
  return {
    type: REMOVE_CHARACTER_BORG_IMPLANT_SPECIES_OPTION,
    payload: payload,
  };
}

export function setCharacterSpecies(
  species: Species,
  attributes: Attribute[] = [],
  mixedSpecies?: Species,
  originalSpecies?: Species,
  customSpeciesName?: string,
  decrementAttributes: Attribute[] = [],
) {
  const payload = {
    species: species,
    attributes: attributes,
    mixedSpecies: mixedSpecies,
    originalSpecies: originalSpecies,
    customSpeciesName: customSpeciesName,
    decrementAttributes: decrementAttributes,
  };
  const ability = SpeciesAbilityList.instance.getBySpecies(species);
  if (ability && (ability.source == null || hasSource(ability.source))) {
    payload['ability'] = ability;
  }
  return {
    type: SET_CHARACTER_SPECIES,
    payload: payload,
  };
}

export function setSupportingCharacterSupervisory(supervisory: boolean) {
  const payload = { supervisory: supervisory };
  return {
    type: SET_SUPPORTING_CHARACTER_SUPERVISORY,
    payload: payload,
  };
}

export function setSupportingCharacterDepartments(disciplines: Department[]) {
  const payload = { disciplines: disciplines };
  return {
    type: SET_SUPPORTING_CHARACTER_DISCIPLINES,
    payload: payload,
  };
}

export function setNpcCharacterDepartments(departments: number[]) {
  const payload = { departments: departments };
  return {
    type: SET_NPC_CHARACTER_DEPARTMENTS,
    payload: payload,
  };
}

export function setNpcCharacterAttributes(attributes: number[]) {
  const payload = { attributes: attributes };
  return {
    type: SET_NPC_CHARACTER_ATTRIBUTES,
    payload: payload,
  };
}

export function setNpcCharacterTalents(talents: SelectedTalent[]) {
  const payload = { talents: talents };
  return {
    type: SET_NPC_CHARACTER_TALENTS,
    payload: payload,
  };
}

export function addNpcCharacterEquipment(
  equipment: EquipmentType | EquipmentModel,
) {
  const payload = { equipment: equipment };
  return {
    type: ADD_NPC_CHARACTER_EQUIPMENT,
    payload: payload,
  };
}

export function addNpcCharacterWeapon(weapon: PersonalWeaponType) {
  const payload = { weapon: weapon };
  return {
    type: ADD_NPC_CHARACTER_WEAPON,
    payload: payload,
  };
}

export function removeNpcCharacterEquipment(
  equipment: EquipmentType | EquipmentModel,
) {
  const payload = { equipment: equipment };
  return {
    type: REMOVE_NPC_CHARACTER_EQUIPMENT,
    payload: payload,
  };
}

export function removeNpcCharacterWeapon(weapon: PersonalWeaponType) {
  const payload = { weapon: weapon };
  return {
    type: REMOVE_NPC_CHARACTER_WEAPON,
    payload: payload,
  };
}

export function setSupportingCharacterAttributes(attributes: Attribute[]) {
  const payload = { attributes: attributes };
  return {
    type: SET_SUPPORTING_CHARACTER_ATTRIBUTES,
    payload: payload,
  };
}

export function setCharacterEnvironment(
  environment: Environment,
  otherSpecies?: Species,
) {
  const payload = { environment: environment, otherSpecies: otherSpecies };
  return {
    type: SET_CHARACTER_ENVIRONMENT,
    payload: payload,
  };
}

export function setCharacterEducation(track: Track, enlisted: boolean = false) {
  const payload = { track: track, enlisted: enlisted };
  return {
    type: SET_CHARACTER_EDUCATION,
    payload: payload,
  };
}

export function setCharacterFinishingTouches() {
  return {
    type: SET_CHARACTER_FINISHING_TOUCHES,
  };
}

export function addCharacterCareerEvent(
  eventId: number,
  context: StepContext,
  attribute?: Attribute,
  discipline?: Department,
) {
  const payload = {
    eventId: eventId,
    attribute: attribute,
    discipline: discipline,
    context: context,
  };
  return {
    type: ADD_CHARACTER_CAREER_EVENT,
    payload: payload,
  };
}

export function setCharacterEarlyOutlook(
  earlyOutlook: EarlyOutlookModel,
  accepted: boolean = true,
) {
  const payload = { earlyOutlook: earlyOutlook, accepted: accepted };
  return {
    type: SET_CHARACTER_EARLY_OUTLOOK,
    payload: payload,
  };
}

export function setCharacterFocus(
  focus: string,
  context: StepContext,
  index: number = 0,
) {
  const payload = { focus: focus, context: context, index: index };
  return {
    type: SET_CHARACTER_FOCUS,
    payload: payload,
  };
}

export function addCharacterTalentFocus(
  focus: string,
  talent: string,
  index: number = 0,
) {
  const payload = { focus: focus, talent: talent, index: index };
  return {
    type: ADD_CHARACTER_TALENT_FOCUS,
    payload: payload,
  };
}

export function setCharacterSpeciesAbilityFocus(
  focus: string,
  index: number = 0,
) {
  const payload = { focus: focus, index: index };
  return {
    type: ADD_CHARACTER_SPECIES_ABILITY_FOCUS,
    payload: payload,
  };
}

export function setCharacterSpeciesAbilityChoice(
  choice?: SpeciesAbilityChoice,
) {
  const payload = { choice: choice };
  return {
    type: SET_CHARACTER_SPECIES_ABILITY_CHOICE,
    payload: payload,
  };
}

export function addCharacterLogEntry(logEntry: LogEntry) {
  const payload = { logEntry: logEntry };
  return {
    type: ADD_CHARACTER_LOG_ENTRY,
    payload: payload,
  };
}

export function addCharacterTalentValue(
  value: string,
  talent: string | ITalent,
) {
  const talentName =
    typeof talent === 'string' ? (talent as string) : (talent as ITalent).name;
  const payload = { value: value, talent: talentName };
  return {
    type: ADD_CHARACTER_TALENT_VALUE,
    payload: payload,
  };
}

export function addCharacterTalent(
  talent: ITalent | SelectedTalent,
  context: StepContext,
) {
  const payload = { talent: talent, context: context };
  return {
    type: ADD_CHARACTER_TALENT,
    payload: payload,
  };
}

export function setCharacterValue(value: string, context: StepContext) {
  const payload = { value: value, context: context };
  return {
    type: SET_CHARACTER_VALUE,
    payload: payload,
  };
}

export function updateCharacterGeneralEditValueChange(
  oldValue: ValueAssembly,
  newValue: string,
) {
  const payload = { oldValue: oldValue, newValue: newValue };
  return {
    type: UPDATE_CHARACTER_GENERAL_EDIT_VALUE,
    payload: payload,
  };
}

export function updateCharacterGeneralEditFocusChange(
  oldValue: FocusAssembly,
  newValue: string,
) {
  const payload = { oldValue: oldValue, newValue: newValue };
  return {
    type: UPDATE_CHARACTER_GENERAL_EDIT_FOCUS,
    payload: payload,
  };
}

export function updateCharacterGeneralEditTalentChange(
  oldValue: TalentAssembly,
  newValue: SelectedTalent,
) {
  const payload = { oldValue: oldValue, newValue: newValue };
  return {
    type: UPDATE_CHARACTER_GENERAL_EDIT_TALENT,
    payload: payload,
  };
}

export function updateCharacterGeneralEditSpeciesAbility(species: Species) {
  const payload = {};
  const ability = SpeciesAbilityList.instance.getBySpecies(species);
  if (ability && (ability.source == null || hasSource(ability.source))) {
    payload['ability'] = ability;
  }

  return {
    type: UPDATE_CHARACTER_GENERAL_EDIT_SPECIES_ABILITY,
    payload: payload,
  };
}

export function addNpcCharacterValue(value: string, index: number) {
  const payload = { value: value, index: index };
  return {
    type: ADD_NPC_CHARACTER_VALUE,
    payload: payload,
  };
}

export function setCharacterName(name: string) {
  const payload = { name: name };
  return {
    type: SET_CHARACTER_NAME,
    payload: payload,
  };
}

export function setCharacterPastime(pastime: string) {
  const payload = { pastime: pastime };
  return {
    type: SET_CHARACTER_PASTIME,
    payload: payload,
  };
}

export function setCharacterAge(age: Age) {
  const payload = { age: age };
  return {
    type: SET_CHARACTER_AGE,
    payload: payload,
  };
}

export function setCharacterLineage(lineage: string) {
  const payload = { lineage: lineage };
  return {
    type: SET_CHARACTER_LINEAGE,
    payload: payload,
  };
}

export function setCharacterHouse(house: string) {
  const payload = { house: house };
  return {
    type: SET_CHARACTER_HOUSE,
    payload: payload,
  };
}

export function setCharacterCareerEventTrait(
  trait: string,
  context: StepContext,
) {
  const payload = { trait: trait, context: context };
  return {
    type: SET_CHARACTER_CAREER_EVENT_TRAIT,
    payload: payload,
  };
}

export function setCharacterAdditionalTraits(traits: string) {
  const payload = { traits: traits };
  return {
    type: SET_CHARACTER_ADDITIONAL_TRAITS,
    payload: payload,
  };
}

export function setCharacterRank(name: string, rank?: Rank) {
  const payload = { name: name, rank: rank };
  return {
    type: SET_CHARACTER_RANK,
    payload: payload,
  };
}

export function setCharacterAssignment(
  role?: string | Role,
  secondaryRole?: Role,
) {
  const payload = { role: role, secondaryRole: secondaryRole };
  return {
    type: SET_CHARACTER_ROLE,
    payload: payload,
  };
}

export function setCharacterAssignedShip(assignedShip: string) {
  const payload = { assignedShip: assignedShip };
  return {
    type: SET_CHARACTER_ASSIGNED_SHIP,
    payload: payload,
  };
}

export function setCharacterPronouns(pronouns: string) {
  const payload = { pronouns: pronouns };
  return {
    type: SET_CHARACTER_PRONOUNS,
    payload: payload,
  };
}

export function setCharacterType(type: CharacterType) {
  const payload = { type: type };
  return {
    type: SET_CHARACTER_TYPE,
    payload: payload,
  };
}

export function setCharacterCareerLength(careerLength: Career) {
  const payload = { careerLength: careerLength };
  return {
    type: SET_CHARACTER_CAREER_LENGTH,
    payload: payload,
  };
}

export function modifyCharacterAttribute(
  attribute: Attribute,
  context: StepContext,
  positive: boolean = true,
  forceDecrement: boolean = false,
) {
  const payload = {
    attribute: attribute,
    context: context,
    positive: positive,
    forceDecrement: forceDecrement,
  };
  return {
    type: MODIFY_CHARACTER_ATTRIBUTE,
    payload: payload,
  };
}

export function modifyCharacterDiscipline(
  discipline: Department,
  context: StepContext,
  positive: boolean = true,
  primaryDisciplines: Department[] = [],
  forceDecrement: boolean = false,
) {
  const payload = {
    discipline: discipline,
    context: context,
    positive: positive,
    primaryDisciplines: primaryDisciplines,
    forceDecrement: forceDecrement,
  };
  return {
    type: MODIFY_CHARACTER_DISCIPLINE,
    payload: payload,
  };
}

export function modifyCharacterReputation(delta: number) {
  const payload = { delta: delta };
  return {
    type: MODIFY_CHARACTER_REPUTATION,
    payload: payload,
  };
}

export function modifyCharacterRank(
  rank: CharacterRank,
  type: ModificationType.Promotion | ModificationType.Demotion,
) {
  const payload = { rank: rank, type: type };
  return {
    type: MODIFY_CHARACTER_RANK,
    payload: payload,
  };
}

export function modifyCharacterAddAdvancement(
  type: CharacterAdvancementChoice,
  value: string | Attribute | Department | SelectedTalent,
  removeValue?: string | Attribute | Department | SelectedTalent,
  logEntry?: LogEntry,
  logEntryCallback?: LogEntry,
) {
  const payload = {
    type: type,
    value: value,
    logEntry: logEntry,
    logEntryCallback: logEntryCallback,
  };
  if (removeValue != null) {
    payload['remove'] = removeValue;
  }
  return {
    type: MODIFY_CHARACTER_ADD_ADVANCEMENT,
    payload: payload,
  };
}
