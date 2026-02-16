import { Station } from "../common/station"

export const CREATE_STATION = "CREATE_STATION";

export function createStation(station: Station) {
    let payload = { station: station }
    return {
        type: CREATE_STATION,
        payload: payload
    }
}