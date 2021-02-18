import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

// create a reducer, action, create the component - the flow of redux

export default combineReducers({
    //stores any reducers make and combines them to pass into provider
    alert,
    auth,
    profile
});