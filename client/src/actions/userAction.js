import axios from 'axios';
import setTokenToAxiosHeader from '../utils/setTokenToAxiosHeader';
import { LOAD_USER, LOAD_FAIL, DESTROY_USER, LOADING_USER } from './actionTypes';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setTokenToAxiosHeader(localStorage.token);
  }

  try {
    dispatch(setLoading());
    
    const source = axios.CancelToken.source();

    const response = await axios.get("/api/users/me", { cancelToken: source.token });
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
    dispatch({
      type: DESTROY_USER,
    });

    setTokenToAxiosHeader(false);
};

const setLoading = () => async dispatch => {
  dispatch({
    type: LOADING_USER
  });
}; 