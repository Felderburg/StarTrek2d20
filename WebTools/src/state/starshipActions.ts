import type { CharacterType } from '../common/characterType';
import type { SelectedTalent } from '../common/selectedTalent';
import { ShipBuildType } from '../common/shipBuildType';
import type { SimpleStats, Starship } from '../common/starship';
import type { StarshipAdvancementChoice } from '../common/starshipAdvancementChoice';
import type { Department } from '../helpers/department';
import type { Era } from '../helpers/erasEnum';
import type { MissionPodModel } from '../helpers/missionPods';
import type { MissionProfileModel } from '../helpers/missionProfiles';
import type { SpaceframeAppearance } from '../helpers/spaceframeAppearance';
import type { SpaceframeModel } from '../helpers/spaceframeModel';
import type { SpaceframeVariant } from '../helpers/spaceframeVariant';
import type { System } from '../helpers/systems';
import type { TalentModel } from '../helpers/talentModel';
import type { Weapon } from '../helpers/weapons';
import type { ServiceRecordModel } from '../starship/model/serviceRecord';
import type { ShipBuildWorkflow } from '../starship/model/shipBuildWorkflow';

export const CREATE_NEW_STARSHIP = 'CREATE_NEW_STARSHIP';
export const CREATE_STARSHIP = 'CREATE_STARSHIP';
export const CHANGE_STARSHIP_SCALE = 'CHANGE_STARSHIP_SCALE';
export const CHANGE_STARSHIP_SPACEFRAME_SCALE =
  'CHANGE_STARSHIP_SPACEFRAME_SCALE';
export const CHANGE_STARSHIP_SPACEFRAME_CLASS_NAME =
  'CHANGE_STARSHIP_SPACEFRAME_CLASS_NAME';
export const CHANGE_STARSHIP_SIMPLE_CLASS_NAME =
  'CHANGE_STARSHIP_SIMPLE_CLASS_NAME';
export const CHANGE_STARSHIP_SPACEFRAME_SYSTEM =
  'CHANGE_STARSHIP_SPACEFRAME_SYSTEM';
export const CHANGE_STARSHIP_SPACEFRAME_SERVICE_YEAR =
  'CHANGE_STARSHIP_SPACEFRAME_SERVICE_YEAR';
export const CHANGE_STARSHIP_SPACEFRAME_DEPARTMENT =
  'CHANGE_STARSHIP_SPACEFRAME_DEPARTMENT';
export const CHANGE_STARSHIP_SIMPLE_SYSTEM = 'CHANGE_STARSHIP_SIMPLE_SYSTEM';
export const CHANGE_STARSHIP_SIMPLE_DEPARTMENT =
  'CHANGE_STARSHIP_SIMPLE_DEPARTMENT';
export const NEXT_STARSHIP_WORKFLOW_STEP = 'NEXT_STARSHIP_WORKFLOW_STEP';
export const REWIND_TO_STARSHIP_WORKFLOW_STEP =
  'REWIND_TO_STARSHIP_WORKFLOW_STEP';
export const SET_STARSHIP_NAME = 'SET_STARSHIP_NAME';
export const SET_STARSHIP_REGISTRY = 'SET_STARSHIP_REGISTRY';
export const SET_STARSHIP_SPACEFRAME = 'SET_STARSHIP_SPACEFRAME';
export const SET_STARSHIP_MISSION_POD = 'SET_STARSHIP_MISSION_POD';
export const SET_STARSHIP_MISSION_PROFILE = 'SET_STARSHIP_MISSION_PROFILE';
export const SET_STARSHIP_MISSION_PROFILE_TALENT =
  'SET_STARSHIP_MISSION_PROFILE_TALENT';
