const express = require("express");
const router = express.Router();
var torrentStream = require("torrent-stream");
const parseRange = require("range-parser");
const path = require("path");
var ffmpeg = require("fluent-ffmpeg");
const engine = torrentStream(
  "magnet:?xt=urn:btih:058BFB0A98D8DB5E6138AB5BB0300752AA94B4E7&dn=Funan+%282018%29+%5BBluRay%5D+%5B720p%5D+%5BYTS%5D+%5BYIFY%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce",
  { tmp: "../client/movies" }
);
const fs = require("fs");
const getTorrentFile = new Promise(function(resolve, reject) {
  engine.on("ready", function() {
    engine.files.forEach(function(file, idx) {
      const ext = path.extname(file.name).slice(1);
      if (ext === "mkv" || ext === "mp4") {
        file.ext = ext;
        resolve(file);
      }
    });
  });
});

router.get("/video", async (req, res) => {
  res.setHeader("Accept-Ranges", "bytes");
  getTorrentFile
    .then(function(file) {
      console.log(file.name.split(/[. ]+/).pop());
      res.setHeader("Content-Length", file.length);
      res.setHeader("Content-Type", `video/${file.ext}`);
      const ranges = parseRange(file.length, req.headers.range, {
        combine: true
      });
      if (ranges === -1) {
        // 416 Requested Range Not Satisfiable client makes a range request that is out of bounds
        res.statusCode = 416;
        return res.end();
      } else if (
        ranges === -2 ||
        ranges.type !== "bytes" ||
        ranges.length > 1
      ) {
        // 200 OK requested range malformed or multiple ranges requested, stream entire video
        if (req.method !== "GET") return res.end();
        return file.createReadStream().pipe(res);
      } else {
        // 206 Partial Content valid range requested
        const range = ranges[0];
        res.statusCode = 206;
        res.setHeader("Content-Length", 1 + range.end - range.start);
        res.setHeader(
          "Content-Range",
          `bytes ${range.start}-${range.end}/${file.length}`
        );
        if (req.method !== "GET") return res.end();
        return file.createReadStream(range).pipe(res);
      }
    })
    .catch(function(e) {
      console.log(e);
      res.end(e);
    });
});

module.exports = router;
