const mongoose = require("mongoose");

const StreamedSchema = new mongoose.Schema({
  hashCode: {
    type: String,
    required: true
  },
  imdbCode: {
    type: String,
    required: true
  },
  lastWatchedTime: {
    type: Date,
    required: true
  }
});

module.exports = stream = mongoose.model("stream", StreamedSchema);
