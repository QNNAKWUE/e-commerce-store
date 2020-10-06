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

      sold: {
        type: Number,
        default: 0,
      },

     photo: {
        unique_id: Number,
        Name: String,
        image1: String,
        image2: String,
        image3: String,
        added_date:{
            type: Date,
            default: Date.now,
          }     },

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

module.exports = Product;
module.exports.validate = validateProduct;

