import { ADD_NEW_COMMENT } from "../actions/actionTypes";

const initialState = {
  Comments: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_NEW_COMMENT:
      let result = [...state.Comments, ...payload];
      return {
        ...state,
        Comments: result
      };
    default:
      return state;
  }
}
