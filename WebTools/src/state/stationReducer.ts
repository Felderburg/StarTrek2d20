import { Station, StationMissionProfileStep } from "../common/station";
import { CREATE_STATION, SET_STATION_MISSION_PROFILE, SET_STATION_NAME, SET_STATION_TRAITS } from "./stationActions";

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
                s.missionProfileStep = new StationMissionProfileStep(action.payload.missionProfile);
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