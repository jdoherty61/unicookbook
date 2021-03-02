const mongoose = require('mongoose');
const config = require('config');
//mongoURI is set in default.json and can be exported using the config.get method.
const db = config.get('mongoURI');

//default.json ---- is the database configuration information - the mongoURI and the secret token. 

// ----------------------------------------------- REFERENCE(S) -----------------------------------------------
// ***** TUTORIAL/COURSE THAT HELPED WITH THIS OVERALL PROCESS AND PARTICULAR FILE *****
// Brad Traversy, 2019, MERN Stack Front To Back: Full Stack React, Redux & Node.js, https://www.udemy.com/share/101WIoAEYbcV9RRnUD/
// -------------------------------------------------------------------------------------------------------------

//asynchronous function to allow a promise (the try and catch method). Allows to catch and indentify a database connection error if there is one.
//using this method throughout my backend - to prevent fall over in the front end and to catch the error at it's root. 
//For example, not using the correct export or simply not using the correct MongoURI from the default.json can cause errors and error messages should appropraitely identify this!.
//easier for debugging process.

const connectDB = async () => {
    try {

        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Mongo db connected...');

    } catch (error) {
        console.log("Mongo db not connected")
        console.log(err.message);
        //Exit process with failure
        process.exit(1);
    }
}


module.exports = connectDB;