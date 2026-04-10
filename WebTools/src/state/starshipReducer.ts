import { Stereotype } from "../common/construct";
import { SelectedTalent } from "../common/selectedTalent";
import { MissionProfileStep, ServiceRecordStep, SimpleStats, SpaceframeStep, Starship, StarshipAdvancementStep } from "../common/starship";
import { StarshipAdvancementChoice } from "../common/starshipAdvancementChoice";
import { System } from "../helpers/systems";
import { ShipBuildWorkflow } from "../starship/model/shipBuildWorkflow";
import { ADD_STARSHIP_REFIT, ADD_STARSHIP_WEAPON, CHANGE_STARSHIP_SCALE, CHANGE_STARSHIP_SIMPLE_CLASS_NAME, CHANGE_STARSHIP_SIMPLE_DEPARTMENT, CHANGE_STARSHIP_SIMPLE_SYSTEM, CHANGE_STARSHIP_SPACEFRAME_CLASS_NAME, CHANGE_STARSHIP_SPACEFRAME_DEPARTMENT, CHANGE_STARSHIP_SPACEFRAME_SCALE, CHANGE_STARSHIP_SPACEFRAME_SERVICE_YEAR, CHANGE_STARSHIP_SPACEFRAME_SYSTEM, CREATE_NEW_STARSHIP, CREATE_STARSHIP, DELETE_STARSHIP_REFIT, DELETE_STARSHIP_WEAPON, MODIFY_STARSHIP_ADD_ADVANCEMENT, NEXT_STARSHIP_WORKFLOW_STEP, REWIND_TO_STARSHIP_WORKFLOW_STEP, SET_ADDITIONAL_TALENTS, SET_STARSHIP_MISSION_POD, SET_STARSHIP_MISSION_PROFILE, SET_STARSHIP_MISSION_PROFILE_TALENT, SET_STARSHIP_NAME, SET_STARSHIP_REGISTRY, SET_STARSHIP_SERVICE_RECORD, SET_STARSHIP_SERVICE_YEAR, SET_STARSHIP_SPACEFRAME, SET_STARSHIP_SPACEFRAME_APPEARANCE, SET_STARSHIP_SPACEFRAME_TALENTS, SET_STARSHIP_TRAITS } from "./starshipActions";

interface StarshipState {
    starship?: Starship;
    workflow?: ShipBuildWorkflow;
    hash?: number;
}

