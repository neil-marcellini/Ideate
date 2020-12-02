import { ALL_TOPICS_LOADED } from './types'
import axios from 'axios'


export const getAllTopics = () => dispatch => {
    console.log("call all topics")
    axios.get('/api/topic')
        .then(res => {
            dispatch({
                type: ALL_TOPICS_LOADED,
                payload: res.data
            })
        })
    
}