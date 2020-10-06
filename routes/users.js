const express = require('express');
const { User} = require('../models/users');
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const {signUp, getUsers, getUserOrder} = require('../controllers/user');
const router = express.Router();


router.post('/', signUp);
router.get('/', getUsers);
router.get('/', getUserOrder);

module.exports = router;
module.exports.User = User;







