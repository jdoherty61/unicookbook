import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

// create a reducer, action, create the component - the flow of redux

//PULLING ALL THE REDUCERS MADE INTO ONE!
export default combineReducers({
    //stores any reducers make and combines them to pass into provider
    alert,
    auth,
    profile
});