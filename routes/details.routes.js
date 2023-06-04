// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require("mongoose");

// Require Models
const Gallery = require("../models/Gallery.model");
const Review = require("../models/Review.model");

// Require Cloudinary
// const fileUploader = require("../config/cloudinary.config");

// GET to display specific info of a Inutil Sit
router.get("/details/:galleryId", async (req, res) => {
  const { galleryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(galleryId)) {
    // status of 2xx is successful.
    // error with 4xx is client-side.
    // error with 5xx is server-side
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  try {
    let foundGallery = await Gallery.findById(galleryId);
    res.status(200).json(foundGallery);
  } catch (error) {
    res.json(error);
  }
});

// POST route to Create a New Review
router.post("/details", async (req, res) => {
  const { description, rating, galleryId } = req.body;

  try {
    // Create a New Task
    let newReview = await Review.create({ description, rating, galleryId });

    // Push a New Task to a Project
    let response = await Gallery.findByIdAndUpdate(galleryId, {
      $push: { reviews: newReview._id },
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
