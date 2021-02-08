const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
// @route   GET api/auth
// @desc    Test route
// @access  public

router.get('/', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password');

        res.json(user);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('There was a server error');
    } 
});

// @route   POST api/auth
// @desc    authenticate user and get token
// @access  public
router.post('/', [
    check('email', 'Please include your university email').isEmail(),
    check('password', 'Password is required').exists()
], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        //see if the user exists
        if(!user) {
            return res.
            status(400)
            .json({ errors: [ { msg: 'Invalid credentials'}] });
        }


        // match email and password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.
            status(400)
            .json({ errors: [ { msg: 'Invalid credentials'}] });
        }
        

        //return the jsonwebtoken - sending this back once the user is registered, so they can use this token to access protected routes.

        const payload = {
            user: {
                id: user.id
            }
        }

        //todo: change this to 36000 seconds - this is an hour -> for production!
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn : 360000},
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