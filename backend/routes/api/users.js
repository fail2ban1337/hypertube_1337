const express = require("express");
const router = express.Router();
const userModel = require("../../models/User");
const bcrypt = require("bcryptjs");
const middleware = require("../../middleware/midlleware");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// @route   Post api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("userName", "Name is requird")
      .not()
      .isEmpty(),
    check("firstName", "Please entre a valide a valide first-name").isLength({
      min: 3,
      max: 10
    }),
    check("lastName", "Please entre a valide last_name").isLength({
      min: 3,
      max: 10
    }),
    check("email", "Please include a valide Email").isEmail(),
    check(
      "password",
      "Please entre a password with 6 or more characters"
    ).isLength({
      min: 6
    }),
    check("confirmPassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = req.body;
    try {
      let user = await userModel.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          erros: [
            {
              msg: "User already Exists"
            }
          ]
        });
      }
      user = new userModel({
        userName,
        firstName,
        lastName,
        email,
        password
      });
      // Encrypte password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
