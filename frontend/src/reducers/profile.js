import { GET_PROFILE, PROFILE_ERROR } from "../actions/constants";
//Files associated with this file
// action/profile
// reducers/profile
// actions/constants 


const initialState = {
  profile: null,
  // profiles: [], // might not need this, will list out of the students and I dont need that
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
