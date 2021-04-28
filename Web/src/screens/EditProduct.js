import { Formik } from "formik";

import Text from "../components/Text";
import HelperFunctions from "../config/HelperFunctions";
import Container from "./../components/Container";
import ColorPallete from "./../config/ColorPallete";
import NewProductSchema from "../schema/NewProductSchema";
import { useEffect, useRef, useState } from "react";
import TextInput from "../components/TextInput";
import ColorCard from "../components/ColorCard";
import ColorPicker from "../components/ColorPicker";
import PlusSign from "../components/PlusSign";
import FileCard from "../components/FileCard";
import { toast } from "react-toastify";
import API from "../api/API";
import Button from "../components/Button";

const ValidationSchema = NewProductSchema.NewProductSchema();

function EditProduct({ history, location }) {
  const [open, setOpen] = useState(false);
  const [PickedColors, SetPickedColors] = useState(location.state.Colors);
  const [Files, SetFiles] = useState([]);
  const [RemoveFilesArr, SetRemoveFilesArr] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const InputRef = useRef();

  useEffect(() => {
    document.title = "EasyShop | Edit Product";
    SortFiles(location.state.Files);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {};
  }, []);

  const InitialValues = location.state;

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
    let err = false;

    for (let i = 0; i < arr.length; i++) {
      let mime = arr[i].type.slice(0, 5);
      if (mime === "image" || mime === "video") {
        let result = {
          _id: arr[i].lastModified + HelperFunctions.GenerateUniqueID(),
          type: mime,
          file: arr[i],
          StorageType: "New",
        };
        arr[i]._id = arr[i].lastModified + HelperFunctions.GenerateUniqueID();
        tempFileArr.push(result);
      } else {
        err = true;
      }
    }
    SetFiles([...Files, ...tempFileArr]);

    if (err) toast.error("Only Images/Videos Allowed");
  };

  const RemoveFile = (StorageType, _id) => {
    if (Files.length === 1) {
      toast.error("Cannot Delete all Images");
    } else {
      if (StorageType === "New") {
        let Filter = Files.filter((c) => c._id !== _id);
        SetFiles(Filter);
      } else {
        let temp = [...RemoveFilesArr];
        let index = Files.findIndex((c) => c._id === _id);
        if (index > -1) {
          temp.push(Files[index]);
        }
        let Filter = Files.filter((c) => c._id !== _id);
        SetFiles(Filter);
        SetRemoveFilesArr(temp);
      }
    }
  };

  const SortFiles = (arr) => {
    let Res = [];
    for (let i = 0; i < arr.length; i++) {
      let temp = {
        uri: arr[i],
        type: HelperFunctions.GiveMimeType(arr[i]),
        name:
          HelperFunctions.GenerateUniqueID().toString() +
          "." +
          arr[i].split(".").pop(),
        _id: HelperFunctions.GenerateUniqueID(),
        StorageType: "Previous",
      };
      Res.push(temp);
    }
    SetFiles(Res);
  };

  const RemoveFilesFromDatabase = async () => {
    try {
      if (RemoveFilesArr.length === 0) {
        AddFilesToDatabase();
      } else {
        SetLoading(false);
        for (let i = 0; i < RemoveFilesArr.length; i++) {
          const response = await API.RemoveFile({
            _id: location.state._id,
            File: RemoveFilesArr[i].uri,
          });
          if (response.ok === false) {
            toast.error("SERVER ERROR");
            SetLoading(false);
            break;
          }
        }
        AddFilesToDatabase();
      }
    } catch (error) {
      toast.error("SERVER ERROR");
      SetLoading(false);
    }
  };

  const AddFilesToDatabase = async () => {
    try {
      const Check = Files.filter((c) => c.StorageType === "New");
      if (Check.length === 0) {
        history.replace("/");
      } else {
        const form = new FormData();
        form.append("_id", location.state._id);
        for (let i = 0; i < Files.length; i++) {
          if (Files[i].StorageType === "New") {
            form.append("Files[]", Files[i].file);
          }
        }
        console.log(form);
        SetLoading(false);
        const response = await API.AddFile(form);
        if (response.ok) {
          history.replace("/");
          toast.success("Product Updated Successfully");
        } else {
          SetLoading(false);
          toast.error("Server Error");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("SERVER ERROR");
      SetLoading(false);
    }
  };

  const UpdateProduct = async (values) => {
    SetLoading(true);
    try {
      const Check = Files.filter((c) => c.type === "image");
      if (Check.length === 0) {
        SetLoading(false);
        toast.error("Atleast one Image is required");
      } else {
        let temp = { ...values };
        temp.Colors = PickedColors;
        delete temp["Files"];
        delete temp["AvailableAt"];
        delete temp["__v"];
        delete temp["_id"];
        let Data = { _id: values._id, Edit: { ...temp } };
        const response = await API.EditProduct(Data);
        if (response.ok) {
          RemoveFilesFromDatabase();
        } else {
          toast.error("SERVER ERROR");
          SetLoading(false);
        }
      }
    } catch (error) {
      toast.error("SERVER ERROR");
      SetLoading(false);
    }
  };

  return (
    <Container>
      <div style={styles.Box}>
        <div style={styles.InnerContainer}>
          <Text
            text="Edit Product"
            size={20}
            family="Mulish"
            weight="700"
            marginBottom={20}
            marginTop={20}
          />
          <Formik
            initialValues={InitialValues}
            onSubmit={(values) => UpdateProduct(values)}
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
                  defaultValue={location.state.Title}
                  onBlur={() => setFieldTouched("Title")}
                  ErrorVisibility={touched.Title === true ? true : false}
                />
                <TextInput
                  label="Category"
                  error={errors.Category}
                  onChange={handleChange("Category")}
                  defaultValue={location.state.Category}
                  onBlur={() => setFieldTouched("Category")}
                  ErrorVisibility={touched.Category === true ? true : false}
                />
                <TextInput
                  label="Description"
                  error={errors.Description}
                  multiline={true}
                  onChange={handleChange("Description")}
                  defaultValue={location.state.Description}
                  onBlur={() => setFieldTouched("Description")}
                  ErrorVisibility={touched.Description === true ? true : false}
                />
                <TextInput
                  label="Stock"
                  error={errors.Stock}
                  onChange={handleChange("Stock")}
                  defaultValue={location.state.Stock}
                  onBlur={() => setFieldTouched("Stock")}
                  ErrorVisibility={touched.Stock === true ? true : false}
                />
                <TextInput
                  label="Price"
                  error={errors.Price}
                  onChange={handleChange("Price")}
                  defaultValue={location.state.Price}
                  onBlur={() => setFieldTouched("Price")}
                  ErrorVisibility={touched.Price === true ? true : false}
                />
                <TextInput
                  label="Highlights (optional)"
                  error={errors.Highlights}
                  multiline={true}
                  onChange={handleChange("Highlights")}
                  defaultValue={location.state.Highlights}
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
                  text="Images/Videos"
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
                      file={c.file}
                      key={c._id}
                      type={c.type.slice(0, 5)}
                      onCancel={() => RemoveFile(c.StorageType, c._id)}
                      uri={c.uri}
                    />
                  ))}
                </div>

                <Button
                  Title="Add Product"
                  onClick={handleSubmit}
                  marginTop={20}
                  Loading={Loading}
                />
              </>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
}

export default EditProduct;

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
