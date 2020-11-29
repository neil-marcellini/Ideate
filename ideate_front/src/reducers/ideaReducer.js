import {IDEA_CREATED, IDEA_FAIL} from '../actions/types'

const initalState = {
    msg: null
}

export default function(state = initalState, action) {
    switch(action.type) {
        case IDEA_CREATED:
        case IDEA_FAIL:
            return {
                msg: action.payload.msg,
            }
        default:
            return state
    }
}