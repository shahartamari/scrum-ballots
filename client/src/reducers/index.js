import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import userReducer from './user_reducer';
import voteReducer from './vote_reducer';
import profileReducer from './profile_reducer';

export default combineReducers({
    session: sessionReducer,
    users: userReducer,
    votes: voteReducer,
    profile: profileReducer
});