const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const FortyTwoStrategy = require("passport-42").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");
const utils = require("../utils");

const findUser = async (data, done, type) => {
  try {
    // select user by email
    const user = await User.findOne({ email: data.email });

    if (user) {
      // email already exists in DB

      // check if the email strategy is local
      if (user.strategy === "local") {
        return done("connect_using_local_strategy", false);
      }

      // check if the email belongs to his googleId || ftId
      if (user[`${type}Id`] !== data[`${type}Id`]) {
        // email has been changed from last login
        // email already exists in DB AND Belongs to another account
        // user is trying to hack another user account
        return done("email_already_used", false);
      }

      // check if email is verified
      if (user.isVerified) {
        // user account is verified
        // grant login access
        user[`${type}Id`] = data[`${type}Id`];
        user
          .save()
          .then(user => done(null, user))
          .catch();
      } else {
        // user account is not verified
        // send error message
        done("email_is_not_verified", false);
      }
    } else {
      // email does not exist in DB

      // check if typeId already Exists in DB
      //    in case if user already logged in
      //    and he wants to change his email addreess
      const oldUser = await User.findOne({ [`${type}Id`]: data[`${type}Id`] });
      if (oldUser) {
        // user already exists but with another email
        // update his email address and grant login access
        oldUser.email = data.email;
        if (!oldUser.isVerified) {
          return done("email_is_not_verified", false);
        }
        oldUser
          .save()
          .then(user => done(null, oldUser))
          .catch();
      } else {
        // typeId does not exists in DB
        // register new user
        if (!data.isVerified) data.token_confirm_account = utils.uniqid();
        new User(data)
          .save()
          .then(user => {
            if (!user.isVerified) {
              utils.sendConfirmationEmail(
                user.email,
                user.username,
                user.token_confirm_account
              );
              return done("verification_email_sent", false);
            }
            done(null, user);
          })
          .catch();
      }
    }
  } catch (err) {
    done(err, false);
  }
};

const generateUsername = async (firstName, lastName) => {
  let username = (firstName[0] + lastName).slice(0, 8).toLowerCase();
  let user = await User.findOne({ username });
  let i = 1;
  while (user) {
    username = (firstName.substring(0, i) + lastName).slice(0, 8).toLowerCase();
    user = await User.findOne({ username });
    i++;
  }
  return username;
};

const checkUsername = async username => {
  let user = await User.findOne({ username });
  let i = 0;
  while (user) {
    username += i;
    user = await User.findOne({ username });
    i++;
  }
  return username;
};

module.exports = passport => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret"
  };

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const id = jwt_payload.id;
      User.findById(id)
        .then(user => done(null, user ? user : false))
        .catch(err => done(err));
    })
  );

  passport.use(
    "local_login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
        session: false
      },
      (req, username, password, done) => {
        // search for user
        User.findOne({ username: username })
          .then(user => {
            if (user) {
              if (user.strategy !== "local") {
                return done("duplicate_email_scope_error", false);
              }
              user.cmpPassword(password, (err, match) => {
                if (err) done("invalid_email_or_password", false);
                if (match) {
                  if (user.isVerified) {
                    // user verified
                    done(null, user.addToken());
                  } else {
                    // user not yet verified
                    done("account_not_verified", false);
                  }
                } else {
                  // incorrect password
                  done("incorrect_password", false);
                }
              });
            } else {
              done("username_not_exist", false);
            }
          })
          .catch(err => done(err.message, false));
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_ID,
        clientSecret: process.env.GOOGLE_OAUTH_PASS,
        callbackURL: `${process.env.API_URL}/oauth/googlered`
      },
      async (accessToken, refreshToken, profile, done) => {
        let userName = await generateUsername(
          profile.name.givenName,
          profile.name.familyName
        );
        userName = await checkUsername(userName);
        const user = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          image: profile.photos[0].value,
          username: userName,
          email: profile.emails[0].value,
          googleId: profile.id,
          isVerified: profile.emails[0].verified,
          strategy: "omniauth"
        };
        findUser(user, done, "google");
      }
    )
  );

  passport.use(
    new FortyTwoStrategy(
      {
        clientID: process.env.FT_OAUTH_ID,
        clientSecret: process.env.FT_OAUTH_PASS,
        callbackURL: `${process.env.API_URL}/oauth/ft_ret`
      },
      async (accessToken, refreshToken, profile, done) => {
        const username = await checkUsername(profile.username);
        const user = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          username,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
          ftId: profile.id,
          isVerified: false,
          strategy: "omniauth"
        };
        findUser(user, done, "ft");
      }
    )
  );
};
