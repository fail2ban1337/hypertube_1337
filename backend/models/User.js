const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verificationKey: {
    type: String
  },
  recoveryKey: {
    type: String
  },
  bio: {
    type: String
  },
  profileImage: {
    type: String,
    default: "profile_default_image.png"
  },

  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = user = mongoose.model("user", UserSchema);
