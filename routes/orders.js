const express = require('express');
const { Order} = require('../models/orders');
const {
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
} = require('../controllers/orders');
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/update-order', updateOrder);
router.get('/get-OrderById', getOrderById);
router.get('/get-orders', getAllOrders);
router.post('/delete-order', getOrderById);

module.exports = router;
