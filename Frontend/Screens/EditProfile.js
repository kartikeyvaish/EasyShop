import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import * as DocumentPicker from "expo-document-picker";

import API from "../api/API";
import AppButton from "../components/AppButton";
import AppConfiguration from "../config/AppConfiguration";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";
import ColorPallete from "../config/ColorPallete";
import EditProfileSchema from "../schema/EditProfile";
import Icon from "../components/Icon";
import ScrollContainer from "../components/ScrollContainer";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";

const BaseURL = AppConfiguration.BaseURL;

const ValidationSchema = EditProfileSchema.EditProfileSchema();

function EditProfile({ navigation }) {
  const authContext = useContext(AuthContext);
  const [Loading, SetLoading] = useState(false);
  const [DP, SetDP] = useState(BaseURL + authContext.User.ProfilePicture);
  const [ChangeDP, SetChangeDP] = useState(null);
  const { colors } = useTheme();

  const InitialValues = {
    Name: authContext.User.Name,
    Email: authContext.User.Email,
    Phone: authContext.User.Phone,
  };

  useEffect(() => {
    return () => {};
  }, []);

  const SaveProfile = async (values) => {
    SetLoading(true);
    try {
      const Data = {
        Edit: values,
        _id: authContext.User._id,
      };
      const response = await API.EditProfile(Data);
      if (response.ok) {
        SaveImage();
      } else {
        Toast.show(response.data);
        SetLoading(false);
      }
    } catch (error) {
      Toast.show("Server Error");
      SetLoading(false);
    }
  };

  const SaveImage = async () => {
    if (ChangeDP !== null) {
      const form = new FormData();
      form.append("_id", authContext.User._id);
      form.append("ProfilePicture", {
        name: "ProfilePicture.jpg",
        uri: DP,
        type: "image/jpg",
      });
      const response = await API.ChangeDP(form);
      if (response.ok) {
        GetUserData();
      } else {
        ToastAndroid.show("Error in Changing Profile Picture", 5000);
      }
    } else {
      GetUserData();
    }
  };

  const SelectImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    if (result.type !== "cancel") {
      SetDP(result.uri);
      SetChangeDP(result.uri);
    }
  };

  const GetUserData = async () => {
    try {
      const response = await API.GetUserData({
        _id: authContext.User._id,
      });
      if (response.ok) {
        AuthStorage.storeToken(response.data.token);
        authContext.SetUser(response.data.User);
        Toast.show("Profile Saved", "success");
        navigation.goBack();
      }
    } catch (error) {}
  };

  return (
    <ScrollContainer style={styles.container}>
      <View style={styles.ProfilePart}>
        <View>
          <Image style={styles.Image} source={{ uri: DP }} />
          <View style={styles.EditBTN}>
            <Icon
              Name={"MaterialIcons"}
              IconName={"edit"}
              size={20}
              color="black"
              onPress={() => SelectImage()}
            />
          </View>
        </View>
      </View>
      <Formik
        initialValues={InitialValues}
        onSubmit={(values) => SaveProfile(values)}
        validationSchema={ValidationSchema}
      >
        {({
          handleChange,
          setFieldTouched,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <>
            <View style={styles.InputBoxes}>
              <TextInput
                label="Name"
                onChangeText={handleChange("Name")}
                Error={errors.Name}
                defaultValue={values.Name}
                onBlur={() => setFieldTouched("Name")}
                ErrorVisibility={touched.Name === true ? true : false}
              />

              <TextInput
                label="Email"
                onChangeText={handleChange("Email")}
                disabled={authContext.User.Email_Verified === true}
                Error={errors.Email}
                defaultValue={values.Email}
                onBlur={() => setFieldTouched("Email")}
                ErrorVisibility={touched.Email === true ? true : false}
                NormalText={
                  authContext.User.Email_Verified === true
                    ? "Email is verified!"
                    : null
                }
                normalTextColor={"green"}
              />

              <TextInput
                label="Phone"
                onChangeText={handleChange("Phone")}
                keyboardType="number-pad"
                Error={errors.Phone}
                defaultValue={values.Phone.toString()}
                onBlur={() => setFieldTouched("Phone")}
                ErrorVisibility={touched.Phone === true ? true : false}
              />

              <AppButton
                Title="Save"
                backgroundColor={colors.primary}
                color="white"
                style={styles.SubmitBTN}
                Loading={Loading}
                onPress={Loading ? null : handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </ScrollContainer>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  ProfilePart: {
    width: "100%",
    height: "auto",
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPallete.primary,
  },
  container: {
    paddingTop: 0,
  },
  EditBTN: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 30,
  },
  SubmitBTN: {
    borderRadius: 8,
  },
  Image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  InputBoxes: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
});
