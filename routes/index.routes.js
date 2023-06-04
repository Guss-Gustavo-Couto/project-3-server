const express = require("express");
const router = express.Router();

// Require Cloudinary
// const fileUploader = require("../config/cloudinary.config");

// Require Mongoose
const mongoose = require("mongoose");

// Require Models
const Gallery = require("../models/Gallery.model");

router.get("/", async (req, res, next) => {
  const allGallery = await Gallery.find();
  const latestGallery = allGallery.sort((a, b) => b.createdAt - a.createdAt);

  res.json(latestGallery);
});

module.exports = router;
