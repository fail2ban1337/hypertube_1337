import uuid from "uuid";

import { SET_ALERT, REMOVE_ALERT } from "./actionTypes";

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};

export const unsetAlert = () => dispatch => {
  dispatch({
    type: REMOVE_ALERT
  });
};
