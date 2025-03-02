import { ILocalStorageConstructRecord } from "../common/iLocalStorageConstructRecord";
import { SAVE_CHARACTER_TO_LOCAL_STORAGE } from "./savedConstructActions";

const persistItems = (records: ILocalStorageConstructRecord[]) => {
    let data = {
        records: (records ?? [])
    }
    window.localStorage.setItem("constructs.records", JSON.stringify(data));
}

const getInitialData = () => {
    const base = { records: [] };
    let initialData = { ...base };
    try {
        let dataJson = window.localStorage.getItem("constructs.records");
        if (dataJson) {
            let data = JSON.parse(dataJson);
            if (data.records) {
                initialData.records = data.records;
            }
        }
    } catch (e) {
        // ignore
    }
    return initialData;
}

const savedConstructReducer = (state = getInitialData(), action) => {
    switch (action.type) {
        case SAVE_CHARACTER_TO_LOCAL_STORAGE: {
            let records = [...state.records];
            let hash = action.payload.hash;
            if (action.payload.replacementHash != null) {
                records = records.filter(r => r.hash !== action.payload.replacementHash);
            }
            if (records.filter(r => r.hash === hash).length === 0) {
                records.push({
                    type: action.payload.type,
                    marshalled: action.payload.marshalled,
                    hash: action.payload.hash,
                    name: action.payload.name
                });
            }

            if (records.length > 5) {
                records.splice(0, records.length - 5);
            }
            persistItems(records);
            return {
                records: records
            }
        }
        default:
            return state;
    }
}

export default savedConstructReducer;