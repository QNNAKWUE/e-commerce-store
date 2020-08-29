const {User} = require('../models/users');
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) =>{
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(404).send('Invalid email/password');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(404).send('Invalid email/password');

    const token = jwt.sign({ _id: user._id}, 'jwtPrivateKey');
      res.send(token);

});


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(1024).required().email(),
        password: Joi.string().min(5).max(1025).required()
};
    return Joi.validate(req, schema);

};

module.exports = router;

//module.exports.auth = auth;