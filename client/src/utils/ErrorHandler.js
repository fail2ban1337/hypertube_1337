import Swal from "sweetalert2";
import { t } from "../i18n";

const handleError = err => {
  if (err && err.response && err.response.data !== undefined) {
    if (err.response.data.errors !== undefined) {
      if (err.response.data.errors.length > 0) {
        return Swal.fire({
          icon: "error",
          html: err.response.data.errors.map(e => {
            return t(`auth_messages.${e.msg.split(" ").join("_")}`) + "<hr />";
          })
        });
      }
    } else if (err.response.data.message !== undefined) {
      return Swal.fire({
        icon: "error",
        html: err.response.data.message
      });
    } else {
      console.error(err.response.data);
      return Promise.resolve({});
    }
  }
};

export default handleError;
