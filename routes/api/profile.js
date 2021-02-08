const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { json } = require('express');

// @route   GET api/profile/me
// @desc    get current users profile
// @access  private
router.get('/me', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({user: req.user.id }).populate('user', 
        ['name', 'avatar', 'degree', 'yearOfDegree', 'university']);

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
    '/',
    auth,
    //should i check if shopping list, user preferences, budget are of array here?
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      

    ///TODO: TAKE OUT THE SHOPPING LIST, USER PREFERENCES, AND BUDGET - and create models for these
    const {
        bio
        // shoppingList,
        // userPreferences,
        // budget,
        // maxPrice,
        // difficulty,
        // maxTime,
        // excludeIngredients,
        // exclusivelyUni,
    } = req.body;

    //Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if(bio) profileFields.bio = bio;

    //Should i keep these in the profile?
    // if(shoppingList) profileFields.shoppingList = shoppingList;

    //Build user preference object 
    // profileFields.userPreferences = {};
    // if (maxPrice) profileFields.userPreferences.maxPrice = maxPrice;
    // if (difficulty) profileFields.userPreferences.difficulty = difficulty;
    // if (maxTime) profileFields.userPreferences.maxTime = maxTime;
    // if (excludeIngredients) profileFields.userPreferences.excludeIngredients = excludeIngredients;
    // if (exclusivelyUni) profileFields.userPreferences.exclusivelyUni = exclusivelyUni;


    // if(userPreferences) profileFields.userPreferences = userPreferences;
    // if(budget) profileFields.budget - budget;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile){
            //update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set : profileFields},
                 {new: true}
            );

            return res.json(profile);
        }

        //Create a profile
        profile = new Profile(profileFields);

        await profile.save();
        return json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
);

                                //Todo: Might not need this.
// @route    GET api/profile
// @desc     get all profiles
// @access   Pubilc
router.get('/', async (req, res) => {
    try {
        //Get all the profiles alongside the name and avatar of the user.
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/profile/user/:user_id
// @desc     get  profile by user id
// @access   Pubilc
router.get('/user/:user_id', async (req, res) => {
    try {
    //Get all the profiles alongside the name and avatar of the user
      const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar', 'university', 'yearOfDegree', 'degree']);
      res.json(profile);

      if(!profile) {
          return res.status(400).json({ msg: 'There is no existing profile for this user'})
      }

    } catch (err) {
      console.error(err.message);

      //Different handling of error message for a invalid object
      if(err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Profile not found'})
      };

      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/profile
// @desc     delete profile, user and posts (recipes)
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
      // Remove user posts
      // Remove profile
      // Remove user
      await Promise.all([
        // Post.deleteMany({ user: req.user.id }),
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id })
      ]);
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  //TDOD : DELETE THE BELOW OR CHANGE THIS OVER TO MAKE IT MAKE SENSE WITH THE USER PREFERENCES ETC... SHOULD THIS BE  A DIFFERENT API? 
  //Shopping list can be populated constantly so it wouldnt make sense, user preferences could stay in profile tho with budget?
  // ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ VIDEO 20 ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ 4 MINS ish - put reuqest to change

// // @route    PUT api/profile/experience
// // @desc     Add profile experience
// // @access   Private
// router.put(
//     '/experience',
//     auth,
//     check('title', 'Title is required').notEmpty(),
//     check('company', 'Company is required').notEmpty(),
//     check('from', 'From date is required and needs to be from the past')
//       .notEmpty()
//       .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       try {
//         const profile = await Profile.findOne({ user: req.user.id });
  
//         profile.experience.unshift(req.body);
  
//         await profile.save();
  
//         res.json(profile);
//       } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//       }
//     }
//   );

module.exports = router;