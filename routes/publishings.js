const express = require("express");
const router = express.Router();
const Publishing = require("../models/publishing");

// Getting all
router.get("/", async (req, res) => {
  try {
    const publishings = await Publishing.find();
    res.json(publishings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getPublishing, (req, res) => {
  res.json(res.publishing);
});

// Creating one
router.post("/", async (req, res) => {
  const publishing = new Publishing({
    name: req.body.name,
    years: req.body.years,
    weight: req.body.weight,
    isMale: req.body.isMale,
    color: req.body.color,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    breed: req.body.breed,
    species: req.body.species,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    dateCreated: new Date(),
    likedBy: req.body.likedBy,
  });
  try {
    const newPublishing = await publishing.save();
    res.status(201).json(newPublishing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getPublishing, async (req, res) => {
  if (req.body.name != null) {
    res.publishing.name = req.body.name;
  }
  if (req.body.years != null) {
    res.publishing.years = req.body.years;
  }
  if (req.body.weight != null) {
    res.publishing.weight = req.body.weight;
  }
  if (req.body.isMale != null) {
    res.publishing.isMale = req.body.isMale;
  }
  if (req.body.color != null) {
    res.publishing.color = req.body.color;
  }
  if (req.body.imageUrl != null) {
    res.publishing.imageUrl = req.body.imageUrl;
  }
  if (req.body.userId != null) {
    res.publishing.userId = req.body.userId;
  }
  if (req.body.breed != null) {
    res.publishing.breed = req.body.breed;
  }
  if (req.body.species != null) {
    res.publishing.species = req.body.species;
  }
  if (req.body.latitude != null) {
    res.publishing.latitude = req.body.latitude;
  }
  if (req.body.longitude != null) {
    res.publishing.longitude = req.body.longitude;
  }
  if (req.body.dateCreated != null) {
    res.publishing.dateCreated = req.body.dateCreated;
  }
  if (req.body.likedBy != null) {
    res.publishing.likedBy = req.body.likedBy;
  }

  try {
    const updatedPublishing = await res.publishing.save();
    res.json(updatedPublishing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getPublishing, async (req, res) => {
  try {
    await res.publishing.remove();
    res.json({ message: "Deleted publishing" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deleting All
router.delete("/", async (req, res) => {
  try {
    await Publishing.deleteMany();
    res.json({ message: "Deleted publishing" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPublishing(req, res, next) {
  let publishing;
  try {
    publishing = await Publishing.findById(req.params.id);
    if (publishing == null) {
      return res.status(404).json({ message: "Cannot find publishing" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.publishing = publishing;
  next();
}

module.exports = router;
