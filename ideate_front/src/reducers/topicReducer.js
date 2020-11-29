import {NEW_TOPIC_IMAGE, NEW_TOPIC_DESCRIPTION } from '../actions/types'

const initalState = {
    "topicImage": null,
    "topicDescription": null
}

export default function(state = initalState, action) {
    switch(action.type) {
        case NEW_TOPIC_IMAGE:
            return {
                ...state,
                topicImage: action.payload
            }
        case NEW_TOPIC_DESCRIPTION:
            return {
                ...state,
                topicDescription: action.payload
            }
        default:
            return state
    }
}