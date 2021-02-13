const mongoose = require('mongoose');

//Adding profile attributes, such as description/bio - unrequired information when signing up.
//Todo: Is this overkill? I could just have a user object with a profile array. 

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String,
        default: null
    },
        date: {
        type: Date,
        default: Date.now
    } 
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);