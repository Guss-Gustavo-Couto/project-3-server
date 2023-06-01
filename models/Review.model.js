const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    gallery: { type: Schema.Types.ObjectId, ref: "Gallery" },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
