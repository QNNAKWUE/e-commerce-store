const express = require('express');
const mongoose = require('mongoose');
const  Joi  = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true,
    },
});

const Category = mongoose.model("Category", categorySchema);
const category = new Category({});

function validateCategory(req){
    const schema = {
        name: Joi.string().required().trim()
    }
}


module.exports.Category = Category;
module.exports.validate = validateCategory;