const express = require("express");
const router = express.Router();
const config = require("config");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = config.get("profileImages");
    fs.exists(dir, exists => {
      if (!exists) {
        return fs.mkdir(dir, error => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function(req, file, callback) {
    return callback(
      null,
      "IMAGE-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage: storage });

const midlleware = require("../../middleware/midlleware");
const profileModel = require("../../models/Profile");
const userModel = require("../../models/User");

// @route   GET api/profile/me
// @desc    Test route
// @access  Private
router.get("/me", [midlleware.auth], async (req, res) => {
  try {
    const profile = await profileModel
      .findOne({
        user: req.user.id
      })
      .populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({
        msg: "There is no profile for this user"
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile/image
// @desc    Upload profile image
// @access  Private
router.post("/image", upload.single("profileImage"), async (req, res) => {
  try {
    res.json(req.file.filename);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
