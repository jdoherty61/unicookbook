const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

//Bringing in user model
const User = require('../../models/User');
const ShoppingList = require("../../models/ShoppingList");
const UserPreferences = require("../../models/UserPreferences");
const Profile = require("../../models/Profile");

// @route   POST api/users
// @desc    register user
// @access  public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include your university email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6}),
    check('degree', 'Please enter you degree title').not().isEmpty(),
    check('yearOfDegree', 'Please enter your year of study').not().isEmpty(),
    check('university', 'Please enter your year of study').not().isEmpty()
], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const { name, email, password, degree, yearOfDegree, university } = req.body;

    try {
        let user = await User.findOne({ email })

        //see if the user exists
        if(user) {
            return res.status(400).json({ errors: [ { msg: 'User Already Exists'}] });
        }

        // get users gravatar
        const avatar = gravatar.url(email, {
            s: '200', //size
            r: 'pg',    //rating
            d: 'mm'         //default set if no gravatar
        });

        //taking the user initalised above and creating a new user.
        user = new User({
            name,
            email,
            avatar,
            password,
            degree,
            yearOfDegree,
            university
        })

        // encrypt pword - calculates a hash from a password using a random 'salt'
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

        await user.save();

        //return the jsonwebtoken - sending this back once the user is registered, so they can use this token to access protected routes.

        const payload = {
            user: {
                id: user.id
            }
        }


        //################################## this might cause errors ##############################
        //When a user is added, they will by default, have an empty shopping list, default user preferences, profile, and an empty budget

        //Add shopping list 
        newShoppingList = new ShoppingList({
            user: payload.user.id
        });
  
        await newShoppingList.save();

        //Add User preferences
        userPreferences = new UserPreferences({
            user: payload.user.id
        });
  
        await userPreferences.save();

        // Add profile
        profile = new Profile({
            user: payload.user.id
        });

        await profile.save();

        //add budget



        //################################## this might cause errors ##############################

        //todo: should i have an expire? if they are on their mobile which is likely to be password protected. keep them logged in
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            // {expiresIn : 360000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;