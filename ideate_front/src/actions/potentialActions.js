import { POTENTIAL_UPDATED, POTENTIAL_RATED } from './types'


export const updatePotential = (data) => dispatch => {
    dispatch({
        type: POTENTIAL_UPDATED,
        payload: data
    })
}

export const ratePotential = (data) => dispatch => {
    dispatch({
        type: POTENTIAL_RATED,
        payload: data
    })
}