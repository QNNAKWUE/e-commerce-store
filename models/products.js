const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true,
    },

    description: {
        type: String,
        trim: true,
        minlength: 15,
        maxlength: 1024,
        required: true,  
    },

    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },

    category: {
        type: String,
        ref: "Category",
        required: true,
      },

      stock: {
        type: Number,
      },

      /*sold: {
        type: Number,
        default: 0,
      },

      photo: {
        data: Buffer,
        contentType: String,
      },*/


});

const Product = mongoose.model('Product', productSchema);
const product = new Product({ });

module.exports = function validateProduct(product) {
    const schema = {
        name: Joi.string().trim().maxlength().required(),
        description: Joi.string().trim().required(),
        price: Joi.number().maxlength().trim().required(),
        category: Joi.string().required(),
        stock: Joi.number(),
        sold: Joi.number(),
        photo: Joi.buffer(),
    }
}

module.exports = Product;

