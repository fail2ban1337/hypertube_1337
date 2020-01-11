const express = require("express");
const router = express.Router();
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

module.exports = router;
