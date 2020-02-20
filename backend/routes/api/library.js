const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const _ = require("lodash");

const watchedMovies = require("../../models/WatchedMovies");
const auth = require('../../middleware/auth');
const middleware = require("../../middleware/midlleware");
const {
  retMax,
  getMovieMoreInfo,
  getYtsMovies,
  getPopMovies,
  setWatched,
  getSubtitles,
  deleteSubtitles
} = require("../../utils/LibraryFunctions");

const YTS_BASE_URL = config.get('ytsApiBaseUrl');
const POP_BASE_URL = config.get('popApiBaseUrl');

// @route   Get api/library/movies/page/:pid
// @desc    Get list of movies
// @access  Private
// return imdb_code, title, year, runtime, rating, genres, summary, language, large_cover_image, torrents
router.get(
  "/movies/page/", 
  [
    auth, 
    middleware.moviesByPage()
  ], async (req, res) => {

  //Check if page id is exists and valid number
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ msg: "Parameter Error" });

  const { id } = req;
  try {
    // get movies from popcorn api
    let popResult = await getPopMovies(req.query);
    if (!popResult || _.isEmpty(popResult)) 
      return res.status(404).json({ msg: "Result not found" });
    
    // get watched movies
    const watched = await watchedMovies.find({ user: id });
    // set watched movies
    popResult = setWatched(watched, popResult);

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
  [
    auth, 
    check("keyword", "Keyword id is required").isString()
  ],
  async (req, res) => {

    // Check if page id is exists and valid number
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "Keyword id is required" });

    const keyword = req.params.keyword;
    const { id } = req;
    try {
      // get watched movies
      const watched = await watchedMovies.find({ user: id });

      // Search PopCorn API
      let url = `${POP_BASE_URL}/movies/1?sort=title&order=1&keywords=${keyword}`;
      let result = await getPopMovies(false, url);

      if (result.length > 0) {
        result = setWatched(watched, result);
        return res.json(result.slice(0, 10));
      }

      // Search YTS API
      url = `${YTS_BASE_URL}?query_term=${keyword}&sort_by=title`;
      result = await getYtsMovies(false, url);

      if (result.length > 0) {
        result = setWatched(watched, result);
        return res.json(result.slice(0, 10))
      }
      return res.status(404).json({ msg: "Result not found" });
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
  [
    auth,
    check("imdb_code", "ID is required").exists()
  ],
  async (req, res) => {

    // Check if page id is exists and valid number
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "ID is required" });

    const imdb_code = req.params.imdb_code;
    try {
      // get movie from yts api
      let url = `${YTS_BASE_URL}?query_term=${imdb_code}`;
      const params = false;
      const ytsResult = await getYtsMovies(params, url);

      // get movie from popcorn api
      url = `${POP_BASE_URL}/movie/${imdb_code}`;
      const setAsArray = true;
      const popResult = await getPopMovies(params, url, setAsArray);

      // merge, sort the two results
      let result = [...popResult, ...ytsResult];
      if (ytsResult.length > 0 && popResult.length > 0)
        result = _.uniqWith(popResult, retMax);
      
      // more info (Directore, Actors..)
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
router.get(
  "/movies/genre/:genre", 
  auth, 
  async (req, res) => {
    
  const genre = req.params.genre;
  try {
    // get movies from popcorn api
    const url = `${POP_BASE_URL}/movies/1?sort=trending&order=-1&genre=${genre}`;
    let popResult = await getPopMovies(false, url);

    if (popResult && popResult.length === 0)
      return res.status(404).json({ msg: "Not valid genre" });

    return res.json(popResult);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
