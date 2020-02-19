const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const cloudscraper = require("cloudscraper");
const config = require("config");
const rp = require("request-promise");
const _ = require("lodash");

const watchedMovies = require("../../models/WatchedMovies");
const auth = require('../../middleware/auth');
const middleware = require("../../middleware/midlleware");
const {
  retMax,
  getMovieMoreInfo,
  getMovies,
  formatYtsResponse,
  formatPopResponse,
  getSubtitles,
  deleteSubtitles
} = require("../../utils/LibraryFunctions");

const YTS_BASE_URL = config.get('ytsApiBaseUrl');
const POP_BASE_URL = config.get('popApiBaseUrl');

// @route   Get api/library/movies/page/:pid
// @desc    Get list of movies
// @access  Private
// return imdb_code, title, year, runtime, rating, genres, summary, language, large_cover_image, torrents
router.get("/movies/page/", [middleware.moviesByPage()], async (req, res) => {
  console.log(req.id)
  //Check if page id is exists and valid number
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ msg: "Parameter Error" });

  try {
    // get watched movies
    const id = req.id;
    // const watched = await watchedMovies.find({ id });
    // const merged = _.map(movies, function(obj) {
    //   return _.assign(
    //     obj,
    //     _.find(watched, {
    //       imdb_code: obj.imdb_code
    //     })
    //   );
    // });

    // get movies from popcorn api
    let popResult = await getMovies(req.query, "pop");
    if (!popResult || _.isEmpty(popResult)) res.status(404).json({ msg: "Result not found" });
    return res.json(popResult);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route   Get api/library/movies/keyword/:keyword
// @desc    Search for a movie by keyword
// @access  Private
router.get(
  "/movies/keyword/:keyword",
  [check("keyword", "Keyword id is required").isString()],
  async (req, res) => {
    // Check if page id is exists and valid number
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "Keyword id is required" });
    const keyword = req.params.keyword;

    try {
      // Search PopCorn API
      let url = `${POP_BASE_URL}/movies/1?sort=title&order=1&keywords=${keyword}`;
      let result = await rp.get(url);
      let formatedResult = result ? formatPopResponse(JSON.parse(result)) : false;

      if (formatedResult.length > 0) {
        return res.json(formatedResult.slice(0, 10));
      }

      // Search YTS API
      url = `${YTS_BASE_URL}?query_term=${keyword}&sort_by=title`;
      result = await cloudscraper.get(url);
      const parsedResult = JSON.parse(result);
      const { movies } = parsedResult.data
      formatedResult = movies
        ? formatYtsResponse(movies)
        : false;

      return formatedResult.length > 0 ?
        res.json(formatedResult.slice(0, 10)) :
        res.status(404).json({ msg: "Result not found" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   Get api/library/movies/imdb_code/:imdb_code
// @desc    Search for a movie by imdb_code
// @access  Private
router.get(
  "/movies/imdb_code/:imdb_code",
  check("imdb_code", "ID is required").exists(),
  async (req, res) => {
    // Check if page id is exists and valid number
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "ID is required" });
    const imdb_code = req.params.imdb_code;
    try {
      // get movie from yts api
      const ytsResult = await cloudscraper.get(
        `${YTS_BASE_URL}?query_term=${imdb_code}`
      );

      const parsedMoviesYts = JSON.parse(ytsResult);
      const ytsData = formatYtsResponse(parsedMoviesYts.data.movies);

      // get movie from popcorn api
      const popResult = await rp.get(
        `${POP_BASE_URL}/movie/${imdb_code}`
      );

      const parsedMoviesPop = [];
      if (popResult) parsedMoviesPop.push(JSON.parse(popResult));

      // format response
      const popData = formatPopResponse(parsedMoviesPop);

      let result = [...popData, ...ytsData];
      if (ytsData.length > 0 && popData.length > 0)
        result = _.uniqWith(popData, retMax);
      result = await getMovieMoreInfo(result);
      if (!result || result.length === 0)
        return res.status(404).json({ msg: "Movie not found" });
      // Get subtitles
      result[0]["subtitle"] = await getSubtitles(imdb_code);
      return res.json(result);
    } catch (error) {
      console.log(error);
      deleteSubtitles(imdb_code);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   Get api/library/movies/genre/:genre
// @desc    Search for a movie by imdb_code
// @access  Private
router.get("/movies/genre/:genre", async (req, res) => {
  const genre = req.params.genre;
  try {
    // get movies from popcorn api
    let popResult = await rp.get(
      `${POP_BASE_URL}/movies/1?sort=trending&order=-1&genre=${genre}`
    );

    if (popResult.length === 0)
      return res.status(404).json({ msg: "Not valid genre" });
    popResult = popResult ? formatPopResponse(JSON.parse(popResult)) : false;

    return res.json(popResult);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
