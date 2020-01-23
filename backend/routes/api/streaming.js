const express = require("express");
const router = express.Router();
var torrentStream = require("torrent-stream");
const parseRange = require("range-parser");
const path = require("path");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const FFmpeg = require("fluent-ffmpeg");
const allTracker = require("../../helpers/trackers");
FFmpeg.setFfmpegPath(ffmpegInstaller.path);



module.exports = router;
