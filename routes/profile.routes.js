// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require("mongoose");

// Require Model
const User = require("../models/User.model");

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
