import { returnErrors, clearErrors } from './errorActions'
import { postOptions } from '../fetch_config'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from './types'

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({
        type: USER_LOADING
    })


    fetch('/api/auth/user', tokenConfig(getState))
        .then(res => {
            if (!res.ok) {
                console.log("autActions err")
                console.log(res.statusText)
                dispatch(returnErrors(res.statusText, res.status))
                dispatch({
                    type: AUTH_ERROR
                })
            }
            else {
                res = res.json()
                    .then(data => dispatch({
                        type: USER_LOADED,
                        payload: data
                    }))
            }
        })
}

// sign up user

export const signUp = ({email, password}) => dispatch => {

    const body = JSON.stringify({email, password})
    var user_post_options = postOptions
    user_post_options.body = body
    fetch('/api/users', user_post_options)
        .then(res => {
            if (!res.ok) {
                dispatch(
                    returnErrors(res.statusText, res.status, 'SIGNUP_FAIL')
                )
                dispatch({
                    type: SIGNUP_FAIL
                })
            }
            else {
                res = res.json()
                    .then(data => dispatch({
                        type: SIGNUP_SUCCESS,
                        payload: data
                    }))
            }
        })
}

// login user
export const logIn = ({email, password}) => dispatch => {

    const body = JSON.stringify({email, password})
    var auth_post_options = postOptions
    auth_post_options.body = body
    fetch('/api/auth', auth_post_options)
        .then(res => {
            if (!res.ok) {
                dispatch(
                    returnErrors(res.statusText, res.status, 'LOGIN_FAIL')
                )
                dispatch({
                    type: LOGIN_FAIL
                })
            }
            else {
                res = res.json()
                    .then(data => dispatch({
                        type: LOGIN_SUCCESS,
                        payload: data
                    }))
            }
            
        })
}

export const logOut = (dispatch) => {
    dispatch(
        clearErrors()
    )
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

export const tokenConfig = getState => {
    // get token from local storage
    const token = getState().auth.token
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if(token) {
        config.headers['x-auth-token'] = token
    }
    return config
}
