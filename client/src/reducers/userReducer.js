import { LOAD_USER, LOADING_USER, LOAD_FAIL, DESTROY_USER } from "../actions/actionTypes";

const initialState = {
  loading: true,
  isAuthenticated: false,
  info: {},
};

export default function(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case LOAD_USER:
      return { ...state, loading: false, isAuthenticated: true, info: payload };
    case LOAD_FAIL:
      return { ...state, loading: false, isAuthenticated: false, info: {} };
    case DESTROY_USER:
      if (localStorage.token) {
        localStorage.removeItem('token');
      }
      return { ...state, loading: false, isAuthenticated: false, info: {} };
    case LOADING_USER:
      return { ...state, loading: true };
    default:
      return state;
  }
}