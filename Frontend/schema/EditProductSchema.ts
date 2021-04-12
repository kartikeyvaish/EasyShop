import * as Yup from "yup";

const EditProductSchema = () => {
  return Yup.object().shape({
    Title: Yup.string().required(),
    Category: Yup.string().required(),
    Description: Yup.string().required(),
    Stock: Yup.string().required(),
    Price: Yup.string().required(),
    Highlights: Yup.string().optional(),
  });
};

export default {
  EditProductSchema,
};
