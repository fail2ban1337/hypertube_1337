import axios from "axios";

import {
  SET_MOVIES,
  SET_LOADING,
  SET_HASMORE,
  UNSET_MOVIES
} from "./actionTypes";
import { setAlert, unsetAlert } from "./alert";

export const getMovies = (
  pid = 1,
  sort_by = "trending",
  filterGenre = "All",
  filterRatingMin = 0
) => async dispatch => {
  try {
    dispatch(unsetAlert());
    dispatch(setHasMore(true));
    dispatch(setLoading());

    const source = axios.CancelToken.source();

    const result = await axios.get("/api/library/movies/page/", {
      params: {
        pid,
        sort_by,
        filterGenre,
        filterRatingMin
      },
      cancelToken: source.token
    });
    if (result.data.length < 15) dispatch(setHasMore(false));
    dispatch({
      type: SET_MOVIES,
      payload: result.data
    });
  } catch (error) {
    dispatch({
      type: SET_HASMORE,
      payload: false
    });
    if (!axios.isCancel(error)) {
      const msg = error.response.data.msg;
      dispatch(setAlert(msg, "error"));
    }
  }
};

export const getMovieByKeyword = keyword => async dispatch => {
  try {
    dispatch({
      type: UNSET_MOVIES
    });
    dispatch(unsetAlert());
    dispatch(setHasMore(true));
    dispatch(setLoading());

    const result = await axios.get(`/api/library/movies/keyword/${keyword}`);
    if (result.data.length < 15) dispatch(setHasMore(false));
    dispatch({
      type: SET_MOVIES,
      payload: result.data
    });
  } catch (error) {
    const msg = error.response.data.msg;
    dispatch({
      type: SET_HASMORE,
      payload: false
    });
    dispatch(setAlert(msg, "error"));
  }
};

export const setWatchedMovie = movie => async dispatch => {
  try {
    await axios.post("/api/users/watched", movie);
  } catch (error) {
    const msg = error.response.data.msg;
    dispatch(setAlert(msg, "error"));
  }
};

const setLoading = () => dispatch =>
  dispatch({
    type: SET_LOADING
  });

const setHasMore = value => dispatch =>
  dispatch({
    type: SET_HASMORE,
    payload: value
  });
