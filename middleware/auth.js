const jwt = require("jsonwebtoken");
const config = require("config");
// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

//middleware is a function that has access to the request and reponse,
//with the 'next' being a callback ran once function executed so that it moves on gracefully.

//Exporting a middleware function that has the request reponse object avail to it
// Getting the token from the header using req.header
// looking at x-auth-token
// If no token at all, will send a 401 with a denied message
// if there is a token and it is invalid, it will run the catch
// If there is, it will decode it with JWT verfiy which then set the decoded object to the req.user,
// (AKA the user in that decoded token). -> to get privSated routes eg profile.

//BOILER PLATE CODE

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authroization denited" });
  }

  //Verify the token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // setting the request user
    req.user = decoded.user;
    //Runs on
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
