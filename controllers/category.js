const Joi = require('joi');
const { auth} = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const { Category, validate } = require('../models/category');



exports.createCategories = (async (req, res)=>{
    const  error = validate(req.body);
    if(error){
        res.status(422).send(error.details[0].message);
    };

    const category = new Category({
        name: req.body.name
    });

    await category.save();
    res.json({category});
});


exports.getCategories = (async (req, res) =>{
    const categories = await Category.find().sort('name');
    if(!categories) {
        return res.status(400).send("Could not find the category");
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




