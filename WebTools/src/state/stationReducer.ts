import { CustomStationSpaceframeStep, Station, StationMissionProfileStep } from "../common/station";
import { ADD_STATION_WEAPON, CREATE_STATION, DELETE_STATION_WEAPON, MODIFY_STATION_CUSTOM_FRAME_DEPARTMENT, MODIFY_STATION_CUSTOM_FRAME_SYSTEM, SET_STATION_ADDITIONAL_TALENTS, SET_STATION_CUSTOM_SCALE, SET_STATION_MISSION_PROFILE, SET_STATION_MISSION_PROFILE_TALENT, SET_STATION_NAME, SET_STATION_TRAITS } from "./stationActions";

interface StationState {
    station?: Station;
}

const stationReducer = (state: StationState = { station: undefined }, action) => {
    switch (action.type) {
        case CREATE_STATION: {
            let s = action.payload.station;
            console.log("Create a station");
            return {
                ...state,
                station: s.copy()
            }
        }
        case SET_STATION_MISSION_PROFILE: {
            let s = state.station?.copy();
            if (s) {
                const original = s.missionProfileStep;
                s.missionProfileStep = new StationMissionProfileStep(action.payload.missionProfile);
                if (original?.type === s.missionProfileStep?.type) {
                    s.missionProfileStep.talent = original?.talent?.copy();
                }
            }
            return {
                ...state,
                station: s
            }
        }
        case SET_STATION_MISSION_PROFILE_TALENT: {
            let s = state.station.copy();
            if (s.missionProfileStep) {
                s.missionProfileStep.talent = action.payload.talent;
            }
            return {
                ...state,
                station: s
            }
        }
        case SET_STATION_NAME: {
            let s = state.station?.copy();
            if (s) {
                s.name = action.payload.name;
            }
            return {
                ...state,
                station: s
            }
        }
        case SET_STATION_CUSTOM_SCALE: {
            let s = state.station?.copy();
            if (s) {
                if (s.stationFrameStep == null || !(s.stationFrameStep instanceof CustomStationSpaceframeStep)) {
                    s.stationFrameStep = new CustomStationSpaceframeStep();
                }
                s.stationFrameStep.scale = action.payload.scale;

                for (let i = s.sumDepartmentPoints; i > s.totalAvailableDepartmentPoints; i = s.sumDepartmentPoints) {
                    let maxValue = 0;
                    let indexOfMax = 0;
                    for (let j = 0; j < s.departments.length; j++) {
                        if (s.departments[j] >= maxValue) {
                            maxValue = s.departments[j];
                            indexOfMax = j;
                        }
                    }
                    s.stationFrameStep.departments[indexOfMax] -= 1;
                }
                for (let i = s.sumSystemPoints; i > s.totalAvailableSystemPoints; i = s.sumSystemPoints) {
                    let maxValue = 0;
                    let indexOfMax = 0;
                    for (let j = 0; j < s.systems.length; j++) {
                        if (s.systems[j] >= maxValue) {
                            maxValue = s.systems[j];
                            indexOfMax = j;
                        }
                    }
                    s.stationFrameStep.systems[indexOfMax] -= 1;
                }
            }
            return {
                ...state,
                station: s
            }
        }
        case MODIFY_STATION_CUSTOM_FRAME_SYSTEM: {
            let s = state.station?.copy();
            if (s) {
                if (s.stationFrameStep == null || !(s.stationFrameStep instanceof CustomStationSpaceframeStep)) {
                    s.stationFrameStep = new CustomStationSpaceframeStep();
                }
                let system = action.payload.system;
                s.stationFrameStep.systems[system] += action.payload.delta;
                if (s.stationFrameStep.systems[system] > s.maxSystemValue) {
                    s.stationFrameStep.systems[system] = s.maxSystemValue;
                }

            }
            return {
                ...state,
                station: s
            }
        }
        case MODIFY_STATION_CUSTOM_FRAME_DEPARTMENT: {
            let s = state.station?.copy();
            if (s) {
                if (s.stationFrameStep == null || !(s.stationFrameStep instanceof CustomStationSpaceframeStep)) {
                    s.stationFrameStep = new CustomStationSpaceframeStep();
                }
                let department = action.payload.department;
                s.stationFrameStep.departments[department] += action.payload.delta;
                if (s.stationFrameStep.departments[department] > s.maxDepartmentValue) {
                    s.stationFrameStep.departments[department] = s.maxDepartmentValue;
                }
            }
            return {
                ...state,
                station: s
            }
        }
        case ADD_STATION_WEAPON: {
            let s = state.station?.copy();
            s.weapons.push(action.payload.weapon);
            return {
                ...state,
                station: s
            }
        }
        case DELETE_STATION_WEAPON: {
            let s = state.station?.copy();
            if (s.weapons.indexOf(action.payload.weapon) >= 0) {
                s.weapons.splice(s.weapons.indexOf(action.payload.weapon), 1);
            }
            return {
                ...state,
                station: s
            }
        }

        case SET_STATION_ADDITIONAL_TALENTS: {
            let s = state.station.copy();
            s.additionalTalents = action.payload.talents?.map(t => t.copy()) ?? [];
            return {
                ...state,
                station: s
            }
        }


        case SET_STATION_TRAITS: {
            let s = state.station?.copy();
            if (s) {
                s.traits = action.payload.traits;
            }
            return {
                ...state,
                station: s
            }
        }

        default:
           return state;
    }

}

export default stationReducer;