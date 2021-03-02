const mongoose = require('mongoose');

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

//User preferences schema - will hold the fields dedicated to such that were described in the data model user preferences document!
//3 of the main issues associated to problem domain.

//Defaulted values for new users for the generic student. 

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