import axios from "axios";

//Getting recipes based on user preferences
export const getRecipesBasedOffUserPreferences = async () => {
  //hitting the backend api created!
  try {
    const res = await axios.get("/api/search/userPreferences");

    return res.data;
  } catch (err) {
    console.log(err.response.statusText);

    //should i return something here? just incase.
  }
};

//Getting recipes based on user's university
export const getRecipesBasedOffUniversity = async () => {
  //hitting the backend api created!
  try {
    const res = await axios.get("/api/search/searchByUni");

    return res.data;
  } catch (err) {
    console.log(err.response.statusText);

    //should i return something here? just incase.
  }
};

//Getting recipes based on user's university
export const getRecipesBasedOnTitle = async (title) => {
  //hitting the backend api created!
  try {
    const res = await axios.get(`/api/search/${title}`);

    return res.data;
  } catch (err) {
    console.log(err.response.statusText);

    //should i return something here? just incase.
  }
};
