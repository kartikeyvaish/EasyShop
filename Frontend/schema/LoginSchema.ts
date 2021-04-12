import * as Yup from "yup";

const LoginScehma = () => {
  return Yup.object().shape({
    Email: Yup.string().required("Email/Phone is required"),
    Password: Yup.string().required("Password is required"),
  });
};

const InitialValues = {
  Email: "",
  Password: "",
  RememberMe: false,
};

export default {
  LoginScehma,
  InitialValues,
};
