// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require('mongoose');

// Require Cloudinary
//const fileUploader = require("../config/cloudinary.config");

// GET Route to display Notification
router.get('/submited', async(req,res)=>{
    try{
        let submitedSite = res.json(submitedSite);
    }
    catch(error){
        res.json(error);
    }
});

module.exports = router; 


