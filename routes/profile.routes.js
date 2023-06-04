// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require("mongoose");

// Require Model
const User = require("../models/User.model");

// Require Cloudinary
// const fileUploader = require("../config/cloudinary.config");

// PUT route to edit a user

router.put("/profile/:userId", async (req, res) => {
  const { userId } = req.params;
  const { email, password, name, image, description, media } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  try {
    let updatedProfile = await User.findByIdAndUpdate(
      userId,
      { email, password, name, image, description, media },
      { new: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    res.json(error);
  }
});

router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await User.findById(userId);
    res.json(profile);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
