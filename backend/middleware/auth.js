const passport = require("passport");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user)
      return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });

    const authUser = { ...user._doc };
    delete authUser.password;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(authUser._id);
    if (!isValidObjectId)
      return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });

    req.user = authUser;
    req.id = authUser._id;

    next();
  })(req, res, next);
};
