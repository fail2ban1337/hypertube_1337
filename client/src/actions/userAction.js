import axios from 'axios';
import setTokenToAxiosHeader from '../utils/setTokenToAxiosHeader';
import { LOAD_USER, LOAD_FAIL, DESTROY_USER } from './actionTypes';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setTokenToAxiosHeader(localStorage.token);
  }

  try {
    const response = await axios.get("/api/users/me");
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

export const logout = () => async dispatch => {
  try {

    dispatch({
      type: DESTROY_USER,
    });
    dispatch(loadUser());
    window.location = '/login';
  } catch (error) {
    dispatch(loadUser());
  }
};