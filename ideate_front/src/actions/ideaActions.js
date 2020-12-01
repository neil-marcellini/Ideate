import axios from 'axios'
import { IDEA_CREATED, IDEA_FAIL, IDEAS_FETCHED, IDEA_ITERATION_RATED, IDEA_COMMENT_ADDED } from './types'


export const createIdea = (formData) => dispatch => {
    axios.post('/api/idea', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    .then(res => dispatch({
        type: IDEA_CREATED,
        payload: res.data
    }))
    .catch(err => {
        dispatch({
            type: IDEA_FAIL,
            payload: err.response.data
        })
    })
}

export const getAllIdeas = () => dispatch => {
    axios.get('/api/idea')
        .then(res => dispatch({
            type: IDEAS_FETCHED,
            payload: res.data
        }))
}

export const rate = (data) => dispatch => {
    axios.post('/api/potential', data)
        .then(res => dispatch({
            type: IDEA_ITERATION_RATED,
            payload: res.data
        }))
}

export const addComment = (data) =>  dispatch => {
    axios.post('/api/comment', data)
        .then(res => dispatch({
            type: IDEA_COMMENT_ADDED,
            payload: res.data
        }))
}
