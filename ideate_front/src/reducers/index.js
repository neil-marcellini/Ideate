import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import potentialReducer from './potentialReducer'
import profileReducer from './profileReducer'
import topicReducer from './topicReducer'
import ideaReducer from './ideaReducer'

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    profile: profileReducer,
    potential: potentialReducer,
    topic: topicReducer,
    idea: ideaReducer,
})