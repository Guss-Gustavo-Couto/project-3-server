const express = require("express");
const router = express.Router();

// Require Cloudinary
// const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
