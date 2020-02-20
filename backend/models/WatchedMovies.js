const mongoose = require("mongoose");

const WatchedMoviesSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  imdb_code: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

WatchedMoviesSchema.index({ user: 1 });

module.exports = WatchedMovies = mongoose.model(
  "WatchedMovies",
  WatchedMoviesSchema
);
