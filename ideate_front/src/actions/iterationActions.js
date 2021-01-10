// Neil Marcellini
import { LATEST_ITERATION, LATEST_ITERATION_FAIL } from './types'


export const getLatestIteration = (idea_id) => dispatch => {
    fetch(`/api/iteration/${idea_id}`)
        .then(res => {
            if (!res.ok) {
                dispatch({
                    type: LATEST_ITERATION_FAIL,
                    payload: res.statusText
                })
            } else {
                res = res.json()
                    .then(data => dispatch({
                        type: LATEST_ITERATION,
                        payload: data
                    }))
            }
        })
}
