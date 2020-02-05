const express = require("express");
const router = express.Router();
var torrentStream = require("torrent-stream");
const parseRange = require("range-parser");
const path = require("path");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const FFmpeg = require("fluent-ffmpeg");
const allTracker = require("../../helpers/trackers");
const _ = require("lodash");
const streamModel = require("../../models/Streming");
const CommentsModel = require("../../models/Comments");
const fs = require("fs");
const mongoose = require("mongoose");

FFmpeg.setFfmpegPath(ffmpegInstaller.path);
let engines = [];

const convertFile = file => {
  try {
    const convertedFile = new FFmpeg(file.createReadStream())
      .videoCodec("libvpx")
      .audioCodec("libvorbis")
      .format("webm")
      .audioBitrate(128)
      .videoBitrate(8000)
      .outputOptions([`-threads 5`, "-deadline realtime", "-error-resilient 1"])
      .on("error", err => {});
    return convertedFile;
  } catch (err) {
    console.log(err);
  }
};

const needToConvert = ext => {
  if (ext === "mp4" || ext === "ogv" || ext === "webm") return false;
  else return true;
};

const getTorrentFile = hash =>
  new Promise(function(resolve, reject) {
    let b = _.find(engines, ["hash", hash]);
    if (_.isObject(b)) {
      console.log("existe");

      let engine = b.engine;
      engine.files.forEach(function(file, idx) {
        const ext = path.extname(file.name).slice(1);
        if (
          [
            "mkv",
            "mp4",
            "webm",
            "flv",
            "vob",
            "ogv",
            "ogg",
            "mpg",
            "mvc",
            "mov",
            "rm",
            "rmvb",
            "3gb",
            "divx",
            "m2ts",
            "wmv",
            "vro",
            "mpeg",
            "mode"
          ].includes(ext)
        ) {
          file.ext = ext;
          resolve(file);
        }
      });
    } else {
      const engine = torrentStream(`magnet:?xt=urn:btih:${hash}`, {
        connections: 30,
        tmp: "../client/public/movies",
        trackers: allTracker
      });
      engine.on("ready", function() {
        engine.files.forEach(function(file, idx) {
          const ext = path.extname(file.name).slice(1);
          if (
            ext === "mkv" ||
            ext === "mp4" ||
            ext === "webm" ||
            ext === "flv" ||
            ext === "vob" ||
            ext === "ogv" ||
            ext === "ogg" ||
            ext === "mpg" ||
            ext === "mvc" ||
            ext === "mov" ||
            ext === "rm" ||
            ext === "rmvb" ||
            ext === "3gb" ||
            ext === "divx" ||
            ext === "m2ts" ||
            ext === "wmv" ||
            ext === "vro" ||
            ext === "mpeg" ||
            ext === "mode"
          ) {
            // const stream = new streamModel({
            //   hashCode: hash,
            //   lastWatchedTime: Date.now()
            // });
            // stream.save();
            engines.push({ engine, hash });
            file.ext = ext;
            resolve(file);
          }
        });
      });
    }
  });

// @route   Get api/streaming/video/:hash
// @desc    streaming the chossen movie
// @access  Private
router.get("/video/:hash", async (req, res) => {
  getTorrentFile(req.params.hash)
    .then(function(file) {
      const converte = needToConvert(file.ext);

      if (!converte) {
        res.header("Access-Control-Allow-Origin", "10.12.7.8");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.setHeader("Content-Length", file.length);
        res.setHeader("Content-Type", `video/${file.ext}`);
        const ranges = parseRange(file.length, req.headers.range, {
          combine: true
        });
        if (ranges === -1) {
          // 416 Requested Range Not Satisfiable client makes a range request that is out of bounds
          // A 416 status code indicates that the server was unable to fulfill the request. This may
          // be, for example, because the client asked for the 800th-900th bytes of
          // a document, but the document was only 200 bytes long
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
          console.log(range);
          res.statusCode = 206;
          res.setHeader("Content-Length", 1 + (range.end - range.start));
          res.setHeader(
            "Content-Range",
            `bytes ${range.start}-${range.end}/${file.length}`
          );
          if (req.method !== "GET") return res.end();
          return file.createReadStream(range).pipe(res);
        }
      } else {
        const range = req.headers.range || "";
        const parts = range.replace(/bytes=/, "").split("-");
        const partialstart = parts[0];
        const partialend = parts[1];
        const start = parseInt(partialstart, 10);
        const end = partialend ? parseInt(partialend, 10) : file.length - 1;
        res.writeHead(206, {
          "Content-Length": 1 + (range.end - range.start),
          "Content-Range": "bytes " + start + "-" + end + "/*",
          "Content-Type": "video/webm"
        });
        convertFile(file).pipe(res);
      }
    })
    .catch(function(e) {
      console.log(e);
      res.status(500).end({ error: "something blew up (video)" });
    });
});

