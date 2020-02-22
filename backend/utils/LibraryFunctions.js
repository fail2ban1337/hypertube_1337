const _ = require("lodash");
const rp = require("request-promise");
const cloudscraper = require("cloudscraper");
const config = require("config");
const yifysubtitles = require("yifysubtitles");
const fs = require("fs");

const YTS_BASE_URL = config.get("ytsApiBaseUrl");
const POP_BASE_URL = config.get("popApiBaseUrl");
const IMDB_API = config.get("imdbApi");

/*
 * Take torrent hash, return magnet link
 */
const getHashFromMagnet = magnet => {
  return magnet.split(":")[3].split("&")[0];
};

/*
 * Check PopCorn movie helper function
 */
const isValidPopMovie = item => {
  return (
    item.imdb_id &&
    !_.isEmpty(item.imdb_id) &&
    item.title &&
    !_.isEmpty(item.title) &&
    item.year &&
    !_.isEmpty(item.year) &&
    item.rating.percentage &&
    _.isNumber(item.rating.percentage) &&
    item.synopsis &&
    !_.isEmpty(item.synopsis) &&
    !_.isEmpty(Object.keys(item.torrents)[0]) &&
    item.torrents.en["1080p"] &&
    item.torrents.en["1080p"].url &&
    !_.isEmpty(item.torrents.en["1080p"].url) &&
    item.torrents.en["1080p"].seed &&
    _.isNumber(item.torrents.en["1080p"].seed) &&
    item.torrents.en["1080p"].peer &&
    _.isNumber(item.torrents.en["1080p"].peer) &&
    item.torrents.en["1080p"].filesize &&
    !_.isEmpty(item.torrents.en["1080p"].filesize)
  );
};

/*
 * Check if PopCorn movie have all important properties
 */
const filterPopResponse = response => {
  const filtredResponse = _.filter(response, item => {
    return isValidPopMovie(item);
  });
  return filtredResponse;
};

/*
 * Format PopCorn API response, change properties names
 */
const formatPopResponse = response => {
  const result = [];
  if (!response || response.length === 0) return result;

  response = filterPopResponse(response);
  response.map(item => {
    let obj = {};
    obj.api_source = "PopCorn";
    obj.imdb_code = item.imdb_id;
    obj.title = item.title;
    obj.year = +item.year;
    obj.runtime = item.runtime;
    obj.trailer = item.trailer;
    obj.rating = +item.rating.percentage / 10;
    obj.genres = item.genres;
    obj.summary = item.synopsis;
    obj.language =
      Object.keys(item.torrents)[0] === "en"
        ? "English"
        : Object.keys(item.torrents)[0];
    obj.poster = item.images.poster || "";
    obj.cover = item.images.fanart || "";
    const highQuality = item.torrents.en["1080p"]
      ? item.torrents.en["1080p"]
      : false;
    const lowQuality = item.torrents.en["720p"]
      ? item.torrents.en["720p"]
      : false;
    obj.torrents = [
      {
        url: highQuality.url,
        hash: getHashFromMagnet(highQuality.url),
        quality: "1080p",
        type: "web",
        seeds: highQuality.seed,
        peers: highQuality.peer,
        size: highQuality.filesize
      },
      {
        url: highQuality.url,
        hash: getHashFromMagnet(highQuality.url),
        quality: "720p",
        seeds: lowQuality.seed,
        peers: lowQuality.peer,
        size: lowQuality.filesize
      }
    ];
    // push object contain movie info to the response data
    if (highQuality && lowQuality) result.push(obj);
  });
  return result;
};

/*
 * Check Yts movie helper function
 */
const isValidYtsMovie = item => {
  return (
    item.imdb_code &&
    !_.isEmpty(item.imdb_code) &&
    item.title &&
    !_.isEmpty(item.title) &&
    item.year &&
    _.isNumber(item.year) &&
    item.rating &&
    _.isNumber(item.rating) &&
    item.summary &&
    !_.isEmpty(item.summary) &&
    item.language &&
    !_.isEmpty(item.language) &&
    item.torrents.length &&
    item.torrents[0].hash &&
    !_.isEmpty(item.torrents[0].hash) &&
    item.torrents[0].quality &&
    !_.isEmpty(item.torrents[0].quality) &&
    item.torrents[0].type &&
    !_.isEmpty(item.torrents[0].type) &&
    item.torrents[0].seeds &&
    _.isNumber(item.torrents[0].seeds) &&
    item.torrents[0].peers &&
    _.isNumber(item.torrents[0].peers) &&
    item.torrents[0].size &&
    !_.isEmpty(item.torrents[0].size)
  );
};

/*
 * Check if Yts movie have all important properties
 */
const filterYtsResponse = response => {
  const filtredResponse = _.filter(response, item => {
    return isValidYtsMovie(item);
  });
  return filtredResponse;
};

/*
 * Format Yts API response, change properties names
 */
