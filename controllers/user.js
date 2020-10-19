const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const _ = require('lodash')
const { User, validate} = require('../models/users');
//const {Order} = require('../models/orders');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');



    exports.signUp  = async function (req, res) {
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
    }

    exports.getUsers = (async(req, res) =>{
        const users = await User.find().sort("name");
        if(!users){
            return res.status(400).send("Users not found");
        }

        res.send(users); 
    });

    exports.getUsersById = (async(req, res) =>{
        const user = await User.findById(req.body.id);
        if(!user){
            return res.status(400).send("The User with the given ID wasn't found");
        }

        res.send(user);
    });

    exports.updateUser = (async(req, res) =>{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send(result.error.details[0].message);
        }
        const user = await User.findByIdAndUpdate(req.body.id, {name: req.body.name}, { new: true});
        if(!user){
            return res.status(400).send("Could not update the given user");
        }
    });


    exports.getUserOrder = (async(req, res) =>{
        const user = await User.find(_.id)
        .sort("name")
        .populate("category")
        .exec((err, Order) =>{
            if(err) {
                return res.status(400).send("no order found for this user");
            };

            res.json({Order});
        });
    });
    
   

