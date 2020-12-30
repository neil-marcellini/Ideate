import {
    IDEA_CREATED, 
    IDEA_FAIL, 
    IDEAS_FETCHED, 
    IDEA_ITERATION_RATED, 
    IDEA_COMMENT_ADDED,
    IDEA_ALL_COMMENTS,
    IDEA_SEE_LESS,
    IDEAS_FOR_TOPIC,
    IDEAS_CLEARED,
    IDEA_ITERATION_ADDED,
    IDEA_COMMENT_DELETED
} from '../actions/types'

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

const commentWithId = (comment_id, comments) => {
    var i
    for (i = 0; i < comments.length; i++) {
        const comment = comments[i]
        if (comment.comment_id === comment_id){
            break
        }
    }
    return i
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
            const comment_idea_i = ideaWithIteration(comment.iteration_id, state)
            var comment_replace_idea = state.ideas[comment_idea_i]
            var new_comment = {
                ...comment
            }
            comment_replace_idea.comments.push(new_comment)
            const comment_new_ideas = getNewIdeas(comment_replace_idea, comment_idea_i, state)
            return {
                msg: action.payload.msg,
                ideas: comment_new_ideas
            }
        case IDEA_COMMENT_DELETED:
            console.log("comment_deleted", action.payload)
            const delete_comment = action.payload.comment
            const del_idea_i = ideaWithIteration(delete_comment.iteration_id, state)
            var idea_to_update = state.ideas[del_idea_i]
            // remove that comment from the idea's comments list
            var comment_index = commentWithId(delete_comment.comment_id, idea_to_update.comments)
            idea_to_update.comments.splice(comment_index, 1)
            const new_ideas = getNewIdeas(idea_to_update, del_idea_i, state)
            return {
                msg: action.payload.msg,
                ideas: new_ideas
            }
            
        case IDEA_ALL_COMMENTS:
            const iteration_comments = action.payload.comments
            const iac_iteration_id = parseInt(action.payload.iteration_id)
            // find idea with matching iteration_id
            const comment_iteration_i = ideaWithIteration(iac_iteration_id, state)
            var more_comments_idea = state.ideas[comment_iteration_i]
            more_comments_idea.comments = iteration_comments
            const updated_ideas = getNewIdeas(more_comments_idea, comment_iteration_i, state)
            return {
                msg: action.payload.msg,
                ideas: updated_ideas
            }
        case IDEA_SEE_LESS:
            const see_less_i = ideaWithIteration(action.payload.iteration_id, state)
            var see_less_idea = state.ideas[see_less_i]
            var old_comments = see_less_idea.comments
            see_less_idea.comments = [old_comments.pop()]
            const less_idea_comments = getNewIdeas(see_less_idea, see_less_i, state)
            return {
                msg: "see less comments on idea",
                ideas: less_idea_comments
            }
        case IDEAS_FOR_TOPIC:
            return {
                msg: action.payload.msg,
                ideas: action.payload.ideas
            }
        case IDEAS_CLEARED:
            return {
                msg: "Ideas cleared",
                ideas: []
            }
        case IDEA_ITERATION_ADDED:
            console.log(action.payload)
            const iterated_ideas = updateIteration(action.payload, state)
            return {
                msg: action.payload.msg,
                ideas: iterated_ideas
            }
        default:
            return state
    }
}


const updateIteration = (iteration, state) => {
    const idea_index = state.ideas.findIndex(idea => idea.idea_id = iteration.idea_id)
    var update_idea = state.ideas[idea_index]
    update_idea.potential_difficulty = iteration.potential_difficulty
    update_idea.potential_brightness = iteration.potential_brightness
    update_idea.iteration_id = iteration.iteration_id
    update_idea.iteration_description = iteration.iteration_description
    return getNewIdeas(update_idea, idea_index, state)
}

