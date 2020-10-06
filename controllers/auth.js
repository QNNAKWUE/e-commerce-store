const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const { User } = require('../models/users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');



exports.signUp = (async (req, res)=>{
    const { errors } = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({ errors: errors.array().map((arr)=> arr.msg)});
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    await user.save((err, user));
    if(err){
        res.status(400).send("Saving to DB failed");
    }
    const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'));
      res.send(token);
});



exports.signIn = (async (req, res) =>{
    try {
        const {error} = validate(req.body);
        let formError = {};
        console.log(error.details);
        if (error.details) {
            error.details.forEach(errMSG => {
            let {path,message} = errMSG;
            formError.path= message;
            });
        }
      
    if(error) return res.status(400).json({data:{form:{...error.details.message}}, message:'one or more input required'});

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).json({data:{form:{}}, message:'User not found'});
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({data:{form:{}}, message:'Invalid email/password1'});
    let {name, email}= user;
    return res.status(200).json({data:{user:{name, email}}, message:'successful'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({data:{form:{}}, message:"Internal server error"});
    }
});


exports.signout = (req, res)=>{
    res.clearCookie("token");
    res.json({ message: "User logged out"});
}


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(1024).required().email(),
        password: Joi.string().min(5).max(1025).required()
};
    return Joi.validate(req, schema);

};

