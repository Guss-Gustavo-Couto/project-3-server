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
        
        let ratingAverage = 0;
        let ratingLength = 0;
        for (let i = 0; i < allSitesFromDb.length; i++) {
          for (let j = 0; j < allSitesFromDb[i].reviews.length; j++) {
            ratingAverage += allSitesFromDb[i].reviews[j].rating;
            ratingLength++;
          }
  
          allSitesFromDb[i]["average"] = Math.round(ratingAverage / ratingLength);
          ratingAverage = 0;
          ratingLength = 0;
        }

        res.json(allSites, average);
    }
    catch(error){
        res.json(error);
    }
});

module.exports = router; 





