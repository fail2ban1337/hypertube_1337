import uniqBy from "lodash/uniqBy";

import {
  SET_MOVIES,
  UNSET_MOVIES,
  SET_LOADING,
  SET_SORT,
  SET_FILTERS,
  SET_HASMORE
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  page: 1,
  sort: "year",
  rating: 0,
  genre: "All",
  hasMore: true,
  movies: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_MOVIES:
      let result = [...state.movies, ...payload];
      result = uniqBy(result, "imdb_code");

      return { ...state, page: state.page + 1, loading: false, movies: result };
    case UNSET_MOVIES:
      return { ...state, page: 1, loading: false, movies: [] };
    case SET_SORT:
      return { ...state, page: 1, sort: payload, movies: [] };
    case SET_FILTERS:
      return {
        ...state,
        page: 1,
        movies: [],
        rating: payload.rating,
        genre: payload.genre
      };
    case SET_HASMORE:
      return { ...state, loading: false, hasMore: payload };
    default:
      return state;
  }
}
