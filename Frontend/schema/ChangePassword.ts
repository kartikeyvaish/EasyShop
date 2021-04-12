import * as Yup from "yup";

const InitialValues = {
  CurrentPassword: "",
  NewPassword: "",
  ConfirmPassword: "",
};

const ChangePassword = () => {
  return Yup.object().shape({
    CurrentPassword: Yup.string().required().label("Current Password"),
    NewPassword: Yup.string()
      .required("A Password is required")
      .min(6)
      .label("New Password"),
    ConfirmPassword: Yup.string().oneOf(
      [Yup.ref("NewPassword"), null],
      "Passwords must match"
    ),
  });
};

export default {
  ChangePassword,
  InitialValues,
};
