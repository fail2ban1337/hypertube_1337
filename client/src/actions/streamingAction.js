import axios from "axios";
var _ = require("lodash");

export const movieInfo = async imdb_code => {
  try {
    const res = await axios.get(`/api/library/movies/imdb_code/${imdb_code}`);
    return res.data[0];
  } catch (err) {
    const errors = err.response.data.msg;
    return errors;
  }
};

export const otherMovies = async genre => {
  try {
    const res = await axios.get(`/api/library/movies/genre/${genre}`);
    return _.sampleSize(res.data, 8);
  } catch (err) {
    const errors = err.response.data.msg;
    return errors;
  }
};
