import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Formik } from "formik";

import AppButton from "../components/AppButton";
import API from "../api/API";
import AuthContext from "../auth/context";
import Container from "../components/Container";
import ChangePassword from "../schema/ChangePassword";
import ColorPallete from "../config/ColorPallete";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";

const ValidationSchema = ChangePassword.ChangePassword();

const InitialValues = ChangePassword.InitialValues;

function ChangePasswordScreen({ navigation }) {
  const [Loading, SetLoading] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    return () => {};
  }, []);

  const Change = async (values) => {
    SetLoading(true);
    try {
      values._id = authContext.User._id;
      const response = await API.ChangePassword(values);
      if (response.ok) {
        Toast.show("Password Changed Successfully", "success");
        navigation.replace("HomeScreen");
      } else {
        Toast.show(response.data, "danger");
        SetLoading(false);
      }
    } catch (error) {
      Toast.show("Some Error Occured", "danger");
      SetLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <Formik
        initialValues={InitialValues}
        onSubmit={(values) => Change(values)}
        validationSchema={ValidationSchema}
      >
        {({ handleChange, setFieldTouched, handleSubmit, errors, touched }) => (
          <>
            <TextInput
              placeholder="Current Password"
              secureTextEntry={true}
              onChangeText={handleChange("CurrentPassword")}
              Error={errors.CurrentPassword}
              onBlur={() => setFieldTouched("CurrentPassword")}
              ErrorVisibility={touched.CurrentPassword === true}
            />
            <TextInput
              placeholder="New Password"
              secureTextEntry={true}
              onChangeText={handleChange("NewPassword")}
              Error={errors.NewPassword}
              onBlur={() => setFieldTouched("NewPassword")}
              ErrorVisibility={touched.NewPassword === true}
            />
            <TextInput
              placeholder="Confirm New Password"
              secureTextEntry={true}
              onChangeText={handleChange("ConfirmPassword")}
              Error={errors.ConfirmPassword}
              onBlur={() => setFieldTouched("ConfirmPassword")}
              ErrorVisibility={touched.ConfirmPassword === true}
            />

            <AppButton
              Title="Change Password"
              color="white"
              backgroundColor={ColorPallete.primary}
              onPress={Loading ? null : handleSubmit}
              style={styles.BTN}
              Loading={Loading}
            />
          </>
        )}
      </Formik>
    </Container>
  );
}

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  BTN: {
    width: "100%",
    elevation: 5,
    borderRadius: 8,
    marginRight: 10,
    maxHeight: 50,
    marginTop: 20,
  },
});
