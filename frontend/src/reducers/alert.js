/* eslint-disable import/no-anonymous-default-export */
// making reducer
// just a function that takes in a state and action (aka dispath)
import { SET_ALERT, REMOVE_ALERT } from "../actions/constants";

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
