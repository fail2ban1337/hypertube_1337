import axios from "axios";
import setTokenToAxiosHeader from "../utils/setTokenToAxiosHeader";
import {
  LOAD_USER,
  LOAD_FAIL,
  DESTROY_USER,
  LOADING_USER,
  LOAD_PROFILE,
  LOADING_PROFILE,
  PROFILE_FAIL
} from "./actionTypes";
import { setAlert } from "./alert";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setTokenToAxiosHeader(localStorage.token);
  }

  try {
    dispatch(setLoading(LOADING_USER));

    const source = axios.CancelToken.source();

    const response = await axios.get("/api/users/me", {
      cancelToken: source.token
    });
    const { user } = response.data;

    dispatch({
      type: LOAD_USER,
      payload: user
    });
  } catch (error) {
    dispatch({
      type: LOAD_FAIL
    });
  }
};

export const getProfile = id => async dispatch => {
  try {
    // dispatch(setLoading(LOADING_PROFILE));

    const profile = await axios.get(`/api/user/info/${id}`);
    const movies = await axios.get(`/api/users/watched/${id}`);

    console.log("@@@@@@@@@@@@@@@@@", profile, movies);

    const payload = {
      info: profile,
      movies: movies
    };

    dispatch({
      type: LOAD_PROFILE,
      payload
    });
  } catch (error) {
    console.log(error);
    const { msg } = error.response.data;

    dispatch({
      type: PROFILE_FAIL
    });

    dispatch(setAlert(msg, "error"));
  }
};

export const logout = () => async dispatch => {
  dispatch({
    type: DESTROY_USER
  });

  setTokenToAxiosHeader(false);
};

const setLoading = actionType => async dispatch => {
  dispatch({
    type: actionType
  });
};
