import {PROFILE_CREATED, PROFILE_FAIL} from '../actions/types'

const initalState = {
    profile_name: localStorage.getItem('profile_name'),
    msg: null
}

export default function(state = initalState, action) {
    switch(action.type) {
        case PROFILE_CREATED:
            localStorage.setItem('profile_name', action.payload.profile_name)
            return {
                profile_name: action.payload.profile_name,
                msg: null,
            }
        case PROFILE_FAIL:
            return {
                profile_name: null,
                msg: action.payload.msg,
            }
        default:
            return state
    }
}