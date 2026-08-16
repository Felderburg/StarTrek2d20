import { Stereotype } from '../common/construct';
import type { SelectedTalent } from '../common/selectedTalent';
import {
  MissionProfileStep,
  ServiceRecordStep,
  SimpleStats,
  SpaceframeStep,
  Starship,
  StarshipAdvancementStep,
} from '../common/starship';
import { StarshipAdvancementChoice } from '../common/starshipAdvancementChoice';
import type { System } from '../helpers/systems';
import { ShipBuildWorkflow } from '../starship/model/shipBuildWorkflow';
import {
  ADD_STARSHIP_REFIT,
  ADD_STARSHIP_WEAPON,
  CHANGE_STARSHIP_SCALE,
  CHANGE_STARSHIP_SIMPLE_CLASS_NAME,
  CHANGE_STARSHIP_SIMPLE_DEPARTMENT,
  CHANGE_STARSHIP_SIMPLE_SYSTEM,
  CHANGE_STARSHIP_SPACEFRAME_CLASS_NAME,
  CHANGE_STARSHIP_SPACEFRAME_DEPARTMENT,
  CHANGE_STARSHIP_SPACEFRAME_SCALE,
  CHANGE_STARSHIP_SPACEFRAME_SERVICE_YEAR,
  CHANGE_STARSHIP_SPACEFRAME_SYSTEM,
  CREATE_NEW_STARSHIP,
  CREATE_STARSHIP,
  DELETE_STARSHIP_REFIT,
  DELETE_STARSHIP_WEAPON,
  MODIFY_STARSHIP_ADD_ADVANCEMENT,
  NEXT_STARSHIP_WORKFLOW_STEP,
  REWIND_TO_STARSHIP_WORKFLOW_STEP,
  SET_ADDITIONAL_TALENTS,
  SET_STARSHIP_MISSION_POD,
  SET_STARSHIP_MISSION_PROFILE,
  SET_STARSHIP_MISSION_PROFILE_TALENT,
  SET_STARSHIP_NAME,
  SET_STARSHIP_REGISTRY,
  SET_STARSHIP_SERVICE_RECORD,
  SET_STARSHIP_SERVICE_YEAR,
  SET_STARSHIP_SPACEFRAME,
  SET_STARSHIP_SPACEFRAME_APPEARANCE,
  SET_STARSHIP_SPACEFRAME_TALENTS,
  SET_STARSHIP_TRAITS,
} from './starshipActions';

interface StarshipState {
  starship?: Starship;
  workflow?: ShipBuildWorkflow;
  hash?: number;
}

const withStarship = (
  state: StarshipState,
  action: any,
  mutate: (s: Starship, action: any) => void,
): StarshipState => {
  const s = state.starship.copy();
  mutate(s, action);
  return {
    ...state,
    starship: s,
  };
};

