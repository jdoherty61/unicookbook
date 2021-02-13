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

//URL CONSTS 
const userPreferencesPostsUrl = "/userPreferences";
const basicSearchUrl =  "/:basicsearch";


//DOCUMENTATION WOULD ALLOW TO RETURN ONLY OF 5, IF I STILL WANT TO DO THE CARDS. https://docs.mongodb.com/manual/reference/method/db.collection.find/
//EG db.bios.find().limit( 5 ).sort( { name: 1 } )


// @route    GET api/userpreferences
// @desc     GET posts based off the user preferences
// @access   Private - users have to be logged in to see the posts.
router.get(userPreferencesPostsUrl, auth, async (req, res) => {

    const userPreferences = await UserPreferences.findOne({ user: req.user.id });
    console.log(userPreferences);
    
    try {
      const posts = await Post.find({ 
            totalPrice: { $lte: userPreferences.maxPrice },                 //Total price is less than or equal to the user preference 
            effortTime: { $lte: userPreferences.maxTime },                  //effort time is less than or equal to the max time preferred
            chosenDifficulty: userPreferences.difficulty                    // difficulty is of the chosen diffuclty.
       }).sort({ date: -1 });                                               // the most recent
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
      const posts = await Post.find({ $text: { $search: basicsearch } }).sort({ date: -1 });                                               // the most recent
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// @route    GET api/posts
// @desc     GET ALL posts of user from their id
// @access   Private - users have to be logged in to see the posts.
router.get('/:user_id', auth, async (req, res) => {
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