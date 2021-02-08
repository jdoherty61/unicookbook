const jwt = require('jsonwebtoken');
const config = require('config');
//middleware is a function that has access to the request and reponse, with the 'next' being a callback we have to run once we are
// done so that it moves on gracefully. 


//Exporting a middleware function that has the request reponse object avail to it
// we are getting the token from the header using req.header
// looking at x-auth-token
// If no token at all, will send a 401 with a denied message
// if there is a token and it is invalid, it will run the catch
//If there is, it will decode it with JWT verfiy which then set the decoded object to the req.user (AKA the user in that decoded token). -> to get privated routes eg profile.

module.exports = function(req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authroization denited'});
    }

    //Verify the token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // setting the request user 
        req.user = decoded.user;
        //Runs on
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }


}