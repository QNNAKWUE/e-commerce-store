const express = require('express');
const mongoose = require('mongoose');


const productCartSchema = new mongoose.Schema({
    //product: {
        //type: objectId,
        //ref: "Product",
    //},

    name: String,
    price: Number,
    count: Number,
});

const ProductCart = mongoose.model("ProductCart", productCartSchema);
const productCart = new ProductCart({});

const orderSchema = new mongoose.Schema({
    //products: [productCartSchema],
    transaction_id: {
        type: String,
    },

    amount: Number,
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],
    },
    
    address: String,
    updated: Date,
    user: { ref: "User"}
});

const Order = mongoose.model("Order", orderSchema);
const order = new Order({});

module.exports = Order;
module.exports = ProductCart;

