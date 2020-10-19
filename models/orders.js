const mongoose = require('mongoose');
const Joi = require('joi');
 
const orderSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

    amount: Number,

    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],
    },
    address: {
        type: String,
        required: true,
    },

   timestamps: {
      type: Boolean,
  },

});

const Order = mongoose.model('Order', orderSchema);
const order = new Order({});

function validateOrder(orders){
  const schema = {
    name: Joi.string().max(30).required(),
    amount: Joi.number().required(),
    address: Joi.string().max(200).required(),

  }

}
module.exports.Order = Order;
module.exports.validate = validateOrder;