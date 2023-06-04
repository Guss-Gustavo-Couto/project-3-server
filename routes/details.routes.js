// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require("mongoose");

// Require Models
const Gallery = require("../models/Gallery.model");
const Review = require("../models/Review.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

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
    let foundGallery = await Gallery.findById(galleryId).populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
      },
    });
    res.status(200).json(foundGallery);
  } catch (error) {
    res.json(error);
  }
});

// POST route to Create a New Review
router.post("/details", isAuthenticated, async (req, res) => {
  const jwt = req.payload;
  const authorId = jwt._id;
  const { description, rating, galleryId } = req.body;

  try {
    // Create a New Review
    let newReview = await Review.create({
      description,
      rating,
      galleryId,
      author: authorId,
    });

    // Push a New Review to the Gallery
    let responseGallery = await Gallery.findByIdAndUpdate(galleryId, {
      $push: { reviews: newReview._id },
    });

    // Push a New Review to the User
    let responseUser = await User.findByIdAndUpdate(authorId, {
      $push: { reviews: newReview._id },
    });

    res.json(responseGallery);
  } catch (error) {
    res.json(error);
  }
});

// DELETE route to delete a Review
router.delete("/details/:reviewId", async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    // status of 2xx is successful.
    // error with 4xx is client-side.
    // error with 5xx is server-side
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  try {
    let response = await Review.deleteOne({
      _id: reviewId,
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;