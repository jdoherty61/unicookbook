const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

//Bringing in user model
const User = require('../../models/User');


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

        // encrypt pword 
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

        await user.save();

        //return the jsonwebtoken
        res.send('User registered');

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;