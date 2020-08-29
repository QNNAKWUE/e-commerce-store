const express = require('express');
const mongoose = require('mongoose');
const { User, validate} = require('../models/users');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash')
const router = express.Router();


router.post('/', async (req, res) =>{
    const error = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
    };

    let user = await User.findOne({ email: req.body.email });
      if(user) {
        res.status(400).send("User already registered");
    }

        user = new User(_.pick(req.body, ['name', 'email', 'password']));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    
        await user.save();

        res.send(_.pick(user, ['_id', 'name', 'email']));   
    
});

module.exports = router;
module.exports.User = User;







