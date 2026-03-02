import { Station } from "../common/station"
import { MissionProfile } from "../helpers/missionProfiles";

export const CREATE_STATION = "CREATE_STATION";
export const SET_STATION_MISSION_PROFILE = "SET_STATION_MISSION_PROFILE";

export function createStation(station: Station) {
    let payload = { station: station }
    return {
        type: CREATE_STATION,
        payload: payload
    }
}

export function setStationMissionProfile(missionProfile: MissionProfile) {
    let payload = { missionProfile: missionProfile }
    return {
        type: SET_STATION_MISSION_PROFILE,
        payload: payload
    }
}