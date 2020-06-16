const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const app = express();
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')) {
    console.log('Fatal Error: jwtPrivateKey is not Defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected To MongoDB...'))
    .catch(() => console.log('Could Not Connected To MongoDB'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

