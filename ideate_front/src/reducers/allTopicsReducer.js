import { ALL_TOPICS_LOADED } from '../actions/types'

const initalState = {
    msg: null,
    topics: []
}

export default function(state = initalState, action) {
    switch(action.type) {
        case ALL_TOPICS_LOADED:
            return {
                msg: action.payload.msg,
                topics: action.payload.topics
            }
        default:
            return state
    }
}