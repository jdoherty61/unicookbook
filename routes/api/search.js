//POSTS ... AKA RECIPES.
//Required packages from package.json to be imported to create functional router API calls to MongoDB.
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

//Pulling in the models which will be used in the posts APIs
const Post = require("../../models/Post");
const User = require("../../models/User");
const UserPreferences = require("../../models/UserPreferences");

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

//URL CONSTS
const userPreferencesPostsUrl = "/userPreferences";
const basicSearchUrl = "/:basicsearch";
const searchByUniUrl = "/searchByUni";

//DOCUMENTATION WOULD ALLOW TO RETURN ONLY OF 5, IF I STILL WANT TO DO THE CARDS. https://docs.mongodb.com/manual/reference/method/db.collection.find/
//EG db.bios.find().limit( 5 ).sort( { name: 1 } ) ====> for the cards at the front end - but we could also do this in the request

// @route    GET api/searchByUni
// @desc     GET posts based of user's university.
// @access   Private - users have to be logged in to see the posts.
router.get(searchByUniUrl, auth, async (req, res) => {
  const { university } = await User.findById(req.user.id).select("-password"); //deconstruction object and therefore only returning the university.
  // console.log(university);

  try {
    const posts = await Post.find({
      ownerUni: university,
    }).sort({ date: -1 }); // the most recent
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/userpreferences
// @desc     GET posts based off the user preferences
// @access   Private - users have to be logged in to see the posts.
router.get(userPreferencesPostsUrl, auth, async (req, res) => {
  const userPreferences = await UserPreferences.findOne({ user: req.user.id });
  console.log(userPreferences);

  try {
    const posts = await Post.find({
      totalPrice: { $lte: userPreferences.maxPrice }, //Total price is less than or equal to the user preference
      effortTime: { $lte: userPreferences.maxTime }, //effort time is less than or equal to the max time preferred
      chosenDifficulty: userPreferences.difficulty, // difficulty is of the chosen diffuclty.
    }).sort({ date: -1 }); // the most recent
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/fiveUserPreferences
// @desc     GET 5 user preferences for the home page
// @access   Private - users have to be logged in to see the posts.
router.get("/fiveUserPreferences", auth, async (req, res) => {
  const userPreferences = await UserPreferences.findOne({ user: req.user.id });
  console.log(userPreferences);

  try {
    const posts = await Post.find({
      totalPrice: { $lte: userPreferences.maxPrice }, //Total price is less than or equal to the user preference
      effortTime: { $lte: userPreferences.maxTime }, //effort time is less than or equal to the max time preferred
      chosenDifficulty: userPreferences.difficulty, // difficulty is of the chosen diffuclty.
    })
      .sort({ date: -1 })
      .limit(5); // the FIVE most recent
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/:basicsearch
// @desc     GET posts based off basic search in search bar
// @access   Private - users have to be logged in to see the posts.
router.get(basicSearchUrl, auth, async (req, res) => {
  const basicsearch = req.params.basicsearch;

  console.log(basicsearch);
  const userPreferences = await UserPreferences.findOne({ user: req.user.id });
  console.log(userPreferences);

  try {
    //currently works by searching by title - want to search by universtiy also.
    const posts = await Post.find({ $text: { $search: basicsearch } }).sort({
      date: -1,
    }); // the most recent
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts
// @desc     GET ALL posts of user from their id
// @access   Private - users have to be logged in to see the posts.
router.get("/:user_id", auth, async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.params.user_id,
    }).sort({ date: -1 }); // the most recent
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
