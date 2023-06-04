const express = require("express");
const router = express.Router();

// Require Cloudinary
// const fileUploader = require("../config/cloudinary.config");

// Require Mongoose
const mongoose = require('mongoose');

// Require Models
const Gallery = require('../models/Gallery.model');

router.get("/", async (req, res, next) => {

  const allGallery = await Gallery.find();
  const latestGallery = allGallery.sort((a, b) => b.createdAt - a.createdAt);
  const new1 = latestPhotos[0];
  const new2 = latestPhotos[1];
  const new3 = latestPhotos[2];
  const new4 = latestPhotos[3];

  res.json(latestPhotos);
}); 

module.exports = router;
