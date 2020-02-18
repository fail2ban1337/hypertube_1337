const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user)
      return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
    // console.log(">>>> passport.authenticate('jwt', ...)");

    req.user = user;
    req.id = user._id;
    next();
  })(req, res, next);
};
