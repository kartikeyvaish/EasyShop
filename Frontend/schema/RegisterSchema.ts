import * as Yup from "yup";

const InitialValues = {
  Email: "",
  Name: "",
  Password: "",
  Phone: "",
  FormattedPhone: "",
  ConfirmPassword: "",
};

const RegisterSchema = () => {
  return Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    Email: Yup.string().required("Email is required").email(),
    Phone: Yup.number("Phone must be a Number").required("Phone is required"),
    Password: Yup.string().required("Password is required").min(6),
    ConfirmPassword: Yup.string().oneOf(
      [Yup.ref("Password"), null],
      "Passwords must match"
    ),
  });
};

export default {
  RegisterSchema,
  InitialValues,
};
