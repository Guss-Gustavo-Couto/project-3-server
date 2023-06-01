const { Schema, model } = require("mongoose");
const { checkout } = require("../app");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    image: { type: String },
    description: { type: String, required: true },
    media: {type: String},
    admin: { type: Boolean, required: true }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
