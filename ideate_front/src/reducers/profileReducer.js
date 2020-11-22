import {PROFILE_CREATED, PROFILE_FAIL} from '../actions/types'

const initalState = {
    field: "",
    msg: {}
}

export default function(state = initalState, action) {
    switch(action.type) {
        case PROFILE_CREATED:
            return {
                field: action.payload.field,
                msg: action.payload.msg,
            }
        case PROFILE_FAIL:
            return {
                field: "",
                msg: {}
            }
        default:
            return state
    }
}