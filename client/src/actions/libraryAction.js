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
  sort_by = "year",
  filterGenre = "All",
  filterRatingMin = 0
) => async disptach => {
  try {
    disptach(unsetAlert());
    disptach(setHasMore(true));
    disptach(setLoading());

    const source = axios.CancelToken.source();

    const result = await axios.get("/api/library/movies/page/", {
      params: {
        pid,
        sort_by,
        filterGenre,
        filterRatingMin
      },
      cancelToken: source.token,
    });
    if (result.data.length < 15) disptach(setHasMore(false));
    disptach({
      type: SET_MOVIES,
      payload: result.data
    });
  } catch (error) {
    disptach({
      type: SET_HASMORE,
      payload: false
    });
    if (!axios.isCancel(error)) {
      const msg = error.response.data.msg;
      disptach(setAlert(msg, "error"));
    }
  }
};

export const getMovieByKeyword = keyword => async disptach => {
  try {
    disptach({
      type: UNSET_MOVIES
    });
    disptach(unsetAlert());
    disptach(setHasMore(true));
    disptach(setLoading());

    const result = await axios.get(`/api/library/movies/keyword/${keyword}`);
    if (result.data.length < 15) disptach(setHasMore(false));
    disptach({
      type: SET_MOVIES,
      payload: result.data
    });
  } catch (error) {
    const msg = error.response.data.msg;
    disptach({
      type: SET_HASMORE,
      payload: false
    });
    disptach(setAlert(msg, "error"));
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
