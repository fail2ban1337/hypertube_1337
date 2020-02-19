const User = require("../models/User");
const validatorController = require("./validator.controller");
const utils = require("../utils");

exports.register = (req, res) => {
  // check validation errors
  const errors = validatorController.checkValidationErrors(req);
  if (errors) return res.status(400).json({ errors: errors });

  const { email, username, password, first_name, last_name } = req.body;
  User.register(email, username, password, first_name, last_name, "local")
    .then(rslt => {
      if (rslt.success) {
        // util.sendConfirmationEmail(email, rslt.username, rslt.email_token);
        return res.status(200).json({
          message: "register_success_email_sent"
        });
      }
      return res.status(400).json({ message: rslt.message });
    })
    .catch(err => {
      console.error(err);
      return res.status(400).json({
        message: `Error Occured in User.controller.register: ${err}`
      });
    });
};

/**
 * Verify Email
 */
exports.verifyEmail = (req, res) => {
  // check validation errors
  const errors = validatorController.checkValidationErrors(req);
  if (errors) return res.status(400).json({ errors: errors });

  const { email_token, email } = req.body;
  User.findOne({ token_confirm_account: email_token })
    .then(user => {
      if (user) {
        // email_token exists
        if (user.email === email) {
          // all infos are ok
          // verify user account
          user.isVerified = true;
          // delete token_confirm_account field
          user.token_confirm_account = undefined;
          return user
            .save()
            .then(user =>
              res.status(200).json({
                success: true,
                message: "Account Verified Successfully"
              })
            )
            .catch(err =>
              res.status(400).json({
                errors: [{ msg: err.message }]
              })
            );
        } else {
          // email does not belong to this email_token
          return res
            .status(400)
            .json({ errors: [{ msg: "Bad email or email_token" }] });
        }
      } else {
        // email_token does not exists
        return res
          .status(400)
          .json({ errors: [{ msg: "Bad email or email_token" }] });
      }
    })
    .catch(err => res.status(400).json({ errors: [{ msg: err.message }] }));
};

/**
 * Check if confirmation account token exists
 */
exports.isAccountConfirmationTokenExists = (req, res) => {
  // check validation errors
  const errors = validatorController.checkValidationErrors(req);
  if (errors)
    return res.status(400).json({
      errors: errors
    });

  const { email_token } = req.body;
  // check and return result
  User.findOne({ token_confirm_account: email_token })
    .then(user => {
      if (user)
        return res.status(200).json({ success: true, message: "token exists" });
      res
        .status(200)
        .json({ success: false, message: "token does not exists" });
    })
    .catch(err => res.status(400).json({ errors: [{ msg: err.message }] }));
};

/**
 * send email contains link to reset password
 */
exports.sendResetPasswordEmail = async (req, res) => {
  // check validation errors
  const errors = validatorController.checkValidationErrors(req);
  if (errors)
    return res.status(400).json({
      errors: errors
    });

  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      // check if email eists in DB
      if (!user)
        return {
          success: false,
          message: "Email does not belong to any user"
        };
      if (user.strategy !== "local")
        return {
          success: false,
          message:
            "This account does not have a password you can connect using Google or 42 Intranet account"
        };
      // email exists
      // generate email_token and send reset_password email
      user.token_reset_password = utils.uniqid();
      return user.save();
    })
    .then(result => {
      if (
        result &&
        typeof result.success !== "undefined" &&
        result.success === false
      ) {
        return result;
      }

      const user = result;
      utils.sendResetPasswordEmail(
        user.email,
        user.username,
        user.token_reset_password
      );
      return {
        success: true,
        message: "Reset Password Email is sent"
      };
    })
    .then(result => {
      return res
        .status(result.success ? 200 : 400)
        .json({ message: result.message });
    })
    .catch(err => {
      return res.status(400).json({
        errors: [
          {
            msg: err.message
          }
        ]
      });
    });
};

/**
 * Check if confirmation account token exists
 */
exports.isResetPasswordTokenExists = (req, res) => {
  // check validation errors
  const errors = validatorController.checkValidationErrors(req);
  if (errors)
    return res.status(400).json({
      errors: errors
    });

  const { email_token } = req.body;
  // check and return result
  User.findOne({
    token_reset_password: email_token
  })
    .then(user => {
      if (user)
        return res.status(200).json({
          success: true,
          message: "token exists"
        });
      res.status(200).json({
        success: false,
        message: "token does not exists"
      });
    })
    .catch(err =>
      res.status(400).json({
        errors: [
          {
            msg: err.message
          }
        ]
      })
    );
};

/**
 * Reset Password using email_token
 */
exports.emailResetPassword = (req, res) => {
  // check validation errors
  const errors = validatorController.checkValidationErrors(req);
  if (errors) return res.status(400).json({ errors: errors });

  const { email_token, email, newPwd } = req.body;
  User.findOne({
    email: email,
    token_reset_password: email_token,
    strategy: "local"
  })
    .then(user => {
      if (!user)
        return {
          success: false,
          message: "Bad email or email_token"
        };
      user.password = newPwd;
      user.token_reset_password = undefined;
      return user.save();
    })
    .then(result => {
      if (
        result &&
        typeof result.success !== "undefined" &&
        result.success === false
      ) {
        return result;
      }

      return {
        success: true,
        message: "Password updated successfully"
      };
    })
    .then(result => {
      return res
        .status(result.success ? 200 : 400)
        .json({ message: result.message });
    })
    .catch(err => {
      return res.status(400).json({
        errors: [
          {
            msg: err.message
          }
        ]
      });
    });
};
