//boiler plate with redux 
import {createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

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