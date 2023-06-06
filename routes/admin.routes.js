// Require Express
const express = require("express");
const router = express.Router();

// Require Mongoose
const mongoose = require("mongoose");

// Require Models
const Gallery = require("../models/Gallery.model");
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

// GET Route to display all Inutil Websites
router.get("/admin", async (req, res) => {
  try {
    let allSites = await Gallery.find();
    let allUsers = await User.find();
    res.json({ allSites, allUsers });
  } catch (error) {
    res.json(error);
  }
});

// Post Route to display add admin type
router.put("/isadmin", async (req, res) => {
  const { _id, admin } = req.body;
  try {
    const updateAdmin = await User.findByIdAndUpdate(
      _id,
      { admin },
      { new: true }
    );
    res.json(updateAdmin);
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin/:galleryId", async (req, res) => {
  const { galleryId } = req.params;
  try {
    let gallery = await Gallery.findById(galleryId);
    res.json(gallery);
  } catch (error) {
    res.json(error);
  }
});

// PUT to update info of a Inutil Site

router.put("/admin/:galleryId", async (req, res) => {
  const { galleryId } = req.params;
  const { title, image, link, description, isaproved } = req.body;

  if (!mongoose.Types.ObjectId.isValid(galleryId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  try {
    let updatedGallery = await Gallery.findByIdAndUpdate(
      galleryId,
      { title, image, link, description, isaproved },
      { new: true }
    );
    res.json(updatedGallery);
  } catch (error) {
    res.json(error);
  }
});

// DELETE to delete a Inutil Site
router.delete("/admin/:galleryId", async (req, res) => {
  const { galleryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(galleryId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  try {
    await Gallery.findByIdAndRemove(galleryId);
    res.json({ message: `Site with ${galleryId} is removed.` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
