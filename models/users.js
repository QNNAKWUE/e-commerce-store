const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 5,
        max: 25,
        required: [true, "can't be blank"],
    },

    email: {
        type: String,
        min: 5,
        max: 255,
        required: [true, "can't be blank"],
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, "can't be blank"],
        min: 5,
        max: 255
    },

    isAdmin: {
        type: Boolean,
    }
});

const User = mongoose.model('User', userSchema);
const user = new User({});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: user._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token; 
}

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(150).required(),
        email: Joi.string().min(5).max(150).required().email().lowercase(),
        password: Joi.string().min(5).max(1024).required(),
    };
    //return Joi.validate(user, schema);
}

module.exports.validate = validateUser;
module.exports.User = User;


