const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  imdbCode: {
    type: String,
    required: true
  },
  commentText: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  userId: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
  ]
});

module.exports = Comments = mongoose.model("comments", CommentsSchema);
