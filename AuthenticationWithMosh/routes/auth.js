const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const { join, isEqualWith } = require('lodash');
const router = express.Router();

router.post('/', async(req, res) => {
    console.log(req.body);
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    
    let user =await User.findOne({ email: req.body.email });
    if(!user) {
        return res.status(400).send('Invalid email or Password!');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Password is Invalid');
    
    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));

    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema );
}

module.exports = router;
