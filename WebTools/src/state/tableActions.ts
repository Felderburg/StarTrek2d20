import { TableCollection } from "../table/model/table";

export const IMPORT_TABLE_COLLECTION = 'IMPORT_TABLE_COLLECTION';
export const ADD_TABLE_COLLECTION = 'ADD_TABLE_COLLECTION';
export const SET_TABLE_COLLECTION_SELECTION = 'SET_TABLE_COLLECTION_SELECTION';
export const SET_TABLE_FOR_EDITING = 'SET_TABLE_FOR_EDITING';
export const REPLACE_TABLE_COLLECTION = 'REPLACE_TABLE_COLLECTION';
export const DELETE_TABLE_COLLECTION = "DELETE_TABLE_COLLECTION";

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

export function deleteTableCollection(collection: TableCollection) {
    let payload = { collection: collection };
    return {
       type: DELETE_TABLE_COLLECTION,
       payload: payload
    }
}

export function replaceTableCollection(uuid: string, collection: TableCollection) {
    let payload = {
        uuid: uuid,
        collection: collection
    };
    return {
       type: REPLACE_TABLE_COLLECTION,
       payload: payload
    }
}