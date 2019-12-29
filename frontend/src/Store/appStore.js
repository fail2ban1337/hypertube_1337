import React, { useContext } from "react";
import { useReducer } from "react";
import useCombinedReducers from "use-combined-reducers";
import { alertReducer, alertInitState } from "../Reducers/alertReducer";

export const appStore = React.createContext();

export const UserProvider = ({ children }) => {
  const globalReducers = useCombinedReducers({
    alert: useReducer(alertReducer, alertInitState)
  });
  return (
    <appStore.Provider value={globalReducers}>{children}</appStore.Provider>
  );
};

export const useUserStore = () => useContext(appStore);
