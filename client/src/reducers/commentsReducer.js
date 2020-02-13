import { ADD_NEW_COMMENT, GET_COMMENTS } from "../actions/actionTypes";

const initialState = {
  allComments: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log("payload", payload);
  switch (type) {
    case ADD_NEW_COMMENT:
      let result = [...state.allComments, ...payload];
      return {
        ...state,
        allComments: result
      };
    case GET_COMMENTS:
      return {...state,
        allComments: payload
    }
    default:
      return state;
  }
}
