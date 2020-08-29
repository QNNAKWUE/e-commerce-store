const express = require('express');
const mongoose = require('mongoose');
const { Product, validateProduct } = require('../models/products');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash')
const router = express.Router();

router.get('/', async (req, res) =>{
    const products = await Product.find().sort('name');
    res.send(products)
});

router.get('/', async (req, res) =>{
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(400).send('The product with the given ID was not found');
    }
    res.send(product);
});

router.post('/', async (req, res) =>{
    const {error} = validateProduct(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
    }
    let product = new Product(_.pick(req.body, ['name', 'description', 'price', 'category', 'stock', 'sold', 'photo']));

    await product.save()

    res.send(_.pick(product, ['name', 'description', 'price', 'category', 'stock', 'sold', 'photo']));
});

module.exports = router;