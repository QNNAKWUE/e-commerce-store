const express = require('express');
const mongoose = require('mongoose');

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


module.exports.Category = Category;