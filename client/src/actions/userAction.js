import axios from "axios";
import setTokenToAxiosHeader from "../utils/setTokenToAxiosHeader";
import {
  LOAD_USER,
  LOAD_FAIL,
  DESTROY_USER,
  LOADING_USER,
  LOAD_PROFILE,
  PROFILE_FAIL
} from "./actionTypes";
import { setAlert } from "./alert";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setTokenToAxiosHeader(localStorage.token);
  }

  try {
    dispatch(setLoading(LOADING_USER));

    const response = await axios.get("/api/users/me", {
      cancelToken: source.token
    });
    const { user } = response.data;

    dispatch({
      type: LOAD_USER,
      payload: user
    });
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch({
        type: LOAD_FAIL
      });
    }
  }
};

export const getProfile = id => async dispatch => {
  try {
    // dispatch(setLoading(LOADING_PROFILE));
    const profile = await axios.get(`/api/users/info/${id}`, {
      cancelToken: source.token
    });
    const movies = await axios.get(`/api/users/watched/${id}`, {
      cancelToken: source.token
    });

    const payload = {
      info: profile.data,
      movies: movies.data
    };

    dispatch({
      type: LOAD_PROFILE,
      payload
    });
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.log(error);
      const { msg } = error.response.data;

      dispatch({
        type: PROFILE_FAIL
      });

      dispatch(setAlert(msg, "error"));
    }
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
