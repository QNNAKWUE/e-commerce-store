const express = require('express');
const {Product} = require('../models/products');
const { 
    file, 
    deleteProduct, 
    getAllProducts,
    getProductById,
    getAllUniqueCategories,
 } = require('../controllers/products');
 const router = express.Router();

router.post('/', file);

module.exports = router;
// module.exports.Product = Product;


