const { Schema, model } = require("mongoose");

const gallerySchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    average: { type: Number },
    description: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    isaproved: { type: Boolean, default: false },
  },
  {
    timestamp: true,
  }
);

const Gallery = model("Gallery", gallerySchema);

module.exports = Gallery;
