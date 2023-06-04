// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require('mongoose');

// Require Models
const Gallery = require('../models/Gallery.model');

// Require Cloudinary
// const fileUploader = require("../config/cloudinary.config");

// GET Route to display all Inutil Websites
router.get('/gallery', async(req,res)=>{
    try{
        let allSites = await Gallery.find();
        res.json(allSites);
    }
    catch(error){
        res.json(error);
    }
});

module.exports = router; 





