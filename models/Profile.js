const mongoose = require("mongoose");

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

//Adding profile attributes, such as description/bio - unrequired information when signing up.
//Todo: Adding saved Recipes and Liked recipes here. This will allow for users to return these recipes when they go to their profile - 
//where they would be stored in tabs.

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bio: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // savedRecipes: {},
  // likedRecipes: {}
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
