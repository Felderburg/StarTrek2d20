import { Station } from "../common/station"
import { Department } from "../helpers/department";
import { MissionProfile } from "../helpers/missionProfiles";
import { System } from "../helpers/systems";

export const CREATE_STATION = "CREATE_STATION";
export const SET_STATION_MISSION_PROFILE = "SET_STATION_MISSION_PROFILE";
export const SET_STATION_NAME = "SET_STATION_NAME";
export const SET_STATION_TRAITS = "SET_STATION_TRAITS";
export const SET_STATION_CUSTOM_SCALE = "SET_STATION_CUSTOM_SCALE";
export const MODIFY_STATION_CUSTOM_FRAME_SYSTEM = "MODIFY_STATION_CUSTOM_FRAME_SYSTEM";
export const MODIFY_STATION_CUSTOM_FRAME_DEPARTMENT = "MODIFY_STATION_CUSTOM_FRAME_DEPARTMENT";

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

export function setStationCustomScale(scale: number) {
    let payload = { scale: scale }
    return {
        type: SET_STATION_CUSTOM_SCALE,
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

export function changeStationCustomFrameSystem(delta: number, system: System) {
    let payload = { delta: delta, system: system }
    return {
        type: MODIFY_STATION_CUSTOM_FRAME_SYSTEM,
        payload: payload
    }
}

export function changeStationCustomFrameDepartment(delta: number, department: Department) {
    let payload = { delta: delta, department: department }
    return {
        type: MODIFY_STATION_CUSTOM_FRAME_DEPARTMENT,
        payload: payload
    }
}