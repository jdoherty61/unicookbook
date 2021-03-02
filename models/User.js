const mongoose = require('mongoose');

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

//Creating a schema for user based of initial designs and fields that are required for a registered valid user (data model in chapter 2 for user document). 

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  degree: {
    type: String,
    required: true
  },
  yearOfDegree: {
    type: Number,
    required: true
  },
  university: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('user', UserSchema);