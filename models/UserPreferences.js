const mongoose = require('mongoose');

//User preferences schema - will hold the fields dedicated to such. 

const UserPreferencesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    maxPrice: {
        type: Number,
        required: true,
        default: 15
    },
    maxTime: {
        type: Number,
        required: true,
        default: 20
    },
    difficulty: {
        type: String,
        required: true,
        default: 'EASY'
    }
   
});


module.exports = UserPreferences = mongoose.model('userPreferences', UserPreferencesSchema);