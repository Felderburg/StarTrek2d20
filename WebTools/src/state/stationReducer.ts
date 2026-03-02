import { Station, StationMissionProfileStep } from "../common/station";
import { CREATE_STATION, SET_STATION_MISSION_PROFILE } from "./stationActions";

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

        default:
           return state;
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
    }

}

export default stationReducer;