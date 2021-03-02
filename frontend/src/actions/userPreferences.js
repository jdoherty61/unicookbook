// APIs associated with user preferences. This lives within the actions folder as when called, it provides an action (response) with the backend.
import axios from "axios";

//Getting recipes based on user preferences
export const getUserPreferences = async () => {
  //hitting the backend api created!
  try {
    const res = await axios.get("/api/userPreferences/me");

    return res.data;
  } catch (err) {
    console.log(err.response.statusText);

    //should i return something here? just incase.
  }
};

export const postUserPreferences = async (newUserPreferences) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //hitting the backend api created!
  try {
    const res = await axios.post(
      "/api/userPreferences",
      newUserPreferences,
      config
    );

    return res.data;
  } catch (err) {
    console.log(err.response.statusText);

    //should i return something here? just incase.
  }
};
