// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require("mongoose");

// Require Models
const Gallery = require("../models/Gallery.model");

// Require Cloudinary
// const fileUploader = require("../config/cloudinary.config");

// GET Route to display all Inutil Websites
router.get("/gallery", async (req, res) => {
  try {
    let allSites = await Gallery.find().populate("reviews");

    let ratingSum = 0;
    let ratingLength = 0;
    for (let i = 0; i < allSites.length; i++) {
      for (let j = 0; j < allSites[i].reviews.length; j++) {
        ratingSum += allSites[i].reviews[j].rating;
        ratingLength++;
      }

      const avg = Math.round(ratingSum / ratingLength);

      allSites[i]["average"] = avg;

      ratingSum = 0;
      ratingLength = 0;
    }

    res.json(allSites);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;




