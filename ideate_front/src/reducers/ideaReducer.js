import {IDEA_CREATED, IDEA_FAIL} from '../actions/types'

const initalState = {
    idea_id: null,
    msg: null
}

export default function(state = initalState, action) {
    switch(action.type) {
        case IDEA_CREATED:
            return {
                idea_id: action.payload.profile_name,
                msg: null,
            }
        case IDEA_FAIL:
            return {
                idea_id: null,
                msg: action.payload.msg,
            }
        default:
            return state
    }
}