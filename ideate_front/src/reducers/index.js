import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import topicReducer from './topicReducer'
import ideaReducer from './ideaReducer'

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    profile: profileReducer,
    topic: topicReducer,
    idea: ideaReducer,
})