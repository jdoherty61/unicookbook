// api calls here asscoiated with user budget

import axios from "axios";
// import { setAlert } from './alert';

//Getting the current users budget
export const getCurrentUserBudget = async () => {
  //hitting the backend api created!
  try {
    const res = await axios.get("api/userBudget/me");

    return res.data;
  } catch (err) {
    console.log(err.response.statusText);

    //should i return something here? just incase.
  }
};

export const postNewBudget = async (newBudget) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //hitting the backend api created!
  try {
    const res = await axios.post("api/userBudget", newBudget, config);

    return res.data;
  } catch (err) {
    console.log(err.response.statusText);

    //should i return something here? just incase.
  }
};
