const { Order } = require("../models/orders");
const {validate} = require("../models/orders");
const _  = require('lodash');

exports.getOrderById = (async (req, res, id) =>{
    const order = await Order.findById(id)
    .sort("Product", "name")
    if(!order) {
        return res.status(400).send("The order with the given ID was not found")
    }
    res.json({order});  
});

exports.getAllOrders = async(req, res) =>{
    const orders = await orders.find().sort(name);
    if(!orders) {
        res.status(400).send("Could not get Orders");
    }
    res.send(orders);
}

exports.createOrder = async (req, res) =>{
    const error = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const order = new Order({
        name: req.body.name,
        address: req.body.address,
        amount: req.body.amount,
        status: req.body.status
    }) ;
    
    await order.save();
    res.json({order});
}


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