// @route   Get api/streaming/watchedUpdate
// @desc    add or update movie last watch time
// @access  Private
router.post("/watchedUpdate/", async (req, res) => {
  try {
    let { hash_code, imdb_code } = req.body;
    // first we gonna check our database if there already
    // the movie  so we gonna update his time
    let result = await streamModel.findOne({
      hashCode: hash_code
    });
    if (result) {
      await streamModel.findOneAndUpdate(
        { hashCode: hash_code },
        { lastWatchedTime: new Date() }
      );
    } else {
      let stream = new streamModel({
        hashCode: hash_code,
        imdbCode: imdb_code,
        lastWatchedTime: new Date()
      });
      await stream.save();
    }
    let d = new Date();
    d.setMonth(d.getMonth() - 1);
    const myData = await streamModel.find({ lastWatchedTime: { $lte: d } });
    myData.forEach(async function(arrayItem) {
      await streamModel.findOneAndDelete({ hashCode: arrayItem.hashCode });
      let moviePath = `../client/public/movies/torrent-stream/${arrayItem.hashCode}`;
      let subtitlePath = `../client/public/movies/subtitles/${arrayItem.imdbCode}`;
      let torrentFilePath = `../client/public/movies/torrent-stream/${arrayItem.hashCode}.torrent`;
      if (fs.existsSync(torrentFilePath)) {
        console.log("existe file");
        fs.unlinkSync(torrentFilePath);
      }
      if (fs.existsSync(moviePath)) {
        fs.rmdirSync(moviePath, { recursive: true });
      }
      if (fs.existsSync(subtitlePath)) {
        fs.rmdirSync(subtitlePath, { recursive: true });
      }
    });
    return res.send("Every-Thing goes Well");
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "something blew up(watchedUpdate)" });
  }
});

// @route   Get api/streaming/AddComment
// @desc    add new comments from the chossen movie
// @access  Private
router.post("/AddComment", async (req, res) => {
  try {
    const { imdb_code, comment_text } = req.body;
    let comment = new CommentsModel({
      imdbCode: imdb_code,
      commentText: comment_text.trim(),
      userInfo: mongoose.Types.ObjectId("5e1649b404f1501433ae16a5")
    });
    await comment.save();

    return res.send(comment);
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "something blew up(AddComment)" });
  }
});

// @route   Get api/streaming/likePost
// @desc    add like or remove it for the chossen comments
// @access  Private
router.post("/likePost", async (req, res) => {
  try {
    const { imdb_code, Comment_id } = req.body;
    let result = await CommentsModel.find({
      imdbCode: imdb_code,
      likes: {
        $elemMatch: { $eq: mongoose.Types.ObjectId("5e13bada4dd6fc4455082e4a") }
      }
    });
    if (result.length === 0) {
      await CommentsModel.updateOne(
        { imdbCode: imdb_code },
        {
          $inc: { likeCount: 1 },
          $push: { likes: mongoose.Types.ObjectId("5e13bada4dd6fc4455082e4a") }
        }
      );
    } else {
      await CommentsModel.updateOne(
        { imdbCode: imdb_code },
        {
          $inc: { likeCount: -1 },
          $pull: { likes: mongoose.Types.ObjectId("5e13bada4dd6fc4455082e4a") }
        }
      );
    }
    return res.send("Every-Thing goes Well");
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "something blew up(likePost)" });
  }
});

// @route   Get api/streaming/getComments
// @desc    get all the comments for the chossen movie
// @access  Private
router.get("/getComments/:imdb_code", async (req, res) => {
  try {
    const { imdb_code } = req.params;
    const result = await CommentsModel.find({ imdbCode: "tt0316654" }).populate(
      "userInfo",
      "userName"
    );
    return res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "something blew up(getComments)" });
  }
});
module.exports = router;