export const SET_STARSHIP_TRAITS = 'SET_STARSHIP_TRAITS';
export const SET_ADDITIONAL_TALENTS = 'SET_ADDITIONAL_TALENTS';
export const ADD_STARSHIP_WEAPON = 'ADD_STARSHIP_WEAPON';
export const DELETE_STARSHIP_WEAPON = 'DELETE_STARSHIP_WEAPON';
export const ADD_STARSHIP_REFIT = 'ADD_STARSHIP_REFIT';
export const DELETE_STARSHIP_REFIT = 'DELETE_STARSHIP_REFIT';
export const SET_STARSHIP_SERVICE_YEAR = 'SET_STARSHIP_SERVICE_YEAR';
export const SET_STARSHIP_SERVICE_RECORD = 'SET_STARSHIP_SERVICE_RECORD';
export const SET_STARSHIP_SPACEFRAME_TALENTS =
  'SET_STARSHIP_SPACEFRAME_TALENTS';
export const MODIFY_STARSHIP_ADD_ADVANCEMENT =
  'MODIFY_STARSHIP_ADD_ADVANCEMENT';
export const SET_STARSHIP_SPACEFRAME_APPEARANCE =
  'SET_STARSHIP_SPACEFRAME_APPEARANCE';

export function createStarship(starship: Starship, hash?: number) {
  const payload = { starship: starship, hash: hash };
  return {
    type: CREATE_STARSHIP,
    payload: payload,
  };
}

export function createNewStarship(
  type: CharacterType,
  era: Era,
  serviceYear?: number,
  simple: SimpleStats = undefined,
  workflow?: ShipBuildWorkflow,
  buildType: ShipBuildType = ShipBuildType.Starship,
  version: number = 1,
) {
  const payload = {
    type: type,
    era: era,
    serviceYear: serviceYear,
    simple: simple,
    workflow: workflow,
    buildType: buildType,
    version: version,
  };
  return {
    type: CREATE_NEW_STARSHIP,
    payload: payload,
  };
}

export function changeStarshipScale(delta: number) {
  const payload = { delta: delta };
  return {
    type: CHANGE_STARSHIP_SCALE,
    payload: payload,
  };
}

export function changeStarshipSpaceframeScale(delta: number) {
  const payload = { delta: delta };
  return {
    type: CHANGE_STARSHIP_SPACEFRAME_SCALE,
    payload: payload,
  };
}

export function changeStarshipSpaceframeServiceYear(year: number) {
  const payload = { serviceYear: year };
  return {
    type: CHANGE_STARSHIP_SPACEFRAME_SERVICE_YEAR,
    payload: payload,
  };
}

export function setStarshipServiceYear(year: number) {
  const payload = { serviceYear: year };
  return {
    type: SET_STARSHIP_SERVICE_YEAR,
    payload: payload,
  };
}

export function changeStarshipSimpleClassName(className: string) {
  const payload = { className: className };
  return {
    type: CHANGE_STARSHIP_SIMPLE_CLASS_NAME,
    payload: payload,
  };
}

export function changeStarshipSpaceframeClassName(className: string) {
  const payload = { className: className };
  return {
    type: CHANGE_STARSHIP_SPACEFRAME_CLASS_NAME,
    payload: payload,
  };
}

export function setStarshipName(name: string) {
  const payload = { name: name };
  return {
    type: SET_STARSHIP_NAME,
    payload: payload,
  };
}

export function setStarshipSpaceframe(
  spaceframe: SpaceframeModel,
  variant?: SpaceframeVariant,
) {
  const payload = { spaceframe: spaceframe, variant: variant };
  return {
    type: SET_STARSHIP_SPACEFRAME,
    payload: payload,
  };
}

export function setStarshipSpaceframeTalents(talents: SelectedTalent[]) {
  const payload = { talents: talents };
  return {
    type: SET_STARSHIP_SPACEFRAME_TALENTS,
    payload: payload,
  };
}

export function setStarshipServiceRecord(
  serviceRecord: ServiceRecordModel,
  talent: TalentModel,
  selection?: string | System,
  removedTalent?: string,
  replacedTalent?: SelectedTalent,
) {
  const payload = {
    serviceRecord: serviceRecord,
    talent: talent,
    selection: selection,
    removedTalent: removedTalent,
    replacedTalent: replacedTalent,
  };
  return {
    type: SET_STARSHIP_SERVICE_RECORD,
    payload: payload,
  };
}

