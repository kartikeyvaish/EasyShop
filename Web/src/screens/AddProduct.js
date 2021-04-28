import { Formik } from "formik";

import Text from "../components/Text";
import HelperFunctions from "../config/HelperFunctions";
import Container from "./../components/Container";
import ColorPallete from "./../config/ColorPallete";
import NewProductSchema from "../schema/NewProductSchema";
import { useContext, useEffect, useRef, useState } from "react";
import TextInput from "../components/TextInput";
import ColorCard from "../components/ColorCard";
import ColorPicker from "../components/ColorPicker";
import PlusSign from "../components/PlusSign";
import FileCard from "../components/FileCard";
import { toast } from "react-toastify";
import AuthContext from "../auth/context";
import API from "../api/API";
import Button from "../components/Button";
import Link from "../components/Link";

const InitialValues = NewProductSchema.InitialValues;
const ValidationSchema = NewProductSchema.NewProductSchema();

function AddProduct({ history }) {
  const [open, setOpen] = useState(false);
  const [PickedColors, SetPickedColors] = useState([]);
  const [Files, SetFiles] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const InputRef = useRef();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = "EasyShop | Add Product";
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  const AddProduct = async (values) => {
    values.Highlights = values.Highlights.trim();
    values.Title = values.Title.trim();
    values.Category = values.Category.trim();
    values.Description = values.Description.trim();
    values.Stock = values.Stock.trim();
    values.Price = values.Price.trim();
    SetLoading(true);
    try {
      if (Files.length === 0) {
        SetLoading(false);
        toast.error("Atleast one Image is required");
      } else {
        const Check = Files.filter((c) => c.type.slice(0, 5) === "image");
        if (Check.length === 0) {
          SetLoading(false);
          toast.error("Atleast one Image is required");
        } else {
          const form = new FormData();
          form.append("Title", values.Title);
          form.append("Category", values.Category);
          form.append("Description", values.Description);
          form.append("Owner", authContext.User._id);
          form.append("Stock", values.Stock);
          form.append("Price", values.Price);
          form.append("Highlights", values.Highlights);
          form.append("Colors", JSON.stringify(PickedColors));
          for (let i = 0; i < Files.length; i++) {
            form.append("Files[]", Files[i]);
          }
          const response = await API.AddProduct(form);
          if (response.ok) {
            toast.success("Product Added Successfully");
            history.replace("/MeProducts");
          } else {
            SetLoading(false);
            toast.error("Server Error");
          }
        }
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Server Error");
    }
  };

  const PickColor = (picked) => {
    let Result = [...PickedColors];
    picked._id = HelperFunctions.GenerateUniqueID();
    picked.ColorInput = picked.ColorInput.toLowerCase();
    if (picked.VariantInput === "") {
      picked.VariantInput = picked.ColorInput.toLowerCase();
    }
    Result.push(picked);
    SetPickedColors(Result);
    handleClose();
  };

  const RemoveColor = (_id) => {
    let Filter = PickedColors.filter((c) => c._id !== _id);
    SetPickedColors(Filter);
  };

  const AddFiles = (arr) => {
    let tempFileArr = [];

    for (let i = 0; i < arr.length; i++) {
      let mime = arr[i].type.slice(0, 5);
      if (mime === "image" || mime === "video") {
        arr[i]._id = arr[i].lastModified + HelperFunctions.GenerateUniqueID();
        tempFileArr.push(arr[i]);
      }
    }
    SetFiles([...Files, ...tempFileArr]);
  };

  const RemoveFile = (_id) => {
    let Filter = Files.filter((c) => c._id !== _id);
    SetFiles(Filter);
  };

  return (
    <Container>
      {authContext.User === null ? (
        <Link
          text="You need to Login to Edit your Profile"
          textDecoration="none"
          onClick={() => history.replace("/Login")}
          marginBottom={20}
        />
      ) : (
        <div style={styles.Box}>
          <div style={styles.InnerContainer}>
            <Text
              text="Add Product"
              size={20}
              family="Mulish"
              weight="700"
              marginBottom={20}
              marginTop={20}
            />
            <Formik
              initialValues={InitialValues}
              onSubmit={(values) => AddProduct(values)}
              validationSchema={ValidationSchema}
            >
              {({
                handleChange,
                setFieldTouched,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                values,
              }) => (
                <>
                  <TextInput
                    label="Name"
                    error={errors.Title}
                    onChange={handleChange("Title")}
                    onBlur={() => setFieldTouched("Title")}
                    ErrorVisibility={touched.Title === true ? true : false}
                  />
                  <TextInput
                    label="Category"
                    error={errors.Category}
                    onChange={handleChange("Category")}
                    onBlur={() => setFieldTouched("Category")}
                    ErrorVisibility={touched.Category === true ? true : false}
                  />
                  <TextInput
                    label="Description"
                    error={errors.Description}
                    multiline={true}
                    onChange={handleChange("Description")}
                    onBlur={() => setFieldTouched("Description")}
                    ErrorVisibility={
                      touched.Description === true ? true : false
                    }
                  />
                  <TextInput
                    label="Stock"
                    error={errors.Stock}
                    onChange={handleChange("Stock")}
                    onBlur={() => setFieldTouched("Stock")}
                    ErrorVisibility={touched.Stock === true ? true : false}
                  />
                  <TextInput
                    label="Price"
                    error={errors.Price}
                    onChange={handleChange("Price")}
                    onBlur={() => setFieldTouched("Price")}
                    ErrorVisibility={touched.Price === true ? true : false}
                  />
                  <TextInput
                    label="Highlights (optional)"
                    error={errors.Highlights}
                    multiline={true}
                    onChange={handleChange("Highlights")}
                    onBlur={() => setFieldTouched("Highlights")}
                    ErrorVisibility={touched.Highlights === true ? true : false}
                  />

                  <Text
                    text="Color Variants"
                    size={20}
                    family="Mulish"
                    weight="700"
                    marginBottom={20}
                    marginTop={20}
                  />

                  <ColorPicker
                    open={open}
                    handleClose={() => handleClose()}
                    handleOpen={() => handleOpen()}
                    pick={(data) => PickColor(data)}
                  />

                  <div style={styles.ColorCardBox}>
                    <PlusSign onClick={() => setOpen(true)} />
                    {PickedColors.map((c) => (
                      <ColorCard
                        color={c.ColorInput}
                        Variant={c.VariantInput}
                        key={c._id}
                        onCancel={() => RemoveColor(c._id)}
                      />
                    ))}
                  </div>

                  <Text
                    text="Files"
                    size={20}
                    family="Mulish"
                    weight="700"
                    marginBottom={20}
                    marginTop={20}
                  />

                  <input
                    ref={InputRef}
                    style={{ display: "none" }}
                    type="file"
                    multiple
                    accept="image/x-png,image/jpeg, image/jpg, video/mp4"
                    onChange={(e) => AddFiles(e.target.files)}
                  />

                  <div style={styles.FilesBox}>
                    <PlusSign onClick={() => InputRef.current.click()} />
                    {Files.map((c) => (
                      <FileCard
                        file={c}
                        key={c._id}
                        type={c.type.slice(0, 5)}
                        onCancel={() => RemoveFile(c._id)}
                      />
                    ))}
                  </div>

                  <Button
                    Title="Add Product"
                    onClick={handleSubmit}
                    marginTop={20}
                    color="white"
                    capitalize={false}
                    Loading={Loading}
                  />
                </>
              )}
            </Formik>
          </div>
        </div>
      )}
    </Container>
  );
}

export default AddProduct;

const styles = {
  AddIcon: {
    backgroundColor: ColorPallete.primary,
    color: "white",
    borderRadius: "50%",
  },
  Box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  InnerContainer: {
    width: "100%",
    maxWidth: 800,
    height: "auto",
    paddingBottom: 100,
  },
  AddProductBTN: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: ColorPallete.primary,
    borderWidth: 1,
    borderStyle: "solid",
    maxWidth: 150,
  },
  ColorCardBox: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    borderColor: "grey",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingTop: 5,
  },
  FilesBox: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    borderColor: "grey",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingTop: 5,
  },
};
