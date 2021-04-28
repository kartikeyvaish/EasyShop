import * as Yup from "yup";

const InitialValues = {
  Name: "",
  Email: "",
  Phone: "",
};

const EditProfileSchema = () => {
  return Yup.object().shape({
    Name: Yup.string().required(),
    Email: Yup.string().required().email(),
    Phone: Yup.string().required(),
  });
};

const DefaultExports = {
  EditProfileSchema,
  InitialValues,
};

export default DefaultExports;
