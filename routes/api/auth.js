const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");


const User = require("../../models/User");

//URL consts 
const authUrl = "/"; 

// This file is dedicated to developing routes to APIs associated with authentiation using the above node packages.

// Response meanings
// 500 = Internal server error
// 400 = Bad request

// - basic layout of the API calls - 
// in an asynchronous function to allow for promises
// try and catch block to catch errors
// return a response

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------


// @route   GET api/auth
// @desc    get the user by token
// @access  public
router.get(authUrl, auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //removing password from returned user. Security purposes and just not needed for purpose of system.

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("There was a server error");
  }
});

// @route   POST api/auth
// @desc    authenticate user (register) and get token
// @access  public
router.post(
  authUrl,
  [
    check("email", "Please include your university email").isEmail(),  //Validation
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //see if the user exists
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // match email and password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //return the jsonwebtoken - sending this back once the user is registered, so they can use this token to access protected routes.
      const payload = {
        user: {
          id: user.id,
        },
      };

      //TODO: Does the app need to have an expiresIn??? or should I allow it to keep open since it is on their mobile which is likely password protected? 
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        // { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
