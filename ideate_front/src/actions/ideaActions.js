import {postOptions, postFormOptions} from '../fetch_config'
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
    IDEA_COMMENT_DELETED,
    IDEA_LATEST_COMMENT,
    IDEA_NEXT_ITERATION
} from './types'


export const createIdea = (formData) => dispatch => {
    var create_form_options = postFormOptions
    create_form_options.body = formData
    fetch('/api/idea', create_form_options)
        .then(res => {
            if (!res.ok) {
                dispatch({
                    type: IDEA_FAIL,
                    payload: res.statusText
                })
            }
            else {
                res = res.json()
                    .then(data => dispatch({
                        type: IDEA_CREATED,
                        payload: data
                    }))
            }
        })
}

export const getAllIdeas = () => dispatch => {
    fetch('/api/idea')
        .then(res => res.json())
        .then(data => dispatch({
            type: IDEAS_FETCHED,
            payload: data
        }))
}

export const rate = (data) => dispatch => {
    const rate_post_options = postOptions
    rate_post_options.body = JSON.stringify(data)
    fetch('/api/potential', data)
        .then(res => res.json())
        .then(data => dispatch({
            type: IDEA_ITERATION_RATED,
            payload: data
        }))
}

export const addComment = (data) =>  dispatch => {
    console.log("addComment data =", data)
    var comment_post_options = postOptions
    comment_post_options.body = JSON.stringify(data)
    console.log("addComment options = ", comment_post_options)
    fetch('/api/comment', comment_post_options)
        .then(res => res.json())
        .then(data => dispatch({
            type: IDEA_COMMENT_ADDED,
            payload: data
        }))
}

export const deleteComment = (comment) =>  dispatch => {
    const comment_id = comment.comment_id
    var delete_options = postOptions
    delete_options.method = "DELETE"
    delete_options.body = JSON.stringify({comment, comment_id})
    fetch("/api/comment", delete_options)
        .then(res => res.json())
        .then(data => dispatch({
            type: IDEA_COMMENT_DELETED,
            payload: data
        }))
}

export const fetchLatestComment = (iteration_id) =>  dispatch => {
    var latest_comment_options = postOptions
    latest_comment_options.body = JSON.stringify(iteration_id)
    fetch(`/api/comment/iteration/latest`, latest_comment_options)
        .then(res => res.json())
        .then(data => dispatch({
            type: IDEA_LATEST_COMMENT,
            payload: data
        }))
}

export const seeMore = (iteration_id) => dispatch => {
    var all_comment_options = postOptions
    all_comment_options.body = JSON.stringify(iteration_id)
    fetch(`/api/comment/iteration/all`, all_comment_options)
        .then(res => res.json())
        .then(data => dispatch({
            type: IDEA_ALL_COMMENTS,
            payload: data
        }))
}

export const seeLess = (idea) => dispatch => {
    dispatch({
        type: IDEA_SEE_LESS,
        payload: idea
    })
}

export const getTopicIdeas = (topic_id) => dispatch => {
    fetch(`/api/idea/topic/${topic_id}`)
        .then(res => res.json())
        .then(data => dispatch({
            type: IDEAS_FOR_TOPIC,
            payload: data
        }))
}

export const clearIdeas = () => dispatch => {
    dispatch({
        type: IDEAS_CLEARED
    })
}


export const newIteration = (data) => dispatch => {
    const iter_post_options = postOptions
    iter_post_options.body = JSON.stringify(data)
    fetch("/api/iteration/", iter_post_options)
        .then(res => res.json())
        .then(data => dispatch({
            type: IDEA_ITERATION_ADDED,
            payload: data
        }))
}

export const nextIteration = (idea_id, iteration_num) => dispatch => {
    fetch(`/api/iteration/${idea_id}/${iteration_num}`)
        .then(res => res.json())
        .then(data => dispatch({
            type: IDEA_NEXT_ITERATION,
            payload: data
        }))
}

