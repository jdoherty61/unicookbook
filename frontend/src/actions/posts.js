// API calls associated with the posts.

import axios from "axios";
// import { setAlert } from './alert';

//Getting the current posts
export const getCurrentUserPosts = async () => {
  //hitting the backend api created!
  try {
    const res = await axios.get("/api/posts/me");

    return res.data;
  } catch (err) {
    console.log(err.response.statusText);

    //should i return something here? just incase.
  }
};

//Get post by id
export const getPostByID = async (postId) => {
  //hitting the backend api created!
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    return res.data;
  } catch (err) {
    console.log(err.response.statusText);

    // DISPATCH AN alert message?
    //should i return something here? just incase.
  }
};

// Add post
export const addPost = async (formData) => {
  //need to add header
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  //hitting the backend api created!
  try {
    const res = await axios.post("/api/posts/", formData, config);

    return res.data; // if successful redirect to home page?
  } catch (err) {
    console.log(err.response.statusText);

    //should i return something here? just incase.
  }
};
