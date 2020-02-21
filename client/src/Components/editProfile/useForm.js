import { useState } from "react";
import _ from "lodash";
// Redux
import { useSelector } from "react-redux";

export default function useForm(validate, submit, strategy) {
  const { user } = useSelector(state => state);
  const [formData, setformData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    errors: {}
  });

  const handleChange = prop => event => {
    setformData({ ...formData, [prop]: event.target.value.trim(), errors: {} });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // Validate Form
    const errorsForm = validate(formData, strategy);
    setformData({ ...formData, errors: errorsForm });
    // Send data
    if (_.isEmpty(errorsForm)) submit();
  };

  return {
    formData,
    setformData,
    handleChange,
    handleSubmit
  };
}
