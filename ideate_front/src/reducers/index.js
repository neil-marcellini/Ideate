import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import topicReducer from './topicReducer'
import ideaReducer from './ideaReducer'
import allTopicsReducer from './allTopicsReducer'
import iterationReducer from './iterationReducer'

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    profile: profileReducer,
    topic: topicReducer,
    idea: ideaReducer,
    allTopics: allTopicsReducer,
    iteration: iterationReducer,
})
