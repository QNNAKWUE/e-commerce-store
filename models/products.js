const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
//onst router = express.Router();


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

      sold: {
        type: Number,
        default: 0,
      },

     photo: {
        type: String,
     },
});

const Product = mongoose.model('Product', productSchema);
const product = new Product({ });

function validateProduct(products) {
    const schema = {
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        stock: Joi.number(),
        sold: Joi.number(),
        //photo: Joi.buffer(),
    }
}

module.exports.Product = Product;
module.exports.validate = validateProduct;

