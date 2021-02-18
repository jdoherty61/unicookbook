// api calls here

import axios from 'axios';
import { setAlert } from './alert';

//Getting the current posts 
export const getCurrentUserPosts = async () => {
    //hitting the backend api created!
    try{
        const res = await axios.get('/api/posts/me');

        return res.data;

    } catch (err) {
    
        console.log(err.response.statusText);
        
        //should i return something here? just incase.
    }
};


//Get post by id
export const getPostByID = async postId => {
    //hitting the backend api created!
    try{
        const res = await axios.get(`/api/posts/${postId}`);

        return res.data;
    } catch (err) {
    
        console.log(err.response.statusText);

        // DISPATCH AN alert message?
        //should i return something here? just incase.
    }
};