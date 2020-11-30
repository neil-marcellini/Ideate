import {IDEA_CREATED, IDEA_FAIL, IDEAS_FETCHED} from '../actions/types'

const initalState = {
    msg: null,
    ideas: []
}

export default function(state = initalState, action) {
    switch(action.type) {
        case IDEA_CREATED:
        case IDEA_FAIL:
            return {
                ...state,
                msg: action.payload.msg,
            }
        case IDEAS_FETCHED:
            console.log(action.payload)
            return {
                msg: action.payload.msg,
                ideas: action.payload.ideas
            }
        default:
            return state
    }
}