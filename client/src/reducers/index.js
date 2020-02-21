import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import library from "./libraryReducer";
import commentsData from "./commentsReducer";
import user from "./userReducer";
import profile from "./profileReducer";

export default combineReducers({
  alert,
  auth,
  user,
  profile,
  library,
  commentsData
});
