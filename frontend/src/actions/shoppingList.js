// api calls here

import axios from 'axios';
import { setAlert } from './alert';

//Getting the current user's shopping list
export const getCurrentUserShoppingList = async () => {
    //hitting the backend api created!
    try{
        const res = await axios.get('api/shoppingList/me');

        //only want to return the list in the shopping list, not the user - just will make it easier to deconstruct
        return res.data.list;

    } catch (err) {
    
        console.log(err.response.statusText);
        
        //should i return something here? just incase.
    }
};