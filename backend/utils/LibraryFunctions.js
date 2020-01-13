const _ = require("lodash");

// take torrent hash as a parameter, return magnet link
const getMagnetLink = hash => {
  return `magnet:?xt=urn:btih:${hash}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`;
};

// filter response if it has a empty element
const filterYtsResponse = response => {
  const filtredResponse = _.filter(response, item => {
    return (
      !_.isEmpty(item.imdb_code) &&
      !_.isEmpty(item.title) &&
      _.isNumber(item.year) &&
      _.isNumber(item.runtime) &&
      _.isNumber(item.rating) &&
      !_.isEmpty(item.summary) &&
      !_.isEmpty(item.language) &&
      !_.isEmpty(item.large_cover_image) &&
      !_.isEmpty(item.torrents[0].hash) &&
      !_.isEmpty(item.torrents[0].quality) &&
      !_.isEmpty(item.torrents[0].type) &&
      _.isNumber(item.torrents[0].seeds) &&
      _.isNumber(item.torrents[0].peers) &&
      !_.isEmpty(item.torrents[0].size)
    );
  });
  return filtredResponse;
};

// filter response if it has a empty element
const filterPopResponse = response => {
  const filtredResponse = _.filter(response, item => {
    return (
      !_.isEmpty(item.imdb_id) &&
      !_.isEmpty(item.title) &&
      !_.isEmpty(item.year) &&
      !_.isEmpty(item.runtime) &&
      _.isNumber(item.rating.percentage) &&
      !_.isEmpty(item.synopsis) &&
      !_.isEmpty(Object.keys(item.torrents)[0]) &&
      !_.isEmpty(item.images.poster) &&
      !_.isEmpty(item.torrents.en["1080p"].url) &&
      _.isNumber(item.torrents.en["1080p"].seed) &&
      _.isNumber(item.torrents.en["1080p"].peer) &&
      !_.isEmpty(item.torrents.en["1080p"].filesize)
    );
  });
  return filtredResponse;
};

// Format api response
const formatResponse = response => {
  const result = [];
  if (response[0].imdb_code) {
    response = filterYtsResponse(response);
    response.map(item => {
      let obj = {};
      obj.api_source = "YTS";
      obj.imdb_code = item.imdb_code;
      obj.title = item.title;
      obj.year = item.year;
      obj.runtime = item.runtime;
      obj.rating = item.rating;
      obj.genres = item.genres;
      obj.summary = item.summary;
      obj.language = item.language;
      obj.large_cover_image = item.large_cover_image;
      // change torrent link with magnet link
      item.torrents.map(tr => (tr.url = getMagnetLink(tr.hash)));
      obj.torrents = item.torrents;
      // push object contain movie info to the response data
      result.push(obj);
    });
    return result;
  }
  response = filterPopResponse(response);
  response.map(item => {
    let obj = {};
    obj.api_source = "PopCorn";
    obj.imdb_code = item.imdb_id;
    obj.title = item.title;
    obj.year = item.year;
    obj.runtime = item.runtime;
    obj.rating = item.rating.percentage / 10;
    obj.genres = item.genres;
    obj.summary = item.synopsis;
    obj.language =
      Object.keys(item.torrents)[0] === "en"
        ? "English"
        : Object.keys(item.torrents)[0];
    obj.large_cover_image = item.images.poster;
    const highQuality = item.torrents.en["1080p"]
      ? item.torrents.en["1080p"]
      : false;
    const lowQuality = item.torrents.en["720p"]
      ? item.torrents.en["720p"]
      : false;
    obj.torrents = [
      {
        url: highQuality.url,
        quality: "1080p",
        type: "web",
        seeds: highQuality.seed,
        peers: highQuality.peer,
        size: highQuality.filesize
      },
      {
        url: lowQuality.url,
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

// Compare by seeds number
const retMax = (a, b) => {
  if (a.imdb_code !== b.imdb_code) return null;
  return a.torrents[0].seeds > b.torrents[0].seeds ? a : b;
};

module.exports = {
  formatResponse,
  retMax
};
