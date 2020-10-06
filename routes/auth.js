const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {User} = require('../models/users');
const { auth, signIn, signUp } = require('../controllers/auth');
const { check, validationResult} = require('express-validator');


router.post("/signUp", signUp);
router.post("/signIn", signIn);

module.exports = router;
