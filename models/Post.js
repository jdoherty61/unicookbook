//Required Packages 
const mongoose = require("mongoose"); // MONGOOSE VALIDATION
const Schema = mongoose.Schema; //USING PRECREATED SCHEMA

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

// Mongoose allows for validation alongside the schema package. I can precreate a schema for the Post object, to prevent data that is not 
// identified in the schema from being added to the database and will throw errors if not of type or convert to that type! 

//Creating a schema for recipe based of the designs and fields which should be present in a recipe document (System Data Model in Chapter 2).

//TODO list. Enhancements. 
//This could refactored in further iteration. For example ownerInformation could be a sub nested document hold ownerName, Avatar and Uni.

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
    default: "uploads/defaultimage.png", //have in place as a placeholder in case the image does not upload right.
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
    required: true 
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
  // ownerInformation: { type: Array, default: [], required: true}, //avatar, name, uni - sub nested document.
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
  saves: [
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
