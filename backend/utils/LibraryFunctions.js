const _ = require("lodash");
const rp = require("request-promise");
const cloudscraper = require("cloudscraper");
const config = require("config");

// take torrent hash as a parameter, return magnet link
const getHashFromMagnet = magnet => {
  //"magnet:?xt=urn:btih:C0E9F0CE8A9123ACED7358B1AC3A853A10B9EB13&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  return magnet.split(":")[3].split("&")[0];
};

// filter response if it has a empty element
const filterPopResponse = response => {
  const filtredResponse = _.filter(response, item => {
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
      item.images.poster &&
      !_.isEmpty(item.images.poster) &&
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
  });
  return filtredResponse;
};

// Format PopCorn API response
const formatPopResponse = response => {
  const result = [];
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
    obj.Poster = item.images.poster;
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

// filter response if it has a empty element
const filterYtsResponse = response => {
  const filtredResponse = _.filter(response, item => {
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
      item.large_cover_image &&
      !_.isEmpty(item.large_cover_image) &&
      item.torrents[0] &&
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
  });
  return filtredResponse;
};

// Format YTS API response
const formatYtsResponse = response => {
  const result = [];

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
    obj.large_cover_image = item.large_cover_image;
    obj.torrents = item.torrents;
    // push object contain movie info to the response data
    result.push(obj);
  });
  return result;
};

// Compare by seeds number
const retMax = (a, b) => {
  if (a.imdb_code !== b.imdb_code) return null;
  return a.torrents[0].seeds > b.torrents[0].seeds ? a : b;
};

// Get cover image for each movie using IMDb API
const getMovieMoreInfo = async (result, fullData = false) => {
  const rapidApiKey = config.get("rapidApiKey");
  for (let index = 0; index < result.length; index++) {
    const options = {
      method: "GET",
      url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
      qs: { i: result[index].imdb_code, r: "json" },
      headers: {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": rapidApiKey
      }
    };
    // Get more info from imdb api, append it to result
    const body = await rp(options);
    const { Director, Actors, Production, Poster } = JSON.parse(body);

    result[index].Poster = Poster === "N/A" ? "/img/notfound.png" : Poster;

    if (fullData) {
      result[index].Director = Director;
      result[index].Actors = Actors;
      result[index].Production = Production;
      result[index].Poster = Poster;
    }
  }
  return result;
};

// Get Movies from YTS and POPCorn APIs
const getMovies = async (
  { pid, sort_by, filterGenre, filterRatingMin },
  api
) => {
  if (api === "yts") {
    const genre =
      filterGenre === "All"
        ? ""
        : filterGenre === "Science fiction"
        ? "&genre=sci-fi"
        : `&genre=${filterGenre}`;

    const url = `https://yts.lt/api/v2/list_movies.json?page=${pid}&sort_by=${sort_by}&minimum_rating=${filterRatingMin}${genre}`;
    const result = await cloudscraper.get(url);
    const parsedResult = JSON.parse(result);
    return parsedResult.data.movies
      ? formatYtsResponse(parsedResult.data.movies)
      : false;
  } else if (api === "pop") {
    const genre = filterGenre === "All" ? "" : `&genre=${filterGenre}`;

    const url = `https://tv-v2.api-fetch.website/movies/${pid}?sort=${sort_by}&order=-1${genre}`;
    let result = await rp.get(url);
    result = result ? formatPopResponse(JSON.parse(result)) : false;
    if (result) {
      result = _.filter(result, rs => rs.rating > filterRatingMin);
    }
    return result;
  }
  return false;
};

module.exports = {
  retMax,
  getMovieMoreInfo,
  getMovies,
  formatPopResponse,
  formatYtsResponse
};
