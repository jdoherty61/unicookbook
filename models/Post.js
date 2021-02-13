const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Creating a schema for recipe based of the designs and fields which should be present in a recipe object.
//This could refactored in further iteration. For example ownerInformation could hold ownerName, Avatar and Uni.


//TODO - NEED TO ALLOW IMAGE TO BE UPLOADED WITH NODE.JS, else set the image to default.

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
    text: true //this is a work around for the search query. we need an index to search.
  },
  image: {
    type: String,
    required: true,
    default: "uploads/defaultimage.png", //needs to change
  },
  instructions: {
    type: String,
    requried: true,
  },
  ingredients: { type: Array, default: [], required: true },
  effortTime: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true // Have to add the price here for query purposes
  },
  chosenDifficulty: {
    type: String,
    required: true,
  },
  meal: {
    type: String,
    required: true,
    text: true //this is a work around for the search query. we need an index to search.
  },
  public: {
    type: Boolean,
    required: true,
    default: true,
  },
  ownerName: {
    type: String,
    text: true //this is a work around for the search query. we need an index to search.
  },
  ownerAvatar: {
    type: String,
  },
  ownerUni: {
    type: String,
    text: true //this is a work around for the search query. we need an index to search.
  },
  // ownerInformation: { type: Array, default: [], required: true}, //avatar, name, uni
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("post", PostSchema);
