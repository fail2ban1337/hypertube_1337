const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  imdbCode: { type: String, required: true },
  commentText: { type: String, required: true },
  likeCount: { type: Number, required: true, default: 0 },
  likes: [],
  time: { type: Date, default: Date.now },
  userInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

module.exports = Comments = mongoose.model("comments", CommentsSchema);
