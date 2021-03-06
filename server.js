// THE USAGE OF THIS FILE
// This file is boiler plate to connect up express js with the connected backend and the created API calls.
//Required imports
const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('./config/db');

const app = express();

//Connect to the database
connectDB();

//making the uplaods folder public so that we can extract the uploaded image in the front end for the recipe
app.use('/uploads', express.static('uploads'));

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running!'));


// Defining routes for API calls. 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/shoppingList', require('./routes/api/shoppingList'));
app.use('/api/userPreferences', require('./routes/api/userPreferences'));
app.use('/api/userBudget', require('./routes/api/userBudget'));
app.use('/api/search', require('./routes/api/search'));

//aka local host port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
