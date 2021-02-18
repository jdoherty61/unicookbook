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
const ShoppingList = require("../../models/ShoppingList");
const Post = require("../../models/Post");
const UserBudget = require("../../models/UserBudget");

//URLS CONSTS
const myProfileUrl = "/me";
const profileUrl = "/";
const userProfileUrl = "/user/:user_id";

// @route   GET api/profile/me
// @desc    get current users profile
// @access  private
router.get(
  myProfileUrl, 
  auth, 
  async (req, res) => {

    try {

      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", [
        "name",
        "avatar",
        "degree",
        "yearOfDegree",
        "university",
      ]);

      if (!profile) {
        //400 = bad request
        return res.status(400).json({ msg: "There is no profile for this user" });
      }

      res.json(profile); //Returns the profile as the response.

    } catch (error) {
      console.error(error.message);
      //500 = server error
      res.status(500).send("Server Error");
    }

});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  profileUrl,
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      bio,
    } = req.body; 

    //Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //If there is a profile, update the profile.
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create a new profile
      profile = new Profile(profileFields);

      await profile.save();
      return json(profile);
    } catch (error) {

      console.error(error.message);
      // error 500 = server error
      res.status(500).send("Server Error");

    }
  }
);

// //Todo: Might not need this.
// // @route    GET api/profile
// // @desc     get all profiles
// // @access   Pubilc
// router.get("/", async (req, res) => {
//   try {
//     //Get all the profiles alongside the name and avatar of the user.
//     const profiles = await Profile.find().populate("user", ["name", "avatar"]);
//     res.json(profiles);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route    GET api/profile/user/:user_id
// @desc     get  profile by user id
// @access   Pubilc
router.get(
  userProfileUrl, 
  async (req, res) => {

    try {
      //Get profiles alongside the name and avatar of the user
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate("user", [
        "name",
        "avatar",
        "university",
        "yearOfDegree",
        "degree",
      ]);
      res.json(profile);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no existing profile for this user" });
      }
      
    } catch (err) {
      console.error(err.message);

      //Different handling of error message for a invalid object
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "Profile not found" });
      }

      res.status(500).send("Server Error");
    }
    
});

// @route    DELETE api/profile
// @desc     delete profile, user and posts (recipes)
// @access   Private
router.delete(
  profileUrl, 
  auth, 
  async (req, res) => {

    try {
      // Remove user posts
      // Remove profile
      // Remove user
      await Promise.all([
        Post.deleteMany({ user: req.user.id }),
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id }),
        UserPreferences.findOneAndRemove({ user: req.user.id }),
        ShoppingList.findOneAndRemove({ user: req.user.id }),
        UserBudget.findOneAndRemove({ user: req.user.id })

      ]);

      res.json({ msg: "User deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

});

module.exports = router;
