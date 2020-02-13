const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Load user model
const userModel = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "userName" },
      (username, password, done) => {
        userModel.findOne({ userName: username })
          .then(user => {
            if (!user) {
              return done(null, false, { message: "user is not register" });
            //   return console.log("user is not register" );
            }
            //match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err){
                  throw err;
              } 
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
