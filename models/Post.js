const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
},
image: { 
    type: String,
    required: true,
    default: 'uploads/defaultimage.png' //needs to change 
},
instructions: {
    type: String,
    requried: true
},
ingredients: { type: Array, default: [], required: true},
effortTime: {
    type: Number, 
    required: true
}, 
chosenDifficulty: {
    type: String,
    required: true
},
meal: {
    type: String,
    required: true
},
public: {
    type: Boolean,
    required: true,
    default: true
},
ownerName: {
    type: String
},
ownerAvatar: {
    type: String
},
ownerUni: {
    type: String
},
// ownerInformation: { type: Array, default: [], required: true}, //avatar, name, uni
date: {
    type: Date,
    default: Date.now
},
likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('post', PostSchema);