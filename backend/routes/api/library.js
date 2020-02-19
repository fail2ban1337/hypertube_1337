const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const cloudscraper = require("cloudscraper");
const config = require("config");
const rp = require("request-promise");
const _ = require("lodash");
const watchedMovies = require("../../models/WatchedMovies");

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
const IMDB_API = config.get('imdbApi');
const RAPID_API_KEY = config.get("rapidApiKey");

// @route   Get api/library/movies/page/:pid
// @desc    Get list of movies
// @access  Private
// return imdb_code, title, year, runtime, rating, genres, summary, language, large_cover_image, torrents
router.get("/movies/page/", [middleware.moviesByPage()], async (req, res) => {
  //Check if page id is exists and valid number
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ msg: "Parameter Error" });

  try {
    // get watched movies
    // const id = req.id;
    // const watched = await watchedMovies.find({ id });
    // const merged = _.map(movies, function(obj) {
    //   return _.assign(
    //     obj,
    //     _.find(watched, {
    //       imdb_code: obj.imdb_code
    //     })
    //   );
    // });
    // get movies from yts api
    //let ytsResult = await getMovies(req.query, "yts");
    //ytsResult = await getMovieMoreInfo(ytsResult);

    // if movies not returned due to page number not exist in API
    //if (!ytsResult) return res.status(404).json({ msg: "Result not found" });

    // get movies from popcorn api
    let popResult = await getMovies(req.query, "pop");
    if (!popResult || _.isEmpty(popResult)) res.status(404).json({ msg: "Result not found" });
    return res.json(popResult);
    //if (!popResult || _.isEmpty(popResult)) return res.json(ytsResult);

    // Merge the two arrays, Delete duplicate movies by imdb code, order by
    // const result = _.concat(ytsResult, popResult);
    // let filtred = _.uniqBy(result, "imdb_code");
    // filtred = _.orderBy(filtred, req.query.sort_by, ["desc"]);
    // return res.json(filtred);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route   Get api/library/movies/keyword/:keyword
// @desc    Search for a movie by keyword
// @access  Private
// return imdb_code, title, year, runtime, rating, genres, summary, language, large_cover_image, torrents
router.get(
  "/movies/keyword/:keyword",
  [check("keyword", "Keyword id is required").isString()],
  async (req, res) => {
    // Check if page id is exists and valid number
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "Keyword id is required" });
    const keyword = req.params.keyword;
    let torrentFail = false;
    let movies = [];

    try {
      const options = {
        method: "GET",
        url: IMDB_API,
        qs: { page: "1", r: "json", s: keyword },
        headers: {
          "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
          "x-rapidapi-key": RAPID_API_KEY
        }
      };
      let body = await rp(options);
      body = JSON.parse(body);
      body.Search = _.uniqBy(body.Search, "imdbID");
      if (body.Response !== "True")
        return res.status(404).json({ msg: "Result not found" });

      for (let index = 0; index < body.Search.length; index++) {
        const ytsResult = await cloudscraper.get(
          `${YTS_BASE_URL}?query_term=${body.Search[index].imdbID}`
        );

        const parsedMoviesYts = JSON.parse(ytsResult);
        // if movies not returned due to page number not exist in API
        if (!parsedMoviesYts.data.movies) {
          torrentFail = true;
          break;
        }

        const ytsData = formatYtsResponse(parsedMoviesYts.data.movies);
        movies = _.concat(ytsData, movies);
        //movies = await getMovieMoreInfo(movies);
      }
      movies = _.orderBy(movies, ["title"], ["asc"]);
      for (let index = 0; index < body.Search.length; index++) {
        const popResult = await rp.get(
          `${POP_BASE_URL}/movie/${body.Search[index].imdbID}`
        );

        if (!popResult) continue;
        const parsedMoviesPop = [];
        parsedMoviesPop.push(JSON.parse(popResult));
        // if movies not returned due to page number not exist in API
        if (_.isEmpty(parsedMoviesPop) && torrentFail)
          return res.status(404).json({ msg: "Torrent not found" });
        else if (_.isEmpty(parsedMoviesPop) && !torrentFail)
          return res.json(movies);

        const popData = formatPopResponse(parsedMoviesPop);
        movies = _.concat(popData, movies);
      }
      movies = _.orderBy(movies, ["title"], ["asc"]);
      // return unique movies by seeds number
      movies = _.uniqWith(movies, retMax);
      return res.json(movies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   Get api/library/movies/imdb_code/:imdb_code
// @desc    Search for a movie by imdb_code
// @access  Private
// return imdb_code, title, year, runtime, rating, genres, summary, language, large_cover_image, torrents
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
      // const ytsResult = await cloudscraper.get(
      //   `https://yts.lt/api/v2/list_movies.json?query_term=${imdb_code}`
      // );

      // const parsedMoviesYts = JSON.parse(ytsResult);
      // const ytsData = formatYtsResponse(parsedMoviesYts.data.movies);

      // get movie from popcorn api
      const popResult = await rp.get(
        `${POP_BASE_URL}/movie/${imdb_code}`
      );

      const parsedMoviesPop = [];
      if (popResult) parsedMoviesPop.push(JSON.parse(popResult));

      // format response
      const popData = formatPopResponse(parsedMoviesPop);

      const result = await getMovieMoreInfo(popData);
      if (!result || result.length === 0)
        return res.status(404).json({ msg: "Movie not found" });
      // Get subtitles
      result[0]["subtitle"] = await getSubtitles(imdb_code);
      return res.json(result);

      // let result = [...popData, ...ytsData];
      // if (ytsData.length > 0 && popData.length > 0)
      //   result = _.uniqWith(popData, retMax);
      // result = await getMovieMoreInfo(result);
      // if (!result || result.length === 0)
      //   return res.status(404).json({ msg: "Movie not found" });
      // // Get subtitles
      // result[0]["subtitle"] = await getSubtitles(imdb_code);
      // return res.json(result);
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
// return imdb_code, title, year, runtime, rating, genres, summary, language, large_cover_image, torrents
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
