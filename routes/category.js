const express = require('express');
const { createCategories, getCategories } = require('../controllers/category');
const  { isAdmin } = require('../middleware/admin');
const  { Auth } = require('../middleware/Auth');


const router = express.Router();

router.post('/create-category', createCategories);
router.get('/get-categories', getCategories);

module.exports = router;