const formatYtsResponse = response => {
  const result = [];
  if (!response || response.length === 0) return result;

  response = filterYtsResponse(response);
  response.map(item => {
    let obj = {};
    obj.api_source = "YTS";
    obj.imdb_code = item.imdb_code;
    obj.title = item.title;
    obj.year = +item.year;
    obj.trailer = `http://youtube.com/watch?v=${item.yt_trailer_code}`;
    obj.runtime = item.runtime;
    obj.rating = +item.rating;
    obj.genres = item.genres;
    obj.summary = item.summary;
    obj.language = item.language;
    obj.poster =
      item.large_cover_image.replace(
        "https://yts.lt/",
        "https://img.yts.lt/"
      ) || "";
    obj.cover =
      item.background_image.replace("https://yts.lt/", "https://img.yts.lt/") ||
      "";
    obj.torrents = item.torrents;
    // push object contain movie info to the response data
    result.push(obj);
  });
  return result;
};

/*
 * Return movies with max seeds number
 */
const retMax = (movies, comparedMovie) => {
  if (movies.imdb_code !== comparedMovie.imdb_code) return null;
  return movies.torrents[0].seeds > comparedMovie.torrents[0].seeds ? a : b;
};

/*
 * Get Director, Actors, Production from OMDB API
 */
const getMovieMoreInfo = async result => {
  for (let index = 0; index < result.length; index++) {
    // const url = `${IMDB_API}&i=${result[index].imdb_code}&plot=full`;

    // // Get more info from imdb api, append it to result
    // const body = await rp.get(url);
    // const { Director, Actors, Production } = JSON.parse(body);

    // result[index].Director = Director;
    // result[index].Actors = Actors;
    // result[index].Production = Production;
    result[index].Director = "Director";
    result[index].Actors = "Actors";
    result[index].Production = "Production";
  }
  return result;
};

/*
 * Take Yts API url or parameters of url
 * Send request to API url
 * Return Movies formated
 */
const getYtsMovies = async (params, apiUrl = false) => {
  const { pid, sort_by, filterGenre, filterRatingMin } = params;
  let genre;

  // Set searched genre
  switch (filterGenre) {
    case "All":
      genre = "";
      break;

    case "Science fiction":
      genre = "sci-fi";
      break;

    default:
      genre = filterGenre;
      break;
  }

  // prepare request url
  const url = apiUrl
    ? apiUrl
    : `${YTS_BASE_URL}?page=${pid}&sort_by=${sort_by}&minimum_rating=${filterRatingMin}&genre=${genre}`;

  const result = await cloudscraper.get(url);
  const parsedResult = JSON.parse(result);

  // format result before return
  return parsedResult.data.movies
    ? formatYtsResponse(parsedResult.data.movies)
    : false;
};

/*
 * Take PopCorn API url or parameters of url
 * Send request to API url
 * Return Movies formated
 */
const getPopMovies = async (params, apiUrl = false, setAsArray = false) => {
  const { pid, sort_by, filterGenre, filterRatingMin } = params;
  let genre;

  // set searched genre
  switch (filterGenre) {
    case "All":
      genre = "";
      break;

    default:
      genre = filterGenre;
      break;
  }

  // prepare requested url
  const url = apiUrl
    ? apiUrl
    : `${POP_BASE_URL}/movies/${pid}?sort=${sort_by}&order=-1&genre=${genre}`;
  let result = await rp.get(url);

  result = JSON.parse(result);
  // to result to array of object
  if (setAsArray) result = [result];
  result = result ? formatPopResponse(result) : false;

  // delete movies with rating less then minimum set
  if (result && filterRatingMin) {
    result = _.filter(result, rs => rs.rating > filterRatingMin);
  }
  return result;
};

/*
 * Loop through array of movies, set watched (watched = true || false)
 */
const setWatched = (watched, result) => {
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < watched.length; j++) {
      if (result[i].imdb_code === watched[j].imdb_code) {
        // user already watched this movie
        result[i].watched = true;
        break;
      }
      result[i].watched = false;
    }
  }

  return result;
};

/*
 * Get movie available subtitles (En && Fr)
 */
const getSubtitles = async imdb_code => {
  try {
    // set subtitle path
    const subtitlePath = `../client/public/movies/subtitles/${imdb_code}`;
    if (!fs.existsSync(subtitlePath)) {
      fs.mkdirSync(subtitlePath);
    }
    // get subtitles from yifi
    const subtitles = await yifysubtitles(imdb_code, {
      path: subtitlePath,
      langs: ["en", "fr"]
    });

    return subtitles;
    // return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

/*
 * Delete subtitles
 */
const deleteSubtitles = imdb_code => {
  const subtitlePath = `../client/public/movies/subtitles/${imdb_code}`;
  try {
    if (fs.existsSync(subtitlePath)) {
      fs.rmdirSync(subtitlePath, { recursive: true });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  retMax,
  getMovieMoreInfo,
  getYtsMovies,
  getPopMovies,
  setWatched,
  formatPopResponse,
  formatYtsResponse,
  getSubtitles,
  deleteSubtitles
};
