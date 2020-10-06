const express = require('express');
const { Order, ProductCart } = require("../models/orders");

exports.getOrderById = (async (req, res, id) =>{
    const order = await Order.findById(id)
    .sort("Product", "name")
    if(!order) {
        return res.status(400).send("Order not found")
    }
    res.json({order});  
});

exports.createOrder = (async (req, res) =>{
    let order = new Order({
        order: req.body.order
    });
    order = await Order.save();
    if(!order){
        return res.status(400).send("Saving Order to DB failed");
    }
    res.json({order});
});

exports.updateOrder = (async (req, res) =>{
    const order = await Order.findById(req.id, {name: req.body.name, new: true});
    if(!order){
        return res.status(400).send("failed to update order");
    }
    res.json({order});
});

exports.deleteOrder = (async (req, res) =>{
    const order = await Order.findByIdAndRemove(req.body.id, name);
    if(!order){
        return res.status(400).send("Could not delete order")
    }
    res.json({order})
})



