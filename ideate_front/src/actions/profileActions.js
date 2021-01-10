import { postFormOptions } from '../fetch_config.js'
import { PROFILE_CREATED, PROFILE_FAIL } from './types'


export const createProfile = (formData) => dispatch => {
    var create_form_options = postFormOptions
    create_form_options.body = JSON.stringify(formData)
    fetch('/api/profile', create_form_options)
        .then(res => {
            if(!res.ok) {
                dispatch({
                    type: PROFILE_FAIL,
                    payload: res.statusText
                })
            }
            else {
                res = res.json()
                    .then(data => dispatch({
                        type: PROFILE_CREATED,
                        payload: data
                    }))
            }
        })
}
