const mongoose = require("mongoose");

const publishingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  years: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  isMale: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  species: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
  },
  likedBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Publishing", publishingSchema);
