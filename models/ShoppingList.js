const mongoose = require('mongoose');

//Adding shoppinglist attributes. Shopping list is made up of the user who it belongs to with the array list of recipes and their ingredients and price.

const ShoppingListSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    list: { type: Array, default: []}
});


module.exports = ShoppingList = mongoose.model('shoppingList', ShoppingListSchema);