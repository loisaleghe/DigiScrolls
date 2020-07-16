const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Note = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: [30, "Title cannot be greater than 30 characters"],
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
      min: 10,
      max: [500, "Content cannot be greater than 500 characters"],
    },
    _author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", Note);
