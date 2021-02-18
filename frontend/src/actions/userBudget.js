// api calls here

import axios from 'axios';
import { setAlert } from './alert';

// import {GET_PROFILE, PROFILE_ERROR} from './constants';

//Getting the current users budget
export const getCurrentUserBudget = async () => {
    //hitting the backend api created!
    try{
        const res = await axios.get('api/userBudget/me');

        return res.data;

    } catch (err) {
    
        console.log(err.response.statusText);
        
        //should i return something here? just incase.
    }
};