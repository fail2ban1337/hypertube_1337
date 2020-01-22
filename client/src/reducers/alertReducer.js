import { SET_ALERT, REMOVE_ALERT } from "../actions/actionTypes";
const initialState = [];
export default function(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return [];
    default:
      return state;
  }
}
