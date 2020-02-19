const express = require("express");
const passport = require("passport");

const validatorController = require("../controllers/validator.controller");
const userController = require("../controllers/User.controller");
const router = express.Router();

/**
 * Omniauth Routes
 */

router.get("/omniauth/ft", passport.authenticate("42"));

router.get(
  "/omniauth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.post("/local/login", (req, res, next) => {
  passport.authenticate("local_login", (err, user, info) => {
    if (err) {
      // login failure
      return res.status(401).json({ errors: [{ msg: err }] });
    } else if (!user) {
      // login failure
      return res
        .status(401)
        .json({ success: false, errors: [{ msg: info.message }] });
    } else {
      // login success
      return res.status(200).json({ success: true, jwt: user.jwt });
    }
  })(req, res, next);
});

router
  .route("/local/register")
  .post(validatorController.validateRegister, userController.register);

/**
 * Other routes
 */

router
  .route("/verify_email")
  .post(validatorController.validateVerifyEmail, userController.verifyEmail);

// check if token confirmation email exists in DB
router
  .route("/is_token_exists/confirmation")
  .post(
    validatorController.validateIsTokenConfirmationExists,
    userController.isAccountConfirmationTokenExists
  );

// send email contains link to reset password
router
  .route("/user/send_reset_password")
  .post(
    validatorController.validateSendResetPasswordEmail,
    userController.sendResetPasswordEmail
  );

// check if token reset password exists in DB
router
  .route("/is_token_exists/password_reset")
  .post(
    validatorController.validateIsTokenPasswordResetExists,
    userController.isResetPasswordTokenExists
  );

// reset password
router
  .route("/user/email_reset_password")
  .post(
    validatorController.validateEmailResetPassword,
    userController.emailResetPassword
  );

module.exports = router;
