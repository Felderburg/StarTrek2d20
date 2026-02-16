import { Station } from "../common/station";
import { CREATE_STATION } from "./stationActions";

interface StationState {
    station?: Station;
}

const stationReducer = (state: StationState = { station: undefined }, action) => {
    switch (action.type) {
        case CREATE_STATION: {
            let s = action.payload.station;
            return {
                ...state,
                station: s.copy()
            }
        }

        default:
           return state;
    }
}

export default stationReducer;