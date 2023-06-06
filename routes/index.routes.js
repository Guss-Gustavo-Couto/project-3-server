const express = require("express");
const router = express.Router();

// Require Cloudinary
// const fileUploader = require("../config/cloudinary.config");

// Require Mongoose
const mongoose = require("mongoose");

// Require Models
const Gallery = require("../models/Gallery.model");

router.get("/", async (req, res, next) => {
  try {
    const allGallery = await Gallery.find();
    const latestGallery = allGallery.sort((a, b) => b.createdAt - a.createdAt);
    const allLinks = [await Gallery.link.find().populate("links")];
    const randomLink = allLinks[Math.floor(Math.random() * allLinks.length)];

  res.json(latestGallery, randomLink);
    
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
