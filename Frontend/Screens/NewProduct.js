import React, { useContext, useEffect, useState } from "react";
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
import AuthContext from "../auth/context";
import ColorCard from "../components/ColorCard";
import ColorPallete from "../config/ColorPallete";
import ColorPicker from "../components/ColorPicker";
import FileCard from "../components/FileCard";
import HelperFunctions from "../config/HelperFunctions";
import Icon from "../components/Icon";
import NewProductSchema from "../schema/NewProductSchema";
import ScrollContainer from "../components/ScrollContainer";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";
import TopBar from "../components/TopBar";

const ValidationSchema = NewProductSchema.NewProductSchema();

const InitialValues = NewProductSchema.InitialValues;

function NewProduct({ navigation }) {
  const [Picked, SetPicked] = useState([]);
  const [PickedColors, SetPickedColors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [MediaPerm, SetMediaPerm] = useState(false);
  const [CameraPerm, SetCameraPerm] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  useEffect(() => {
    GetPermission();
  }, []);

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
        Result.push(result);
        SetPicked(Result);
      }
    }
  };

  const RemoveFile = (_id) => {
    let Filter = Picked.filter((c) => c._id !== _id);
    SetPicked(Filter);
  };

  const RenderFileCard = ({ item }) => (
    <FileCard
      File={item.uri}
      Type={item.type}
      onPress={() => RemoveFile(item._id)}
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

  const AddProduct = async (values) => {
    values.Highlights = values.Highlights.trim();
    values.Title = values.Title.trim();
    values.Category = values.Category.trim();
    values.Description = values.Description.trim();
    values.Stock = values.Stock.trim();
    values.Price = values.Price.trim();
    SetLoading(true);
    try {
      if (Picked.length === 0) {
        SetLoading(false);
        Toast.show("Atleast one Image is required");
      } else {
        const Check = Picked.filter((c) => c.type === "image");
        if (Check.length === 0) {
          SetLoading(false);
          Toast.show("Atleast one Image is required");
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
          for (let i = 0; i < Picked.length; i++) {
            form.append("Files[]", {
              name: Picked[i].name,
              uri: Picked[i].uri,
              type: Picked[i].type + "/" + Picked[i].name.split(".").pop(),
            });
          }
          const response = await API.AddProduct(form);
          if (response.ok) {
            navigation.goBack();
            Toast.show("Product Added Successfully", "success");
          } else {
            SetLoading(false);
            Toast.show("Server Error");
          }
        }
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("Server Error");
    }
  };

  return (
    <ScrollContainer Loading={Loading} LoadingText={"Adding Product.."}>
      <TopBar Name="Add A Product" onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Formik
          initialValues={InitialValues}
          onSubmit={(values) => AddProduct(values)}
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
                onBlur={() => setFieldTouched("Title")}
                ErrorVisibility={touched.Title === true}
              />
              <TextInput
                placeholder="Category"
                onChangeText={handleChange("Category")}
                Error={errors.Category}
                onBlur={() => setFieldTouched("Category")}
                ErrorVisibility={touched.Category === true}
              />
              <TextInput
                placeholder="Description"
                onChangeText={handleChange("Description")}
                Error={errors.Description}
                multiline={true}
                onBlur={() => setFieldTouched("Description")}
                ErrorVisibility={touched.Description === true}
              />
              <TextInput
                placeholder="Stock"
                onChangeText={handleChange("Stock")}
                Error={errors.Stock}
                onBlur={() => setFieldTouched("Stock")}
                ErrorVisibility={touched.Stock === true}
              />
              <TextInput
                placeholder="Price"
                onChangeText={handleChange("Price")}
                Error={errors.Price}
                onBlur={() => setFieldTouched("Price")}
                ErrorVisibility={touched.Price === true}
              />
              <TextInput
                placeholder="Highlights (optional)"
                onChangeText={handleChange("Highlights")}
                Error={errors.Highlights}
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
                  Title="Add"
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
