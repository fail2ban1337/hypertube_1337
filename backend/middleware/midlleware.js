const jwt = require("jsonwebtoken");
const config = require("config");
const { check } = require("express-validator");

module.exports = middleware = {
  auth: function(req, res, next) {
    // Get Token from header
    const token = req.header("x-auth-token");

    // check if no token
    if (!token) {
      return res.status(401).json({
        msg: "No token , authorization denied"
      });
    }
    // verify
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({
        msg: "Token is not Valide"
      });
    }
  },
  moviesByPage: (req, res, next) => {
    return [
      check("pid", "Page id is required")
        .optional({ checkFalsy: true })
        .isInt({ min: 1, max: 727 }),
      check("sort_by", "Sort by Name parameter not valid").isIn([
        "year",
        "rating",
        "title"
      ]),
      check("filterGenre", "Filter by Genre parameter not valid").isIn([
        "Action",
        "Adventure",
        "Comedy",
        "Crime",
        "Drama",
        "Fantasy",
        "Historical",
        "Romance",
        "Science fiction",
        "Western",
        "All"
      ]),
      check("filterRatingMin", "Filter by Rating not valid")
        .optional({ checkFalsy: true })
        .isInt({ min: 0, max: 9 })
    ];
  },
  moviesByGenre: (req, res, next) => {
    return [
      check("genre", "Filter by Genre parameter not valid").isIn([
        "Action",
        "Adventure",
        "Comedy",
        "Crime",
        "Drama",
        "Fantasy",
        "Historical",
        "Romance",
        "Science fiction",
        "Western",
        "All"
      ])
    ];
  }
};
