import { SET_ALERT, REMOVE_ALERT } from './constants';
//This allows for a random universal ID
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType, timeout = 4000) => dispatch => {
    const id = uuidv4();
    console.log(id);
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    //Set timeout so the alert goes away in a given period of time (4 SECONDS)
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id}), timeout);
};