import {
  ADD_NEW_COMMENT,
  GET_COMMENTS,
  LIKE_COMMENT
} from "../actions/actionTypes";

const initialState = {
  allComments: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_NEW_COMMENT:
      let result = [...state.allComments, ...payload];
      return {
        ...state,
        allComments: result
      };
    case GET_COMMENTS:
      return { ...state, allComments: payload };
    case LIKE_COMMENT:
      return {
        ...state,
        allComments: state.allComments.map(comment => {
          if (comment._id === payload._id) return payload;
          return comment;
        })
      };
    default:
      return state;
  }
}
