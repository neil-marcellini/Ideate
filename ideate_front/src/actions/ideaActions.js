import axios from 'axios'
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
    IDEA_ITERATION_ADDED
} from './types'


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

export const seeMore = (iteration_id) => dispatch => {
    axios.get(`/api/comment/iteration/${iteration_id}`)
        .then(res => dispatch({
            type: IDEA_ALL_COMMENTS,
            payload: res.data
        }))
}

export const seeLess = (idea) => dispatch => {
    dispatch({
        type: IDEA_SEE_LESS,
        payload: idea
    })
}

export const getTopicIdeas = (topic_id) => dispatch => {
    axios.get(`/api/idea/topic/${topic_id}`)
        .then(res => dispatch({
            type: IDEAS_FOR_TOPIC,
            payload: res.data
        }))
}

export const clearIdeas = () => dispatch => {
    dispatch({
        type: IDEAS_CLEARED
    })
}


export const newIteration = (data) => dispatch => {
    axios.post("/api/iteration/", data)
    .then(res => dispatch({
        type: IDEA_ITERATION_ADDED,
        payload: res.data
    }))
}


