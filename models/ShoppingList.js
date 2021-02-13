const mongoose = require('mongoose');

//Adding profile attributes, such as description/bio - unrequired information when signing up.

const ShoppingListSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    list: { type: Array, default: []}
});


module.exports = ShoppingList = mongoose.model('shoppingList', ShoppingListSchema);