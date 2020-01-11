const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const cloudscraper = require("cloudscraper");
const _ = require("lodash");
const { formatResponse } = require("../../utils/LibraryFunctions");

// @route   Get api/library
// @desc    Get list of movies
// @access  Private
// return imdb_code, title, year, runtime, rating, genres, summary, language, large_cover_image, torrents
router.get(
  "/:pid",
  check("pid", "Page id is required").isNumeric(),
  async (req, res) => {
    // Check if page id is exists and valid number
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "Page id is required" });
    const pid = req.params.pid; // page id
    try {
      // get movies from yts api
      const ytsResult = await cloudscraper.get(
        `https://yts.lt/api/v2/list_movies.json?sort_by=rating&page=${pid}&limit=37`
      );
      const parsedMoviesYts = JSON.parse(ytsResult);
      // format response
      const ytsData = formatResponse(parsedMoviesYts.data.movies);

      // get movies from popcorn api
      const popResult = await cloudscraper.get(
        `https://tv-v2.api-fetch.website/movies/${pid}?sort=rating&order=-1`
      );
      const parsedMoviesPop = JSON.parse(popResult);

      // format response - use same key in the response of the last api
      const popData = formatResponse(parsedMoviesPop);

      // Merge the two arrays
      const result = _.concat(ytsData, popData); // 70 elem
      // Delete duplicate movies by imdb code
      let filtred = _.uniqBy(result, "imdb_code");
      // order by rating
      filtred = _.orderBy(filtred, ["rating"], ["desc"]);
      return res.json(filtred);
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
