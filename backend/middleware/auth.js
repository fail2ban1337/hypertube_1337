const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user)
      return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
    // console.log(">>>> passport.authenticate('jwt', ...)");

    const authUser = { ...user._doc };
    delete authUser.password;

    req.user = authUser;
    req.id = authUser._id;

    next();
  })(req, res, next);
};
