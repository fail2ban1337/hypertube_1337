const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const utils = require("../utils");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String
  },
  ftId: {
    type: String
  },
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
    required: false
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
  },
  strategy: {
    type: String
  },
  token_confirm_account: {
    type: String
  },
  token_reset_password: {
    type: String
  }
});

UserSchema.pre("save", function(next) {
  if (
    this.password !== undefined &&
    (this.isModified("password") || this.isNew)
  ) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.cmpPassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) return done(err);
    done(null, match);
  });
};

UserSchema.methods.addToken = function() {
  // const opt = { expiresIn: 86400 };
  const payload = { id: this._id };
  const user = this._doc;
  delete user.password;
  user.jwt = jwt.sign(payload, "secret");
  return user;
};

UserSchema.statics.register = (
  email,
  username,
  password,
  first_name,
  last_name,
  strategy
) => {
  const UserModel = mongoose.model("user", UserSchema);
  // check if email already exists
  return UserModel.findOne({ $or: [{ email: email }, { username: username }] })
    .then(user => {
      if (user) {
        // a field already exists
        const rslt = {
          success: false,
          message: ""
        };
        if (user.email === email) rslt.message = "Email already exists. ";
        if (user.username === username)
          rslt.message += "Username already exists. ";
        return rslt;
      } else {
        // register user
        return new UserModel({
          email: email,
          username: username,
          password: password,
          first_name: first_name,
          last_name: last_name,
          isVerified: false,
          strategy: strategy,
          token_confirm_account: utils.uniqid()
        })
          .save()
          .then(user => {
            // send verification email
            utils.sendConfirmationEmail(
              user.email,
              user.username,
              user.token_confirm_account
            );
            // return rslt
            return {
              success: true,
              message: "User inserted successfully"
            };
          })
          .catch(err => {
            throw new Error(`### Exception in User.methods.register : ${err}`);
          });
      }
    })
    .then(result => {
      return Promise.resolve(result);
    })
    .catch(err => {
      return Promise.reject(
        new Error(`### Exception in User.methods.register : ${err}`)
      );
    });
};

module.exports = user = mongoose.model("user", UserSchema);
