import axios from "axios";
import { ADD_NEW_COMMENT, GET_COMMENTS, LIKE_COMMENT } from "./actionTypes";
import { setAlert } from "./alert";

var _ = require("lodash");

// @desc get all the movie info
export const movieInfo = async imdb_code => {
  try {
    const res = await axios.get(`/api/library/movies/imdb_code/${imdb_code}`);
    return res.data[0];
  } catch (err) {
    const errors = err.response.data.msg;
    return errors;
  }
};
// @desc get other movies by genre
export const otherMovies = async (genre = "horror") => {
  try {
    const res = await axios.get(`/api/library/movies/genre/${genre}`);
    return _.sampleSize(res.data, 8);
  } catch (err) {
    const errors = err.response.data.msg;
    return errors;
  }
};

// @desc update the selected movie date of watched
export const watchedUpdate = async (hash_code, imdb_code) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ hash_code, imdb_code });
  try {
    const res = await axios.post("/api/streaming/watchedUpdate", body, config);
  } catch (error) {}
};

// @desc add new comment on the chossen movie
export const addComment = (imdb_code, comment_text) => async disptach => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ imdb_code, comment_text });
  try {
    const res = await axios.post("/api/streaming/AddComment", body, config);
    disptach({
      type: ADD_NEW_COMMENT,
      payload: res.data
    });
  } catch (error) {}
};

// @desc get all comments on the chossen movie
export const getComments = imdb_code => async disptach => {
  try {
    const res = await axios.get(`/api/streaming/getComments/${imdb_code}`);
    disptach({
      type: GET_COMMENTS,
      payload: res.data
    });
  } catch (error) {}
};

// @desc Like a comment on the chossen movie
export const likComment = (imdb_code, comment_id) => async disptach => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ imdb_code, comment_id });
  try {
    const res = await axios.post("/api/streaming/likeComment", body, config);
    disptach({
      type: LIKE_COMMENT,
      payload: res.data[0]
    });
  } catch (error) {
    const msg = error.response.data.msg;
    disptach(setAlert(msg, "error"));
  }
};
