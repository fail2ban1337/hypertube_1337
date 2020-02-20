import axios from "axios";

const setTokenToAxiosHeader = token => {
  if (token) {
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setTokenToAxiosHeader;