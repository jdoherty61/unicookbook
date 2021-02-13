const mongoose = require('mongoose');

//Creating a schema for user based of initial designs and fields that are required for a registered user. 

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