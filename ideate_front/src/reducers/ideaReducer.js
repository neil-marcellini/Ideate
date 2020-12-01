import {IDEA_CREATED, IDEA_FAIL, IDEAS_FETCHED, IDEA_ITERATION_RATED, IDEA_COMMENT_ADDED} from '../actions/types'

const initalState = {
    msg: null,
    ideas: []
}

const ideaWithIteration = (iteration_id, state) => {
    var i
    for (i = 0; i < state.ideas.length; i++) {
        const idea = state.ideas[i]
        if (idea.iteration_id === iteration_id){
            break
        }
    }
    return i
}

const getNewIdeas = (replace_idea, i, state) => {
    const new_ideas = [...state.ideas]
    new_ideas.splice(i, 1, replace_idea)
    return new_ideas
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
            console.log(action.payload)
            const iteration_id = action.payload.iteration_id
            var rated_idea_i = ideaWithIteration(iteration_id, state)
            var rated_replace_idea = state.ideas[rated_idea_i]
            rated_replace_idea.potential_brightness = action.payload.potential_brightness
            rated_replace_idea.potential_difficulty = action.payload.potential_difficulty
            const rated_new_ideas = getNewIdeas(rated_replace_idea, rated_idea_i, state)
            return {
                msg: action.payload.msg,
                ideas: rated_new_ideas
            }
        case IDEA_COMMENT_ADDED:
            const comment = action.payload.comment
            // find idea with matching iteration_id
            console.log(comment)
            const comment_idea_i = ideaWithIteration(comment.iteration_id, state)
            var comment_replace_idea = state.ideas[comment_idea_i]
            var new_comment = {
                ...comment
            }
            // don't need iteration_id in comments list
            delete new_comment.iteration_id
            comment_replace_idea.comments.push(new_comment)
            const comment_new_ideas = getNewIdeas(comment_replace_idea, comment_idea_i, state)
            return {
                msg: action.payload.msg,
                ideas: comment_new_ideas
            }

        default:
            return state
    }
}