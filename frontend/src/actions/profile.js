import axios from 'axios';
import { setAlert } from './alert';

import {GET_PROFILE, PROFILE_ERROR} from './constants';

//Getting the current users profile
export const getCurrentProfile = () => async dispatch => {
    //hitting the backend api created!
    try{
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.reponse.statusText, status: err.response.status }
        })
    }
};