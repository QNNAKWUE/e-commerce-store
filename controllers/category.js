const express = require('express');
const mongoose = require('mongoose');
const validationResult = require('express-validator')
const _ = require('underscore');
const lodash = require('lodash');
const { Category } = require('../models/category');


exports.createCategories = (async (req, res)=>{
    const { errors } = validationResult(req);
    if(!error.isEmpty()){
        res.status(422).json({errors: errors.array().map((arr) =>arr.msg)});
    };

    const category = new Category(_.pick(category, ['name']));

    await category.save();
    res.send(category);
});


exports.getCategories = (async (req, res) =>{
    const categories = await Category.find().sort('name');
    if(!categories) {
        return res.status(400).send("Could not find the categories");
    }
    res.send(categories);
});

exports.getCategoriesById = (async (req, res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        return res.status(400).send("Category not found");
    }
    res.send(category);
});

exports.updateCategories = (async (req, res)=>{
    const {errors} = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array().map((arr) =>arr.msg)});
    }
    const category = await Category.findByIdAndUpdate;
    if(!category){
        res.status(400).send("The category with the given ID wasn't found");
    }
    res.send(category);
}) 

exports.deleteCategory = (async (req, res)=>{
    const category = await Category.findByIdAndRemove(req.params.id);
    if(!category){
        return res.status(400).send("The Category with the given ID wasn't found");
    }
    res.send(category);
});

module.exports.category = category;


