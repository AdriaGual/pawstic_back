const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Getting all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getUser, (req, res) => {
  res.json(res.publishing);
});

// Creating one
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    var user = await User.findOne({ email: req.body.email });
    const cmp = await bcrypt.compare(req.body.password, user.password);
    if (cmp) {
      res.status(200).json({ usuario: user, ok: true });
    } else {
      res.status(400).json("Passwords dont match");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.publishing.name = req.body.name;
  }
  if (req.body.email != null) {
    res.publishing.email = req.body.email;
  }
  if (req.body.password != null) {
    res.publishing.password = req.body.password;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deleting All
router.delete("/", async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.find(ObjectId(req.params.id));
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
