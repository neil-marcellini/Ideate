import { ALL_TOPICS_LOADED } from './types'


export const getAllTopics = () => dispatch => {
    fetch('/api/topic')
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: ALL_TOPICS_LOADED,
                payload: data
            })
        })
    
}
