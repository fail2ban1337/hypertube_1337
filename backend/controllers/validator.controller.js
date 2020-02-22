const { buildCheckFunction, validationResult } = require("express-validator");
const check = buildCheckFunction(["body", "query", "params"]);

/**
 *
 * helper function to get my cunstom errors
 */
exports.checkValidationErrors = req => {
  function removeDuplicateErrors(errors) {
    // remove doubles
    var obj = {};
    for (let i = errors.length - 1; i >= 0; i--)
      obj[errors[i]["param"]] = errors[i];
    errors = new Array();
    for (var key in obj) errors.push(obj[key]);
    // remove field 'location'
    for (let i = 0; i < errors.length; i++) {
      delete errors[i].location;
    }
    // return errors array reversed
    return errors.reverse();
  }

  // Finds the validation errors in this request
  // and wraps them in an object with handy functions
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    // remove sub errors of same field, keep the first field error
    return removeDuplicateErrors(errors.array());
  }
  return null;
};

const validateUsername = fieldName =>
  check(fieldName)
    .exists()
    .withMessage(`username is required`)
    .isString()
    .withMessage(`username must not contain spaces`)
    .isLength({
      min: 6
    })
    .withMessage(`username length must be at least 6 characters`)
    .isLength({ max: 50 })
    .withMessage("username length can be maximum 50 chars")
    .isAlphanumeric()
    .withMessage(
      "Username must contain only Alphabetic and Numeric characters"
    );

const validatePassword = fieldName =>
  check(fieldName)
    .exists()
    .withMessage(`Password is required`)
    .isString()
    .withMessage(`Password must be String`)
    .isLength({ min: 8 })
    .withMessage(`Password length must be at least 8 characters`)
    .isLength({ max: 100 })
    .withMessage("Password length can be maximum 100 chars")
    .matches("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}")
    .withMessage(
      "Password must contain uppercase letters and lowercase letters and numbers"
    );

const validateEmail = fieldName =>
  check(fieldName)
    .exists()
    .withMessage(`email is required`)
    .isEmail()
    .withMessage(`Invalid email`);

exports.validateRegister = [
  // username
  validateUsername("username"),
  // password
  validatePassword("password"),
  // email
  validateEmail("email"),
  // first_name
  check("first_name")
    .exists()
    .isAlpha()
    .withMessage("first name must be only alphabetical chars")
    .withMessage("first name is required")
    .isString()
    .withMessage("first name must be String")
    .trim()
    .isLength({ min: 1 })
    .withMessage("first name must be at least 1 character"),
  // last_name
  check("last_name")
    .exists()
    .isAlpha()
    .withMessage("last name must be only alphabetical chars")
    .withMessage("last name is required")
    .isString()
    .withMessage("last name must be String")
    .trim()
    .isLength({ min: 1 })
    .withMessage("last name must be at least 1 character")
];

exports.validateVerifyEmail = [
  // email
  validateEmail("email"),
  // email_token
  check("email_token")
    .exists()
    .withMessage("Email token is required")
    .isString()
    .withMessage("Email token must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email token must be at least 1 character")
];

exports.validateIsTokenConfirmationExists = [
  // email_token
  check("email_token")
    .exists()
    .withMessage("Email token is required")
    .isString()
    .withMessage("Email token must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email token must be at least 1 character")
];

exports.validateSendResetPasswordEmail = [
  // email
  validateEmail("email")
];

exports.validateIsTokenPasswordResetExists = [
  // email_token
  check("email_token")
    .exists()
    .withMessage("Email token is required")
    .isString()
    .withMessage("Email token must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email token must be at least 1 character")
];

exports.validateEmailResetPassword = [
  // email
  validateEmail("email"),
  // email_token
  check("email_token")
    .exists()
    .withMessage("Email token is required")
    .isString()
    .withMessage("Email token must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email token must be at least 1 character"),
  // new password
  validatePassword("newPwd"),
  // confirm new password
  check("confirmNewPwd")
    .exists()
    .withMessage("Confirm new password is required")
    .custom((confirmNewPwd, { req, loc, path }) => {
      if (confirmNewPwd !== req.body.newPwd) {
        // trow error if passwords do not match
        throw new Error("Passwords mismatch");
      } else {
        return confirmNewPwd;
      }
    })
];

exports.validateUpdateUser = [
  // username
  validateUsername("username"),
  // password
  check("newPassord")
    .if(
      (value, { req }) =>
        req.user.strategy !== "omniauth" && req.body.newPassword !== ""
    )
    .exists()
    .withMessage(`Password is required`)
    .isString()
    .withMessage(`Password must be String`)
    .isLength({ min: 8 })
    .withMessage(`Password length must be at least 8 characters`)
    .isLength({ max: 100 })
    .withMessage("Password length can be maximum 100 chars")
    .matches("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}")
    .withMessage(
      "Password must contain uppercase letters and lowercase letters and numbers"
    ),
  // confirm password
  check("confirmPassword", "Password not match")
    .if((value, { req }) => req.user.strategy !== "omniauth")
    .custom((value, { req }) => value === req.body.newPassword),
  // email
  validateEmail("email"),
  // first_name
  check("first_name")
    .exists()
    .withMessage("first name is required")
    .isAlpha()
    .withMessage("first name must be only alphabetical chars")
    .isString()
    .withMessage("first name must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("first name must be at least 1 character"),
  // last_name
  check("last_name")
    .exists()
    .withMessage("last name is required")
    .isAlpha()
    .withMessage("last name must be only alphabetical chars")
    .isString()
    .withMessage("last name must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("last name must be at least 1 character")
];
