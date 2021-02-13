const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('./config/db');

const app = express();

//Connect to the database
connectDB();

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

//aka local host port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));




