//boiler plate with redux 
import {createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
//This is the store associated with redux. This course helped me developed and learn this usage. 
// -------------------------------------------------------------------------------------------------------------

import thunk from 'redux-thunk';
import rootReducer from './reducers'; //multiple reduces, one for auth especially.

const initialState = {};

const middleware = [thunk]; //only middleware is thunk

const store = createStore(
    rootReducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;