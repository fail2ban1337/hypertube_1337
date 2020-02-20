const express = require("express");

const validatorController = require("../controllers/validator.controller");
const userController = require("../controllers/User.controller");
const router = express.Router();

router.route("/test").get((req, res) => {
  return res.json({
    message: "Welcome to your Private Space :D",
    user: req.user,
    user_id: req.id
  });
});

module.exports = router;
