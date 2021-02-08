const mongoose = require('mongoose');

//Adding profile attributes, such as description/bio - unrequired information when signing up.

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String,
        default: null
    },
    // shoppingList:  [
    //     {
    //         recipes: {
    //             type: Array,
    //             default: []
    //         }
    //     }
    // ],
    // shoppingList: { type: Array, default: []}, //the other way around? [ type: object, default:{}] ?
    // userPreferences: [
    //     {
    //         maxPrice: {
    //             type: Number,
    //             default: 5
    //         },
    //         difficulty: {
    //             type: String,
    //             default: 'EASY'
    //         },
    //         maxTime: {
    //             type: Number,
    //             default: 15 
    //         },
    //         excludeIngredients: { type: Array, default: []},
    //         exclusivelyUni: {
    //             type: Boolean,
    //             default: false
    //         }
    //     }
    // ],
    // budget: [{
    //     studentFinance: {
    //         type: Number,
    //         default: null
    //     },
    //     income: { type: Array, default: []},
    //     spending: { type: Array, default: []},
    //     duration: {
    //         number: {
    //             type: Number,
    //             default: null    
    //         },
    //         timescale: {
    //             type: String,
    //             default: null
    //         }
    //     }
    // }],
    date: {
        type: Date,
        default: Date.now
    } 
});


module.exports = Profile = mongoose.model('profile', ProfileSchema);