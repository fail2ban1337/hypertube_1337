const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

UserSchema.pre('save',  function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
      id: this._id,
      email: this.email,
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  });
};
module.exports = user = mongoose.model("user", UserSchema);
