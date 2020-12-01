import {IDEA_CREATED, IDEA_FAIL, IDEAS_FETCHED, IDEA_ITERATION_RATED} from '../actions/types'

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
            return {
                msg: action.payload.msg,
                ideas: action.payload.ideas
            }
        case IDEA_ITERATION_RATED:
            // find idea with matching iteration_id
            const iteration_id = action.payload.iteration_id
            var i
            for (i = 0; i < state.ideas.length; i++) {
                const idea = state.ideas[i]
                if (idea.iteration_id === iteration_id){
                    break
                }
            }
            var replace_idea = state.ideas[i]
            replace_idea.potential_brightness = action.payload.potential_brightness
            replace_idea.potential_difficulty = action.payload.potential_difficulty
            const new_ideas = [...state.ideas]
            new_ideas.splice(i, 1, replace_idea)
            return {
                msg: action.payload.msg,
                ideas: new_ideas
            }

        default:
            return state
    }
}