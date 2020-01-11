// take torrent hash as a parameter, return magnet link
const getMagnetLink = hash => {
  return `magnet:?xt=urn:btih:${hash}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`;
};

// Format api response
const formatResponse = response => {
  const result = [];
  if (response[0].imdb_code) {
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

module.exports = {
  formatResponse
};
