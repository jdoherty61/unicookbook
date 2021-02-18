import axios from 'axios';
import { setAlert } from './alert';

import {GET_PROFILE, PROFILE_ERROR} from './constants';

//This fileis dedciated to the API calls which were made in the backend, using axios to fetch the response 'res' data and then populate
// the front end


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
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};


//Get profile by id 
// NOT using the redux function etc for this - too much overkill for the time being - next iteration 
export const getProfileById = userId => {
    try {
        const res = axios.get(`/api/profile/user/${userId}`);

        //NEEDS TESTED
        return res.data
    } catch (err) {

        console.log(err);

    };
};



//Backend API has been created to edit or update user profile - enhancement for future iteration.