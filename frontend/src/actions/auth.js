import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "./constants";

//Load user
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data //the user
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};


//Registering the user
export const register = ({
  name,
  email,
  password,
  password2,
  degree,
  yearOfDegree,
  university
}) => async (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    name,
    email,
    password,
    password2,
    degree,
    yearOfDegree,
    university
  });

  try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
      });

      dispatch(loadUser());

  } catch (err) {
    //TODO: refactor or next iteration - loop through the errors returned from the backend like not having an email etc.
    dispatch({
        type: REGISTER_FAIL
    });
  }

};

//Login the user
export const login = (email, password) => async (dispatch) => {
  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify({
      email,
      password
    });
  
    try {
        const res = await axios.post('/api/auth', body, config);
  
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
  
    } catch (err) {

      const errors = err.response.data.errors;

      if(errors) {
          //so essentially, this checks the errors that I checked for with backend validation, and will return the message if these are incorrect or do not match the checks
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
          type: LOGIN_FAIL
      });
    }
  
  };


//Logging out the user / Clear the profile
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}