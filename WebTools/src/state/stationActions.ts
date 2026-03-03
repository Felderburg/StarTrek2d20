import { Station } from "../common/station"
import { MissionProfile } from "../helpers/missionProfiles";

export const CREATE_STATION = "CREATE_STATION";
export const SET_STATION_MISSION_PROFILE = "SET_STATION_MISSION_PROFILE";
export const SET_STATION_NAME = "SET_STATION_NAME";
export const SET_STATION_TRAITS = "SET_STATION_TRAITS";

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

export function setStationName(name: String) {
    let payload = { name: name }
    return {
        type: SET_STATION_NAME,
        payload: payload
    }
}

export function setStationTraits(traits: String[]) {
    let payload = { traits: traits }
    return {
        type: SET_STATION_TRAITS,
        payload: payload
    }
}