import { TableCollection } from "../table/model/table";

export const IMPORT_TABLE_COLLECTION = 'IMPORT_TABLE_COLLECTION';
export const ADD_TABLE_COLLECTION = 'ADD_TABLE_COLLECTION';
export const SET_TABLE_COLLECTION_SELECTION = 'SET_TABLE_COLLECTION_SELECTION';
export const SET_TABLE_FOR_EDITING = 'SET_TABLE_FOR_EDITING';
export const SAVE_EDITED_TABLE = 'SAVE_EDITED_TABLE';

export function setTableCollectionSelection(selection: TableCollection) {
    let payload = { selection: selection };
    return {
       type: SET_TABLE_COLLECTION_SELECTION,
       payload: payload
    }
}


export function importTableCollection(collection: TableCollection) {
    let payload = { collection: collection };
    return {
       type: IMPORT_TABLE_COLLECTION,
       payload: payload
    }
}


export function setTableForEditing(collection: TableCollection) {
    let payload = { collection: collection };
    return {
       type: SET_TABLE_FOR_EDITING,
       payload: payload
    }
}

export function addTableCollection(collection: TableCollection) {
    let payload = { collection: collection };
    return {
       type: ADD_TABLE_COLLECTION,
       payload: payload
    }
}

export function saveEditedTable() {
    let payload = {};
    return {
       type: SAVE_EDITED_TABLE,
       payload: payload
    }
}