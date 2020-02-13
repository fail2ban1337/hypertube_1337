import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import library from "./libraryReducer";
import comments from "./commentsReducer";

export default combineReducers({
  alert,
  auth,
  library,
  comments
});
