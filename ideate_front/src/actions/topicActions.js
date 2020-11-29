import { NEW_TOPIC_IMAGE, NEW_TOPIC_DESCRIPTION } from './types'


export const updateTopicImage = (image) => dispatch => {
    console.log(image)
    dispatch({
        type: NEW_TOPIC_IMAGE,
        payload: image
    })
}

export const updateTopicDescription = (description) => dispatch => {
    dispatch({
        type: NEW_TOPIC_DESCRIPTION,
        payload: description
    })
}