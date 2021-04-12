import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";

import API from "../api/API";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ColorCard from "../components/ColorCard";
import ColorPallete from "../config/ColorPallete";
import ColorPicker from "../components/ColorPicker";
import EditProductSchema from "../schema/EditProductSchema";
import FileCard from "../components/FileCard";
import HelperFunctions from "../config/HelperFunctions";
import Icon from "../components/Icon";
import ScrollContainer from "../components/ScrollContainer";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";

const ValidationSchema = EditProductSchema.EditProductSchema();

function NewProduct({ navigation, route }) {
  const [Picked, SetPicked] = useState([]);
  const [RemoveFilesArr, SetRemoveFilesArr] = useState([]);
  const [PickedColors, SetPickedColors] = useState(route.params.Colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [MediaPerm, SetMediaPerm] = useState(false);
  const [CameraPerm, SetCameraPerm] = useState(false);
  const [Loading, SetLoading] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  useEffect(() => {
    SortFiles(route.params.Files);
  }, []);

  const InitialValues = route.params;

  const GetPermission = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    SetMediaPerm(result.granted);

    const camResult = await ImagePicker.requestCameraPermissionsAsync();
    SetCameraPerm(camResult.granted);
  };

  const CaptureFile = async (option) => {
    try {
      if (MediaPerm === true && CameraPerm === true) {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes:
            option === "image"
              ? ImagePicker.MediaTypeOptions.Images
              : ImagePicker.MediaTypeOptions.Videos,
          videoMaxDuration: 120,
        });
        if (result.cancelled === false) {
          let Result = [...Picked];
          result._id = HelperFunctions.GenerateUniqueID();
          result.StorageType = "New";
          result.name =
            HelperFunctions.GenerateUniqueID().toString() +
            "." +
            result.uri.split(".").pop();
          Result.push(result);
          SetPicked(Result);
        }
      } else {
        GetPermission();
      }
    } catch (error) {}
  };

  const PickFilesBTN = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableWithoutFeedback onPress={() => PickFiles()}>
        <View style={[styles.AddFileBTN, { marginRight: 10 }]}>
          <Icon Name="AntDesign" IconName="plus" size={25} color="white" />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => CaptureFile("image")}>
        <View style={[styles.AddFileBTN, { marginRight: 10 }]}>
          <Icon Name="Entypo" IconName="camera" size={25} color="white" />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => CaptureFile("video")}>
        <View style={styles.AddFileBTN}>
          <Icon Name="Entypo" IconName="video-camera" size={24} color="white" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  const PickColorBTN = () => (
    <TouchableWithoutFeedback onPress={() => showModal()}>
      <View style={styles.ColorBTNAdding}>
        <View style={styles.AddFileBTN}>
          <Icon Name="AntDesign" IconName="plus" size={25} color="white" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const PickFiles = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });
    if (result.type !== "cancel") {
      let type = HelperFunctions.GiveMimeType(result.uri);
      if (type === "none") {
        Toast.show("Only Images/Videos Allowed");
      } else {
        let Result = [...Picked];
        result._id = HelperFunctions.GenerateUniqueID();
        result.type = type;
        result.StorageType = "New";
        Result.push(result);
        SetPicked(Result);
      }
    }
  };

  const RemoveFile = (StorageType, _id) => {
    if (Picked.length === 1) {
      Toast.show("Cannot Delete all Images");
    } else {
      if (StorageType === "New") {
        let Filter = Picked.filter((c) => c._id !== _id);
        SetPicked(Filter);
      } else {
        let temp = [...RemoveFilesArr];
        let index = Picked.findIndex((c) => c._id === _id);
        if (index > -1) {
          temp.push(Picked[index]);
        }
        let Filter = Picked.filter((c) => c._id !== _id);
        SetPicked(Filter);
        SetRemoveFilesArr(temp);
      }
    }
  };

  const RenderFileCard = ({ item }) => (
    <FileCard
      File={item.uri}
      Type={item.type}
      StorageType={item.StorageType}
      onPress={() => RemoveFile(item.StorageType, item._id)}
    />
  );

  const PickColor = (picked) => {
    let Result = [...PickedColors];
    picked._id = HelperFunctions.GenerateUniqueID();
    picked.ColorInput = picked.ColorInput.toLowerCase();
    Result.push(picked);
    SetPickedColors(Result);
    hideModal();
  };

  const RemoveColor = (_id) => {
    let Filter = PickedColors.filter((c) => c._id !== _id);
    SetPickedColors(Filter);
  };

  const RenderColorCard = ({ item }) => (
    <ColorCard
      Color={item.ColorInput}
      Variant={item.VariantInput}
      onPress={() => RemoveColor(item._id)}
    />
  );

  const RemoveFilesFromDatabase = async () => {
    try {
      if (RemoveFilesArr.length === 0) {
        AddFilesToDatabase();
      } else {
        for (let i = 0; i < RemoveFilesArr.length; i++) {
          const response = await API.RemoveFile({
            _id: route.params._id,
            File: RemoveFilesArr[i].uri,
          });
          if (response.ok === false) {
            Toast.show("SERVER ERROR");
            SetLoading(false);
            break;
          }
        }
        AddFilesToDatabase();
      }
    } catch (error) {
      Toast.show("SERVER ERROR");
      SetLoading(false);
    }
  };

  const AddFilesToDatabase = async () => {
    try {
      const Check = Picked.filter((c) => c.StorageType === "New");
      if (Check.length === 0) {
        navigation.goBack();
      } else {
        const form = new FormData();
        form.append("_id", route.params._id);
        for (let i = 0; i < Picked.length; i++) {
          if (Picked[i].StorageType === "New") {
            form.append("Files[]", {
              name: Picked[i].name,
              uri: Picked[i].uri,
              type: Picked[i].type + "/" + Picked[i].name.split(".").pop(),
            });
          }
        }
        const response = await API.AddFile(form);
        if (response.ok) {
          navigation.goBack();
          Toast.show("Product Updated Successfully", "success");
        } else {
          SetLoading(false);
          Toast.show("Server Error");
        }
      }
    } catch (error) {
      Toast.show("SERVER ERROR");
      SetLoading(false);
    }
  };

  const UpdateProduct = async (values) => {
    SetLoading(true);
    try {
      const Check = Picked.filter((c) => c.type === "image");
      if (Check.length === 0) {
        SetLoading(false);
        Toast.show("Atleast one Image is required");
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
          Toast.show("SERVER ERROR");
          SetLoading(false);
        }
      }
    } catch (error) {
      Toast.show("SERVER ERROR");
      SetLoading(false);
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
    SetPicked(Res);
  };

  return (
    <ScrollContainer
      style={{ paddingTop: 0 }}
      Loading={Loading}
      LoadingText={"Updating Product.."}
    >
      <View style={styles.container}>
        <Formik
          initialValues={InitialValues}
          onSubmit={(values) => UpdateProduct(values)}
          validationSchema={ValidationSchema}
        >
          {({
            handleChange,
            setFieldTouched,
            handleSubmit,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                placeholder="Name of Product"
                onChangeText={handleChange("Title")}
                Error={errors.Title}
                defaultValue={route.params.Title}
                onBlur={() => setFieldTouched("Title")}
                ErrorVisibility={touched.Title === true}
              />
              <TextInput
                placeholder="Category"
                onChangeText={handleChange("Category")}
                Error={errors.Category}
                defaultValue={route.params.Category}
                onBlur={() => setFieldTouched("Category")}
                ErrorVisibility={touched.Category === true}
              />
              <TextInput
                placeholder="Description"
                onChangeText={handleChange("Description")}
                Error={errors.Description}
                defaultValue={route.params.Description}
                multiline={true}
                onBlur={() => setFieldTouched("Description")}
                ErrorVisibility={touched.Description === true}
              />
              <TextInput
                placeholder="Stock"
                onChangeText={handleChange("Stock")}
                Error={errors.Stock}
                defaultValue={route.params.Stock}
                onBlur={() => setFieldTouched("Stock")}
                ErrorVisibility={touched.Stock === true}
              />
              <TextInput
                placeholder="Price"
                onChangeText={handleChange("Price")}
                Error={errors.Price}
                defaultValue={route.params.Price}
                onBlur={() => setFieldTouched("Price")}
                ErrorVisibility={touched.Price === true}
              />
              <TextInput
                placeholder="Highlights (optional)"
                onChangeText={handleChange("Highlights")}
                Error={errors.Highlights}
                defaultValue={route.params.Highlights}
                multiline={true}
                onBlur={() => setFieldTouched("Highlights")}
                ErrorVisibility={touched.Highlights === true}
              />

              <AppText Title="Color Variants" size={20} />
              <View style={styles.Colors}>
                <FlatList
                  data={PickedColors}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={RenderColorCard}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={PickColorBTN}
                />
              </View>

              <AppText Title="Images/Videos" size={20} />
              <View style={styles.Files}>
                <FlatList
                  data={Picked}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={RenderFileCard}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1 }}
                  ListFooterComponentStyle={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                  ListFooterComponent={PickFilesBTN}
                />
              </View>

              <View style={{ flexDirection: "row" }}>
                <AppButton
                  Title="Update"
                  color="white"
                  onPress={handleSubmit}
                  backgroundColor={ColorPallete.primary}
                  style={styles.BTN}
                />
                <AppButton
                  Title="Cancel"
                  style={styles.BTN}
                  onPress={() => navigation.goBack()}
                />
              </View>

              {modalVisible ? (
                <ColorPicker
                  modalVisible={modalVisible}
                  showModal={() => showModal()}
                  hideModal={() => hideModal()}
                  pick={(data) => PickColor(data)}
                />
              ) : null}
            </>
          )}
        </Formik>
      </View>
    </ScrollContainer>
  );
}

export default NewProduct;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    paddingBottom: 50,
  },
  BTN: {
    borderRadius: 8,
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  Files: {
    padding: 10,
    paddingLeft: 20,
    flexDirection: "row",
  },
  AddFileBTN: {
    width: 45,
    height: 45,
    borderRadius: 40,
    backgroundColor: ColorPallete.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  Colors: {
    width: "100%",
    height: "auto",
    paddingLeft: 10,
    paddingTop: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  ColorBTNAdding: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
