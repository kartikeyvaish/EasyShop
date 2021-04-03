import * as Yup from "yup";

const ForgotPassword = () => {
  return Yup.object().shape({
    Email: Yup.string().required("Email/Phone is required"),
    OTP: Yup.string().optional(),
  });
};

const InitialValues = {
  Email: "",
  OTP: "",
};

export default {
  ForgotPassword,
  InitialValues,
};
