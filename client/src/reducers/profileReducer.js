import {
  LOAD_PROFILE,
  PROFILE_FAIL,
  LOADING_PROFILE
} from "../actions/actionTypes";

const initialState = {
  profile: true,
  loading: true,
  movies: [],
  info: {}
};

export default function(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case LOAD_PROFILE:
      return {
        ...state,
        loading: false,
        profile: true,
        movies: payload.movies,
        info: payload.info
      };
    case PROFILE_FAIL:
      return { ...state, loading: false, profile: false, movies: [], info: {} };
    case LOADING_PROFILE:
      return { ...state, loading: true };
    default:
      return state;
  }
}
