import {POTENTIAL_UPDATED, POTENTIAL_RATED} from '../actions/types'

const initalState = {
    x: 50,
    y: 50,
    isRating: false   
}

export default function(state = initalState, action) {
    switch(action.type) {
        case POTENTIAL_UPDATED:
            return {
                x: action.payload.x,
                y: action.payload.y,
                isRating: false
            }
        case POTENTIAL_RATED:
            return {
                x: Math.round(action.payload.x),
                y: Math.round(action.payload.y),
                isRating: true
            }
        
        default:
            return state
    }
}