const starshipReducer = (
  state: StarshipState = {
    starship: undefined,
    workflow: undefined,
    hash: undefined,
  },
  action,
) => {
  switch (action.type) {
    case CREATE_STARSHIP: {
      const s = action.payload.starship;
      const hash = action.payload.hash;
      return {
        ...state,
        starship: s.copy(),
        hash: hash,
      };
    }

    case MODIFY_STARSHIP_ADD_ADVANCEMENT: {
      const temp = state.starship.copy();
      const improvement = new StarshipAdvancementStep();
      improvement.choice = action.payload.type;
      if (action.payload.type === StarshipAdvancementChoice.Talent) {
        improvement.value = (action.payload.value as SelectedTalent).copy();
        if (action.payload.remove != null) {
          improvement.removeValue = (
            action.payload.remove as SelectedTalent
          ).copy();
        }
        temp.advancementSteps.push(improvement);
      } else {
        improvement.value = action.payload.value;
        if (action.payload.remove != null) {
          improvement.removeValue = action.payload.remove;
        }
        temp.advancementSteps.push(improvement);
      }
      return {
        ...state,
        starship: temp,
      };
    }

    case CREATE_NEW_STARSHIP: {
      const s = Starship.createStandardStarship(
        action.payload.era,
        action.payload.type,
        action.payload.version,
      );
      s.serviceYear = action.payload.serviceYear;
      if (action.payload.buildType != null) {
        s.buildType = action.payload.buildType;
      }
      if (action.payload.simple) {
        s.stereotype = Stereotype.SimpleStarship;
        s.simpleStats = new SimpleStats();
        s.simpleStats.scale = action.payload.simple.scale;
        s.simpleStats.systems = [...action.payload.simple.systems];
        s.simpleStats.departments = [...action.payload.simple.departments];
        s.simpleStats.className = action.payload.simple.className;
      }
      return {
        ...state,
        starship: s,
        workflow: action.payload.workflow,
        hash: undefined,
      };
    }
    case CHANGE_STARSHIP_SCALE:
      return withStarship(state, action, (s, action) => {
        if (s.simpleStats == null) {
          s.simpleStats = new SimpleStats();
        }
        s.simpleStats.scale += action.payload.delta;
        s.pruneExcessTalents();
      });
    case CHANGE_STARSHIP_SPACEFRAME_SCALE:
      return withStarship(state, action, (s, action) => {
        if (s?.spaceframeModel?.isCustom) {
          const original = s.spaceframeStep;
          const spaceframe = s.spaceframeModel.copy();
          spaceframe.scale += action.payload.delta;
          s.spaceframeStep = new SpaceframeStep(spaceframe);
          if (original?.appearance != null) {
            s.spaceframeStep.appearance = original.appearance;
          }
        }
        s.pruneExcessTalents();
      });
    case CHANGE_STARSHIP_SPACEFRAME_SERVICE_YEAR:
      return withStarship(state, action, (s, action) => {
        if (s?.spaceframeModel?.isCustom) {
          const original = s.spaceframeStep;
          const spaceframe = s.spaceframeModel.copy();
          spaceframe.serviceYear = action.payload.serviceYear;
          s.spaceframeStep = new SpaceframeStep(spaceframe);
          if (original?.appearance != null) {
            s.spaceframeStep.appearance = original.appearance;
          }
        }
      });
    case SET_STARSHIP_SERVICE_YEAR:
      return withStarship(state, action, (s, action) => {
        s.serviceYear = action.payload.serviceYear;
      });
    case CHANGE_STARSHIP_SPACEFRAME_CLASS_NAME:
      return withStarship(state, action, (s, action) => {
        if (s?.spaceframeModel?.isCustom) {
          const original = s.spaceframeStep;
          const spaceframe = s.spaceframeModel.copy();
          spaceframe.name = action.payload.className;
          s.spaceframeStep = new SpaceframeStep(spaceframe);
          if (original?.appearance != null) {
            s.spaceframeStep.appearance = original.appearance;
          }
        }
      });
    case CHANGE_STARSHIP_SIMPLE_CLASS_NAME:
      return withStarship(state, action, (s, action) => {
        if (s.simpleStats == null) {
          s.simpleStats = new SimpleStats();
        }
        s.simpleStats.className = action.payload.className;
      });
    case SET_STARSHIP_NAME:
      return withStarship(state, action, (s, action) => {
        s.name = action.payload.name;
      });
    case SET_STARSHIP_SERVICE_RECORD:
      return withStarship(state, action, (s, action) => {
        if (action.payload.serviceRecord == null) {
          s.serviceRecordStep = null;
        } else {
          const original = s.serviceRecordStep;
          s.serviceRecordStep = new ServiceRecordStep(
            action.payload.serviceRecord,
          );
          s.serviceRecordStep.specialRule = action.payload.talent;
          if (original?.type?.type === s.serviceRecordStep.type.type) {
            s.serviceRecordStep.selection = original.selection;
            s.serviceRecordStep.system = original.system;
          }
          if (action.payload.selection != null) {
            if (typeof action.payload.selection === 'string') {
              s.serviceRecordStep.selection = action.payload
                .selection as string;
            } else {
              s.serviceRecordStep.system = action.payload.selection as System;
            }
          }
          if (action.payload.removedTalent != null) {
            s.serviceRecordStep.removedTalent = action.payload.removedTalent;
          }
          if (action.payload.replacedTalent != null) {
            s.serviceRecordStep.selectedTalent =
              action.payload.replacedTalent.copy();
          }
        }
      });
    case SET_STARSHIP_SPACEFRAME:
      return withStarship(state, action, (s, action) => {
        const original = s.spaceframeModel;
        s.spaceframeStep = new SpaceframeStep(action.payload.spaceframe);
        if (original != null && s.spaceframeModel?.scale < original?.scale) {
          s.pruneExcessTalents();
        }
        s.spaceframeStep.variant = action.payload.variant;
      });
    case SET_STARSHIP_SPACEFRAME_TALENTS:
      return withStarship(state, action, (s, action) => {
        const newStep = s.spaceframeStep.copy();
        newStep.talents = action.payload.talents;
        s.spaceframeStep = newStep;
      });
    case SET_STARSHIP_MISSION_PROFILE:
      return withStarship(state, action, (s, action) => {
        const original = s.missionProfileStep;
        s.missionProfileStep = new MissionProfileStep(
          action.payload.missionProfile,
        );
        if (original?.type?.id === s.missionProfileStep?.type?.id) {
          s.missionProfileStep.system = original?.system;
          s.missionProfileStep.talent = original?.talent;
        }
        if (action.payload.system != null) {
          s.missionProfileStep.system = action.payload.system;
        }
      });
    case SET_STARSHIP_MISSION_PROFILE_TALENT:
      return withStarship(state, action, (s, action) => {
        if (s.missionProfileStep) {
          s.missionProfileStep.talent = action.payload.talent;
        }
      });
    case SET_STARSHIP_MISSION_POD:
      return withStarship(state, action, (s, action) => {
        s.missionPodModel = action.payload.missionPod;
        if (s.missionPodModel == null) {
          s.missionPodReplacements = [];
        } else {
          const replacements = (action.payload.replacements ?? []).map((r) =>
            r?.copy(),
          );
          while (replacements.length < s.missionPodModel.talents.length) {
            replacements.push(undefined);
          }
          s.missionPodReplacements = replacements;
        }
        if (s.missionPodModel) {
          const podTalentNames = s.missionPodModel.talents.map((t) => t.name);
          s.additionalTalents = s.additionalTalents.filter(
            (t) => !podTalentNames.includes(t.name),
          );
          s.pruneExcessTalents();
        }
      });
    case ADD_STARSHIP_REFIT:
      return withStarship(state, action, (s, action) => {
        const refits = [...s.refits, action.payload.refit];
        while (refits.length > s.numberOfRefits) {
          refits.splice(0, 1);
        }
        s.refits = refits;
      });
    case DELETE_STARSHIP_REFIT:
      return withStarship(state, action, (s, action) => {
        const refits = [...s.refits];
        const index = refits.indexOf(action.payload.refit);
        if (index >= 0) {
          refits.splice(index, 1);
        }
        s.refits = refits;
      });
    case SET_STARSHIP_REGISTRY:
      return withStarship(state, action, (s, action) => {
        s.registry = action.payload.registry;
      });
    case SET_STARSHIP_TRAITS:
      return withStarship(state, action, (s, action) => {
        s.traits = action.payload.traits;
      });
    case SET_ADDITIONAL_TALENTS:
      return withStarship(state, action, (s, action) => {
        s.additionalTalents =
          action.payload.talents?.map((t) => t.copy()) ?? [];
      });
    case ADD_STARSHIP_WEAPON:
      return withStarship(state, action, (s, action) => {
        s.additionalWeapons.push(action.payload.weapon);
      });
    case DELETE_STARSHIP_WEAPON:
      return withStarship(state, action, (s, action) => {
        if (s.additionalWeapons.indexOf(action.payload.weapon) >= 0) {
          s.additionalWeapons.splice(
            s.additionalWeapons.indexOf(action.payload.weapon),
            1,
          );
        }
      });
    case CHANGE_STARSHIP_SIMPLE_SYSTEM:
      return withStarship(state, action, (s, action) => {
        if (s.simpleStats == null) {
          s.simpleStats = new SimpleStats();
        }
        s.simpleStats.systems[action.payload.system] += action.payload.delta;
      });
    case CHANGE_STARSHIP_SPACEFRAME_SYSTEM:
      return withStarship(state, action, (s, action) => {
        if (s?.spaceframeModel?.isCustom) {
          const original = s.spaceframeStep;
          const spaceframe = s.spaceframeModel.copy();
          spaceframe.systems[action.payload.system] += action.payload.delta;
          s.spaceframeStep = new SpaceframeStep(spaceframe);
          if (original?.appearance != null) {
            s.spaceframeStep.appearance = original.appearance;
          }
        }
      });
    case CHANGE_STARSHIP_SIMPLE_DEPARTMENT:
      return withStarship(state, action, (s, action) => {
        if (s.simpleStats == null) {
          s.simpleStats = new SimpleStats();
        }
        s.simpleStats.departments[action.payload.department] +=
          action.payload.delta;
      });
    case CHANGE_STARSHIP_SPACEFRAME_DEPARTMENT:
      return withStarship(state, action, (s, action) => {
        if (s?.spaceframeModel?.isCustom) {
          const original = s.spaceframeStep;
          const spaceframe = s.spaceframeModel.copy();
          spaceframe.departments[action.payload.department] +=
            action.payload.delta;
          s.spaceframeStep = new SpaceframeStep(spaceframe);
          if (original?.appearance != null) {
            s.spaceframeStep.appearance = original.appearance;
          }
        }
      });
    case SET_STARSHIP_SPACEFRAME_APPEARANCE:
      return withStarship(state, action, (s, action) => {
        if (s.simpleStats != null) {
          s.simpleStats.appearance = action.payload.appearance;
        } else if (s?.spaceframeModel?.isCustom) {
          s.spaceframeStep.appearance = action.payload.appearance;
        }
      });
    case NEXT_STARSHIP_WORKFLOW_STEP: {
      if (state.workflow) {
        const w = new ShipBuildWorkflow(state.workflow.steps);
        w.currentStepIndex = state.workflow.currentStepIndex + 1;
        return {
          ...state,
          workflow: w,
        };
      } else {
        return;
      }
    }
    case REWIND_TO_STARSHIP_WORKFLOW_STEP: {
      if (state.workflow) {
        const w = new ShipBuildWorkflow(state.workflow.steps);
        w.currentStepIndex = action.payload.index;
        return {
          ...state,
          workflow: w,
        };
      } else {
        return;
      }
    }
    default:
      return state;
  }
};

export default starshipReducer;
