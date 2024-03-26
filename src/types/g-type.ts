import GFN from '../g_fn';
import { api } from '../stdlib/interfaces';
import type {ACTION} from './actions';
import { FUNCTIONS } from './functions';
import { T_QUERY_PARAMS, T_QUERY_PARAMS_LEVEL_1 } from './query';

export interface G_TYPE {
    actions: {[name: string]: ACTION} // functions specific to some events
    fns: {[name: string]: FUNCTIONS} // general functions
    g_fn: typeof GFN
    api: api
}

export type OBJ_WITH_ID = {
    id: string|number,
    [k:string]: any
}

export type GET_MANY_RESULT = {
    params: T_QUERY_PARAMS, // qid is mostly hash or this so we keep a copy for debugging
    queried_at: number,
    data: OBJ_WITH_ID[],
    errors?: string[],
    warnings?: string[],
}


export type PROP_EVENT_NAME             = "set_prop" | "update_prop" | "delete_prop" 
export type ONE_ENTITY_EVENT_NAME       = "set" | "update" | "delete" | "select"
export type MANY_ENTITY_EVENT_NAME      = "set" | "update" | "delete"
export type SELECT_ENTITY_EVENT_NAME    = "select" | "deselect"
export type DRAFT_EVENT_NAME            = "set" | "update" | "delete" | "relation_set" | "relation_update" | "relation_delete"
export type QUERY_PARAMS_EVENT_NAME     = "changed" | "filter_changed" | "limit_changed" | "sort_changed" 
// set is when we are setting the data for the first time
// update is change in the data



// export type ENTITY_EVENT_NAME = 'set' | 'set_prop' | 'delete' | 'delete_prop' | 'select';
// export type COLLECTION_EVENT_NAME = 'set';

export type ONE_ENTITY_EVENT_TYPE = {
    type: "ONE_ENTITY_EVENT",
    name: ONE_ENTITY_EVENT_NAME | PROP_EVENT_NAME,
    mid: string,                        // model id
    eid: string|number,                 // entity id
    cid?: string,                       // component id
    data: OBJ_WITH_ID

    props? : string[],                  // when props are changed
}

export type SELECT_EVENT_TYPE = {
    type : "SELECT_EVENT",
    name: SELECT_ENTITY_EVENT_NAME,
    mid: string,
    cid?: string,                       // component id is not required to select or deselect
    eids : (string|number)[]
}

export type MANY_ENTITY_EVENT_TYPE = {
    type: "MANY_ENTITY_EVENT",
    name: MANY_ENTITY_EVENT_NAME,
    mid: string,                        // model id
    cid?: string,                       // component id
    idx?: number,                       // component index when inside a map

    qid?: string,                       // query id

    // params: we will not send qparams -> it's already included in data: GET_MANY_RESULT
    data: GET_MANY_RESULT

    // which entities are changed
    eids? : (string|number)[],          
}

export type QUERY_PARAMS_EVENT_TYPE = {
    type: "QUERY_PARAMS_EVENT",
    name: QUERY_PARAMS_EVENT_NAME,
    mid: string,
    cid: string,
    data: T_QUERY_PARAMS
}

// export type FILTER_EVENT_TYPE = {
//     type: 'filter',
//     model_id: string,
//     comp_id: string,
//     params: T_QUERY_PARAMS_LEVEL_1,
// }

export type MESSAGE_EVENT_TYPE = {
    type: "MESSAGE_EVENT",
    level: "error"|"warning"|"debug"|"log"|"verbose",
    mid: string,
    cid?:string,
    eid?: string,
    message : "CREATED" | "CREATING" | "CREATE_FAILED" | "UPDATED" | "UPDATING" | "UPDATE_FAILED" | "DELETED" | "DELETING" | "DELETE_FAILED" | "FETCHED" | "FETCHING" | "FETCH_FAILED"
    data : any
}

export type DRAFT_EVENT_TYPE = {
    type : "DRAFT_EVENT",
    name : DRAFT_EVENT_NAME,
    mid : string,
    did : string,
    data : OBJ_WITH_ID,

    props? : string[], // what props are changed
}








export type UPDATE_BODY = {
    id : string,
    add : {
        [key : string] : any
    },
    delete : {
        [key : string] : any
    }
}

export type OBJECT_TYPE = {
    [key : string] : any
}