const mongoose = require('mongoose');

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