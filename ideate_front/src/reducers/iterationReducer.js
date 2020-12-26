// Neil Marcellini
import {LATEST_ITERATION, LATEST_ITERATION_FAIL } from '../actions/types'

const initalState = {
    msg: "",
    iteration: null
}

export default function(state = initalState, action) {
    switch(action.type) {
        case LATEST_ITERATION:
            return {
                msg: action.payload.msg,
                iteration: action.payload.iteration
            }
        case LATEST_ITERATION_FAIL:
            return {
                msg: "",
                iteration: null
            }
        default:
            return state
    }
}
