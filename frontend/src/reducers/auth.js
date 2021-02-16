/* eslint-disable import/no-anonymous-default-export */
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,  //Set to null be default, will be set to true with registered success,
    loading: true,
    user: null
};
//be able to register user


export default function(state = initialState, action) {
    const {type, payload} = action; 

    // eslint-disable-next-line default-case
    switch(type){
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token); //getting them to log in with the token
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL: 
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default: 
            return state;
    }
}

