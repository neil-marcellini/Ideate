// Neil Marcellini
import axios from 'axios'
import { LATEST_ITERATION, LATEST_ITERATION_FAIL } from './types'


export const getLatestIteration = (idea_id) => dispatch => {
    axios.get(`/api/iteration/${idea_id}`)
    .then(res => dispatch({
        type: LATEST_ITERATION,
        payload: res.data
    }))
    .catch(err => {
        dispatch({
            type: LATEST_ITERATION_FAIL,
            payload: err.response.data
        })
    })
}
