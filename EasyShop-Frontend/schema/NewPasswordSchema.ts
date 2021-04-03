import * as Yup from "yup";

const InitialValues = {
  Password: "",
  ConfirmPassword: "",
};

const NewPassword = () => {
  return Yup.object().shape({
    Password: Yup.string().required("Password is required").min(6),
    ConfirmPassword: Yup.string().oneOf(
      [Yup.ref("Password"), null],
      "Passwords must match"
    ),
  });
};

export default {
  NewPassword,
  InitialValues,
};
