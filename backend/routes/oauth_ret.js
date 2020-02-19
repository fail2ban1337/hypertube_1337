const passport = require("passport");
const express = require("express");
const router = express.Router();

const errorMiddleware = (err, req, res, next) => {
  if (err) {
    // console.error(">> Error: ", err);
    return res.redirect(
      `${process.env.CLIENT_URL}/login?action=error&key=${err}`
    );
  }
};

const renderMiddleware = (req, res) => {
  // console.log("#####################");
  // console.log("renderMiddleware: ", req.user);
  // console.log("#####################");

  const jwt = req.user.addToken().jwt;
  // redirect to reactJs page with parameter jwt
  return res.redirect(
    `${process.env.CLIENT_URL}/login?action=set_jwt&key=${jwt}`
  );
};

router.get(
  "/ft_ret",
  passport.authenticate("42", {
    failureRedirect: `${process.env.CLIENT_URL}/login`
  }),
  errorMiddleware,
  renderMiddleware
);

router.get(
  "/googlered",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`
  }),
  errorMiddleware,
  renderMiddleware
);

module.exports = router;
