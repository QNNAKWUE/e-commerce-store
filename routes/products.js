const express = require('express');
const {Product} = require('../models/products');
const { 
    createProduct, 
    deleteProduct, 
    getAllProducts,
    getProductById,
    getAllUniqueCategories,
    updateProduct,
 } = require('../controllers/products');
 const router = express.Router();

router.post('/create-product', createProduct);
router.get('getAllProducts', getAllProducts);
router.get('getProductById', getProductById);
router.post('updateProduct', updateProduct);

module.exports = router;
// module.exports.Product = Product;


