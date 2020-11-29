import axios from 'axios'
import { IDEA_CREATED, IDEA_FAIL } from './types'


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
