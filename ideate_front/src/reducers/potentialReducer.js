import {POTENTIAL_UPDATED} from '../actions/types'

const initalState = {
    "x": 50,
    "y": 50
    
}

export default function(state = initalState, action) {
    switch(action.type) {
        case POTENTIAL_UPDATED:
            return {
                x: action.payload.x,
                y: action.payload.y,
            }
        default:
            return state
    }
}