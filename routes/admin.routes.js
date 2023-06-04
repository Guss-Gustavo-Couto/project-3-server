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
router.get('/admin', async(req,res)=>{
    try{
        let allSites = await Gallery.find();
        res.json(allSites);
    }
    catch(error){
        res.json(error);
    }
});


router.get('/admin/:galleryId', async(req,res)=>{
    const {galleryId} = req.params;
    try{
        let gallery = await Gallery.findById(galleryId);
        res.json(gallery);
    }
    catch(error){
        res.json(error);
    }
});

// PUT to update info of a Inutil Site

router.put('/admin/:galleryId', async (req, res)=>{
    const {galleryId} = req.params;
    const {title, image, link, description, isaproved} = req.body;

    if(!mongoose.Types.ObjectId.isValid(galleryId)){
       res.status(400).json({message: 'Specified Id is not valid'}); 
       return; 
    }

    try{
        let updatedGallery = await Gallery.findByIdAndUpdate(galleryId, 
        {title, image,link, description, isaproved}, {new: true});
        res.json(updatedGallery);
    }
    catch(error){
        res.json(error);
    }
});

// DELETE to delete a Inutil Site
router.delete('/admin/:galleryId', async(req,res)=>{
    const {galleryId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(galleryId)){
        res.status(400).json({message: 'Specified Id is not valid'}); 
        return; 
    }

    try{
        await Gallery.findByIdAndRemove(galleryId);
        res.json({message: `Site with ${galleryId} is removed.`})
    }
    catch(error){
        res.json(error);
    }
});

module.exports = router; 
