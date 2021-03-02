import { SET_ALERT, REMOVE_ALERT } from './constants';
//This allows for a random universal ID
import { v4 as uuidv4 } from 'uuid';

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

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