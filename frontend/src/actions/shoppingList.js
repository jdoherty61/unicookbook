// api calls here

import axios from 'axios';
import { setAlert } from './alert';

//Getting the current user's shopping list
export const getCurrentUserShoppingList = async () => {
    //hitting the backend api created!
    try{
        const res = await axios.get('api/shoppingList/me');

        return res.data;

    } catch (err) {
    
        console.log(err.response.statusText);
        
        //should i return something here? just incase.
    }
};


// Add to shopping list 
export const addToUserShoppingList = async recipe => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //hitting the backend api created!
    try{
        const res = await axios.put('/api/shoppingList/list', recipe, config);

        //only want to return the list in the shopping list, not the user - just will make it easier to deconstruct
        return res.data.list;

    } catch (err) {
    
        console.log(err.response.statusText);
        
        //should i return something here? just incase.
    }
};

// clear shopping list 
export const clearUserShoppingList = async shoppingListId => {
    //hitting the backend api created!
    try{
        const res = await axios.delete(`/api/shoppingList/list/${shoppingListId}`);

        //only want to return the list in the shopping list, not the user - just will make it easier to deconstruct
        return res.data.list;

    } catch (err) {
    
        console.log(err.response.statusText);
        
        //should i return something here? just incase.
    }
};
