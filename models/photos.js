const express = require('express');
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
        unique_id:Number,
        Name: String,
        image1:String,
        image2:String,
        image3:String,
        added_date:{
            type: Date,
            default: Date.now
        }
});

const Photo = mongoose.model('Photo', photoSchema);
const photo = new Photo({}); 

module.exports = Photo;