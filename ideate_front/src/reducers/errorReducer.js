import {GET_ERRORS, CLEAR_ERRORS} from '../actions/types'

const initalState = {
    field: "",
    msg: {},
    status: null,
    id: null
}

export default function(state = initalState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return {
                field: action.payload.field,
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }
        case CLEAR_ERRORS:
            return {
                field: "",
                msg: {},
                status: null,
                id: null
            }
        default:
            return state
    }
}