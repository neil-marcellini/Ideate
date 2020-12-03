import axios from 'axios'
import { returnErrors, clearErrors } from './errorActions'

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


    axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        console.log("autActions err")
        console.log(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
}

// sign up user

export const signUp = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})
    axios.post('/api/users', body, config)
    .then(res => dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status, 'SIGNUP_FAIL')
        )
        dispatch({
            type: SIGNUP_FAIL
        })
    })
}

// login user
export const logIn = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})
    axios.post('/api/auth', body, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        )
        dispatch({
            type: LOGIN_FAIL
        })
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