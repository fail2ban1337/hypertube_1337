import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import library from "./libraryReducer";

export default combineReducers({
  alert,
  auth,
  library
});
