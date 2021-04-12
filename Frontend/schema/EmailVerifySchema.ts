import * as Yup from "yup";

const InitialValues = {
  Email: "",
  Code: "",
};

const EmailVerifySchema = () => {
  return Yup.object().shape({
    OTP: Yup.string().required().min(6),
  });
};

export default {
  EmailVerifySchema,
  InitialValues,
};
