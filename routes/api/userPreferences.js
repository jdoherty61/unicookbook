//Required packages imported
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const { json } = require("express");

//Required modules which will be used in the api callas imported below.
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const UserPreferences = require("../../models/UserPreferences");

//const URLS
const postUserPreferences = "/";
const getUserPreferences = "/me"

// @route    POST api/userPreferences
// @desc     post user preferences of the user
// @access   Private
router.post(
    postUserPreferences,
    auth,
    async (req, res) => {
  
      const {
        maxPrice,
        maxTime,
        difficulty
      } = req.body; 
  
      //Build user preference object
      const userPrefFields = {};
  
      userPrefFields.user = req.user.id;
      if (maxPrice) userPrefFields.maxPrice = maxPrice;
      if (maxTime) userPrefFields.maxTime = maxTime;
      if (difficulty) userPrefFields.difficulty = difficulty;

      try {
        let userPreferences = await UserPreferences.findOne({ user: req.user.id });
  
        if (userPreferences) {
          //If there is a profile, update the profile.
          userPreferences = await UserPreferences.findOneAndUpdate(
            { user: req.user.id },
            { $set: userPrefFields },
            { new: true }
          );
  
          return res.json(userPreferences);
        }
  
        //Create new userPreferences
        userPreferences = new UserPreferences(userPrefFields);
  
        await userPreferences.save();
        return json(userPreferences);
      } catch (error) {
  
        console.error(error.message);
        // error 500 = server error
        res.status(500).send("Server Error");
  
      }
    }
  );
  
// @route    GET api/userPreferences/me
// @desc     post user preferences of the user
// @access   Private
router.get(
    getUserPreferences, 
    auth, 
    async (req, res) => {
  
      try {
  
        const userPreferences = await UserPreferences.findOne({
          user: req.user.id,
        }).populate("user", [
          "maxTime",
          "maxPrice",
          "difficulty"
        ]);
  
        if (!userPreferences) {
          //400 = bad request
          return res.status(400).json({ msg: "There is no user Preferences for this user" });
        }
  
        res.json(userPreferences); //Returns the profile as the response.
  
      } catch (error) {
        console.error(error.message);
        //500 = server error
        res.status(500).send("Server Error");
      }
  
  });
  


  module.exports = router;