export function setStarshipMissionProfile(
  missionProfile: MissionProfileModel,
  system?: System,
) {
  const payload = { missionProfile: missionProfile, system: system };
  return {
    type: SET_STARSHIP_MISSION_PROFILE,
    payload: payload,
  };
}

export function setStarshipMissionProfileTalent(talent: SelectedTalent) {
  const payload = { talent: talent };
  return {
    type: SET_STARSHIP_MISSION_PROFILE_TALENT,
    payload: payload,
  };
}

export function setStarshipMissionPod(
  missionPod: MissionPodModel,
  replacements?: (SelectedTalent | undefined)[],
) {
  const payload = { missionPod: missionPod, replacements: replacements ?? [] };
  return {
    type: SET_STARSHIP_MISSION_POD,
    payload: payload,
  };
}

export function addStarshipRefit(refit: System) {
  const payload = { refit: refit };
  return {
    type: ADD_STARSHIP_REFIT,
    payload: payload,
  };
}

export function deleteStarshipRefit(refit: System) {
  const payload = { refit: refit };
  return {
    type: DELETE_STARSHIP_REFIT,
    payload: payload,
  };
}

export function setStarshipRegistry(registry: string) {
  const payload = { registry: registry };
  return {
    type: SET_STARSHIP_REGISTRY,
    payload: payload,
  };
}

export function setStarshipTraits(traits: string) {
  const payload = { traits: traits };
  return {
    type: SET_STARSHIP_TRAITS,
    payload: payload,
  };
}

export function setStarshipSpaceframeAppearance(
  appearance?: SpaceframeAppearance,
) {
  const payload = { appearance: appearance };
  return {
    type: SET_STARSHIP_SPACEFRAME_APPEARANCE,
    payload: payload,
  };
}

export function setAdditionalTalents(talents: SelectedTalent[]) {
  const payload = { talents: talents };
  return {
    type: SET_ADDITIONAL_TALENTS,
    payload: payload,
  };
}

export function changeStarshipSimpleSystem(delta: number, system: System) {
  const payload = { delta: delta, system: system };
  return {
    type: CHANGE_STARSHIP_SIMPLE_SYSTEM,
    payload: payload,
  };
}

export function changeStarshipSpaceframeSystem(delta: number, system: System) {
  const payload = { delta: delta, system: system };
  return {
    type: CHANGE_STARSHIP_SPACEFRAME_SYSTEM,
    payload: payload,
  };
}

export function changeStarshipSimpleDepartment(
  delta: number,
  department: Department,
) {
  const payload = { delta: delta, department: department };
  return {
    type: CHANGE_STARSHIP_SIMPLE_DEPARTMENT,
    payload: payload,
  };
}

export function changeStarshipSpaceframeDepartment(
  delta: number,
  department: Department,
) {
  const payload = { delta: delta, department: department };
  return {
    type: CHANGE_STARSHIP_SPACEFRAME_DEPARTMENT,
    payload: payload,
  };
}

export function nextStarshipWorkflowStep() {
  return {
    type: NEXT_STARSHIP_WORKFLOW_STEP,
    payload: {},
  };
}

export function rewindToStarshipWorkflowStep(step: number) {
  return {
    type: REWIND_TO_STARSHIP_WORKFLOW_STEP,
    payload: { index: step },
  };
}

export function addStarshipWeapon(weapon: Weapon) {
  const payload = { weapon: weapon };
  return {
    type: ADD_STARSHIP_WEAPON,
    payload: payload,
  };
}

export function deleteStarshipWeapon(weapon: Weapon) {
  const payload = { weapon: weapon };
  return {
    type: DELETE_STARSHIP_WEAPON,
    payload: payload,
  };
}

export function modifyStarshipAddAdvancement(
  type: StarshipAdvancementChoice,
  value: System | Department | SelectedTalent,
  removeValue?: System | Department | SelectedTalent,
) {
  const payload = { type: type, value: value };
  if (removeValue != null) {
    payload['remove'] = removeValue;
  }
  return {
    type: MODIFY_STARSHIP_ADD_ADVANCEMENT,
    payload: payload,
  };
}
