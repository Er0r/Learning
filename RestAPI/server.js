require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const subscribersRouter = require('./routes/subscribers');

mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());



app.use('/subscribers', subscribersRouter);

app.listen(3000, () => console.log('Server Started '));

