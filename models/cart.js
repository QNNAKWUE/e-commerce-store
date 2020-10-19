const express = require('express');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  
    },

    amount: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
        variations: Number
    }

});

const Cart = mongoose.model('Cart', cartSchema);
const cart = new Cart({});

module.exports = Cart;