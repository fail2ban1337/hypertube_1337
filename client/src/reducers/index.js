import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import library from "./libraryReducer";
import commentsData from "./commentsReducer";

export default combineReducers({
  alert,
  auth,
  library,
  commentsData
});
