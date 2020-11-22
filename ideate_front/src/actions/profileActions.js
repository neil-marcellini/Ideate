import axios from 'axios'
import { PROFILE_CREATED, PROFILE_FAIL } from './types'


export const createProfile = (formData) => dispatch => {
    axios.post('/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    .then(res => dispatch({
        type: PROFILE_CREATED,
        payload: res.data
    }))
    .catch(err => {
        dispatch({
            type: PROFILE_FAIL
        })
    })
}