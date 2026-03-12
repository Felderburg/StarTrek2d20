import { SelectedTalent } from "../common/selectedTalent";
import { Station } from "../common/station"
import { Department } from "../helpers/department";
import { MissionProfile } from "../helpers/missionProfiles";
import { StationFrame } from "../helpers/stationFrame";
import { System } from "../helpers/systems";
import { Weapon } from "../helpers/weapons";

export const CREATE_STATION = "CREATE_STATION";
export const SET_STATION_MISSION_PROFILE = "SET_STATION_MISSION_PROFILE";
export const SET_STATION_NAME = "SET_STATION_NAME";
export const SET_STATION_TRAITS = "SET_STATION_TRAITS";
export const SET_STATION_CUSTOM_SCALE = "SET_STATION_CUSTOM_SCALE";
export const MODIFY_STATION_CUSTOM_FRAME_SYSTEM = "MODIFY_STATION_CUSTOM_FRAME_SYSTEM";
export const MODIFY_STATION_CUSTOM_FRAME_DEPARTMENT = "MODIFY_STATION_CUSTOM_FRAME_DEPARTMENT";
export const ADD_STATION_WEAPON = "ADD_STATION_WEAPON";
export const DELETE_STATION_WEAPON = "DELETE_STATION_WEAPON";
export const SET_STATION_MISSION_PROFILE_TALENT = "SET_STATION_MISSION_PROFILE_TALENT";
export const SET_STATION_ADDITIONAL_TALENTS = "SET_STATION_ADDITIONAL_TALENTS";
export const SET_STATION_FRAME = "SET_STATION_FRAME";

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

export function setStationMissionProfileTalent(talent: SelectedTalent) {
    let payload = { talent: talent };
    return {
       type: SET_STATION_MISSION_PROFILE_TALENT,
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

export function addStationWeapon(weapon: Weapon) {
    let payload = { weapon: weapon };
    return {
       type: ADD_STATION_WEAPON,
       payload: payload
    }
}

export function deleteStationWeapon(weapon: Weapon) {
    let payload = { weapon: weapon };
    return {
       type: DELETE_STATION_WEAPON,
       payload: payload
    }
}

export function setStationAdditionalTalents(talents: SelectedTalent[]) {
    let payload = { talents: talents };
    return {
       type: SET_STATION_ADDITIONAL_TALENTS,
       payload: payload
    }
}

export function setStationFrame(frame: StationFrame) {
    let payload = { frame: frame }
    return {
       type: SET_STATION_FRAME,
       payload: payload
    }
}