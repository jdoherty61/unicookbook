/* eslint-disable import/no-anonymous-default-export */
// making reducer
// just a function that takes in a state and action (aka dispath)
import { SET_ALERT, REMOVE_ALERT } from "../actions/constants";

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// Attempting to use redux / reducers for state management, allows for alerts when user inputs invalid password in when signed in or there has been an error.
// -------------------------------------------------------------------------------------------------------------


const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;

    
  switch (type) { // Switch statement = Depending on the type
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
