const mongoose = require('mongoose');

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

//Adding shoppinglist attributes. Shopping list is made up of the user who it belongs to with the array list of recipes and their ingredients and price.

const ShoppingListSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    list: { type: [], default: []}

    // Add 'checked' here with default value to false. So users could click on each ingredient and mark it off and it would be stored.

    // listTotalValue: { //CURRENTLY GETTING TOTAL IN FRONT END FOR NOW AS IT IS USED IN ONE AREA.
    //     type: Number,
    //     default: null
    // }
});


module.exports = ShoppingList = mongoose.model('shoppingList', ShoppingListSchema);