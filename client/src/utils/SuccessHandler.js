import Swal from "sweetalert2";
import { t } from "../i18n";

const handleSuccess = msg => {
  if (msg !== undefined && msg.trim().length > 0) {
    return Swal.fire({
      icon: "success",
      html: t(`auth_messages.${msg.split(" ").join("_")}`)
    });
  }
};

export default handleSuccess;
