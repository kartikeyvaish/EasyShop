import * as Yup from "yup";

const InitialValues = {
  Title: "",
  Category: "",
  Description: "",
  Stock: "",
  Price: "",
  Highlights: "",
};

const NewProductSchema = () => {
  return Yup.object().shape({
    Title: Yup.string().required(),
    Category: Yup.string().required(),
    Description: Yup.string().required(),
    Stock: Yup.string().required(),
    Price: Yup.string().required(),
    Highlights: Yup.string().optional(),
  });
};

const Exports = {
  NewProductSchema,
  InitialValues,
};

export default Exports;
