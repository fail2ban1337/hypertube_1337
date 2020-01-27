const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = user = mongoose.model("user", UserSchema);