const starshipReducer = (state: StarshipState = { starship: undefined, workflow: undefined, hash: undefined }, action) => {
    switch (action.type) {
        case CREATE_STARSHIP: {
            let s = action.payload.starship;
            let hash = action.payload.hash;
            return {
                ...state,
                starship: s.copy(),
                hash: hash
            }
        }

        case MODIFY_STARSHIP_ADD_ADVANCEMENT: {
            let temp = state.starship.copy();
            let improvement = new StarshipAdvancementStep();
            improvement.choice = action.payload.type;
            if (action.payload.type === StarshipAdvancementChoice.Talent) {
                improvement.value = (action.payload.value as SelectedTalent).copy();
                if (action.payload.remove != null) {
                    improvement.removeValue = (action.payload.remove as SelectedTalent).copy();
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
                starship: temp
            }
        }

        case CREATE_NEW_STARSHIP: {
            let s = Starship.createStandardStarship(action.payload.era, action.payload.type, action.payload.version);
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
                hash: undefined
            }
        }
        case CHANGE_STARSHIP_SCALE: {
            let s = state.starship.copy();
            if (s.simpleStats == null) {
                s.simpleStats = new SimpleStats();
            }
            s.simpleStats.scale += action.payload.delta;
            s.pruneExcessTalents();
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SPACEFRAME_SCALE: {
            let s = state.starship.copy();
            if (s?.spaceframeModel?.isCustom) {
                let spaceframe = s.spaceframeModel.copy();
                spaceframe.scale += action.payload.delta;
                s.spaceframeModel = spaceframe;
            }
            s.pruneExcessTalents();
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SPACEFRAME_SERVICE_YEAR: {
            let s = state.starship.copy();
            if (s?.spaceframeModel?.isCustom) {
                let spaceframe = s.spaceframeModel.copy();
                spaceframe.serviceYear = action.payload.serviceYear;
                s.spaceframeModel = spaceframe;
            }
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_SERVICE_YEAR: {
            let s = state.starship.copy();
            s.serviceYear = action.payload.serviceYear;
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SPACEFRAME_CLASS_NAME: {
            let s = state.starship.copy();
            if (s?.spaceframeModel?.isCustom) {
                let spaceframe = s.spaceframeModel.copy();
                spaceframe.name = action.payload.className;
                s.spaceframeModel = spaceframe;
            }
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SIMPLE_CLASS_NAME: {
            let s = state.starship.copy();
            if (s.simpleStats == null) {
                s.simpleStats = new SimpleStats();
            }
            s.simpleStats.className = action.payload.className;
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_NAME: {
            let s = state.starship.copy();
            s.name = action.payload.name;
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_SERVICE_RECORD: {
            let s = state.starship.copy();
            if (action.payload.serviceRecord == null) {
                s.serviceRecordStep = null;
            } else {
                let original = s.serviceRecordStep;
                s.serviceRecordStep = new ServiceRecordStep(action.payload.serviceRecord);
                s.serviceRecordStep.specialRule = action.payload.talent;
                if (original?.type?.type === s.serviceRecordStep.type.type) {
                    s.serviceRecordStep.selection = original.selection;
                    s.serviceRecordStep.system = original.system;
                }
                if (action.payload.selection != null) {
                    if (typeof action.payload.selection === 'string') {
                        s.serviceRecordStep.selection = action.payload.selection as string;
                    } else {
                        s.serviceRecordStep.system = action.payload.selection as System;
                    }
                }
                if (action.payload.removedTalent != null) {
                    s.serviceRecordStep.removedTalent = action.payload.removedTalent;
                }
                if (action.payload.replacedTalent != null) {
                    s.serviceRecordStep.selectedTalent = action.payload.replacedTalent.copy();
                }
            }
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_SPACEFRAME: {
            let s = state.starship.copy();
            let original = s.spaceframeModel;
            s.spaceframeStep = new SpaceframeStep(action.payload.spaceframe);
            if (original != null && s.spaceframeModel?.scale < original?.scale) {
                s.pruneExcessTalents();
            }
            s.spaceframeStep.variant = action.payload.variant;
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_SPACEFRAME_TALENTS: {
            let s = state.starship.copy();

            let newStep = s.spaceframeStep.copy();
            newStep.talents = action.payload.talents;
            s.spaceframeStep = newStep;
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_MISSION_PROFILE: {
            let s = state.starship.copy();
            const original = s.missionProfileStep;
            s.missionProfileStep = new MissionProfileStep(action.payload.missionProfile);
            if (original?.type?.id === s.missionProfileStep?.type?.id) {
                s.missionProfileStep.system = original?.system;
                s.missionProfileStep.talent = original?.talent;
            }
            if (action.payload.system != null) {
                s.missionProfileStep.system = action.payload.system;
            }
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_MISSION_PROFILE_TALENT: {
            let s = state.starship.copy();
            if (s.missionProfileStep) {
                s.missionProfileStep.talent = action.payload.talent;
            }
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_MISSION_POD: {
            let s = state.starship.copy();
            s.missionPodModel = action.payload.missionPod;
            return {
                ...state,
                starship: s
            }
        }
        case ADD_STARSHIP_REFIT: {
            let s = state.starship.copy();
            let refits = [...s.refits, action.payload.refit];
            while (refits.length > s.numberOfRefits) {
                refits.splice(0, 1);
            }
            s.refits = refits;
            return {
                ...state,
                starship: s
            }
        }
        case DELETE_STARSHIP_REFIT: {
            let s = state.starship.copy();
            let refits = [...s.refits];
            let index = refits.indexOf(action.payload.refit);
            if (index >= 0) {
                refits.splice(index, 1);
            }
            s.refits = refits;
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_REGISTRY: {
            let s = state.starship.copy();
            s.registry = action.payload.registry;
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_TRAITS: {
            let s = state.starship.copy();
            s.traits = action.payload.traits;
            return {
                ...state,
                starship: s
            }
        }
        case SET_ADDITIONAL_TALENTS: {
            let s = state.starship.copy();
            s.additionalTalents = action.payload.talents?.map(t => t.copy()) ?? [];
            return {
                ...state,
                starship: s
            }
        }
        case ADD_STARSHIP_WEAPON: {
            let s = state.starship.copy();
            s.additionalWeapons.push(action.payload.weapon);
            return {
                ...state,
                starship: s
            }
        }
        case DELETE_STARSHIP_WEAPON: {
            let s = state.starship.copy();
            if (s.additionalWeapons.indexOf(action.payload.weapon) >= 0) {
                s.additionalWeapons.splice(s.additionalWeapons.indexOf(action.payload.weapon), 1);
            }
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SIMPLE_SYSTEM: {
            let s = state.starship.copy();
            if (s.simpleStats == null) {
                s.simpleStats = new SimpleStats();
            }
            s.simpleStats.systems[action.payload.system] += action.payload.delta;
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SPACEFRAME_SYSTEM: {
            let s = state.starship.copy();
            if (s?.spaceframeModel?.isCustom) {
                let spaceframe = s.spaceframeModel.copy();
                spaceframe.systems[action.payload.system] += action.payload.delta;
                s.spaceframeModel = spaceframe;
            }
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SIMPLE_DEPARTMENT: {
            let s = state.starship.copy();
            if (s.simpleStats == null) {
                s.simpleStats = new SimpleStats();
            }
            s.simpleStats.departments[action.payload.department] += action.payload.delta;
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SPACEFRAME_DEPARTMENT: {
            let s = state.starship.copy();
            if (s?.spaceframeModel?.isCustom) {
                let spaceframe = s.spaceframeModel.copy();
                spaceframe.departments[action.payload.department] += action.payload.delta;
                s.spaceframeModel = spaceframe;
            }
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_SPACEFRAME_APPEARANCE: {
            let s = state.starship.copy();
            if (s?.spaceframeModel?.isCustom) {
                s.spaceframeStep.appearance = action.payload.appearance;
            }
            return {
                ...state,
                starship: s
            }
        }
        case NEXT_STARSHIP_WORKFLOW_STEP: {
            if (state.workflow) {
                let w = new ShipBuildWorkflow(state.workflow.steps);
                w.currentStepIndex = state.workflow.currentStepIndex + 1;
                return {
                    ...state,
                    workflow: w
                }
            } else {
                return
            }
        }
        case REWIND_TO_STARSHIP_WORKFLOW_STEP: {
            if (state.workflow) {
                let w = new ShipBuildWorkflow(state.workflow.steps);
                w.currentStepIndex = action.payload.index;
                return {
                    ...state,
                    workflow: w
                }
            } else {
                return
            }
        }
        default:
            return state;
    }
};

export default starshipReducer;