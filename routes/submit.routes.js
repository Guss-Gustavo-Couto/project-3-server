// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require('mongoose');

// Require Models
const Gallery = require('../models/Gallery.model');

// Require Cloudinary
const fileUploader = require("../config/cloudinary.config");

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
    // console.log("file is: ", req.file)
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ fileUrl: req.file.path });
  });


// POST ROUTE that Creates a new Inutil Site
router.post('/submit', /*fileUploader.single("image"),*/ async (req,res)=>{
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