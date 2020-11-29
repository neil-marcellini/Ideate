import { POTENTIAL_UPDATED } from './types'


export const updatePotential = (data) => dispatch => {
    dispatch({
        type: POTENTIAL_UPDATED,
        payload: data
    })
}