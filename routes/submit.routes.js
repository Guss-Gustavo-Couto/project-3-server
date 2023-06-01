// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require('mongoose');

// Require Models
const Gallery = require('../models/Gallery.model');


// POST ROUTE that Creates a new Inutil Site
router.post('/submit', async (req,res)=>{
    const {title, image, link, description, isaproved} = req.body;

    try{
        // We wait until we have the status of the creation of New Site to make the next step
        let response = await Gallery.create({title, image, link, description, isaproved});
        // Send the response as a json file, because we're making an API
        res.json(response);
    }
    catch(error){
        res.json(error);
    }


});

module.exports = router; 