import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";

import AppButton from "../components/AppButton";
import API from "../api/API";
import AppText from "../components/AppText";
import NewPasswordSchema from "../schema/NewPasswordSchema";
import ColorPallete from "../config/ColorPallete";
import Lottie from "../components/Lottie";
import ScrollContainer from "../components/ScrollContainer";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";

const ValidationSchema = NewPasswordSchema.NewPassword();

const InitialValues = NewPasswordSchema.InitialValues;

function NewPasswordScreen({ navigation, route }) {
  const [Loading, SetLoading] = useState(false);
  const [Verified, SetVerified] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const ResetPassword = async (values) => {
    values.Email = route.params.Email;
    SetLoading(true);
    try {
      const response = await API.ResetPassword(values);
      if (response.ok) {
        SetVerified(true);
      } else {
        Toast.show(response.data, "danger");
        SetLoading(false);
      }
    } catch (error) {
      Toast.show("Server Error", "danger");
      SetLoading(false);
    }
  };

  return (
    <ScrollContainer style={styles.container}>
      {Verified === false ? (
        <Formik
          initialValues={InitialValues}
          onSubmit={(values) => ResetPassword(values)}
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
                placeholder="Password"
                onChangeText={handleChange("Password")}
                secureTextEntry={true}
                Error={errors.Password}
                onBlur={() => setFieldTouched("Password")}
                ErrorVisibility={touched.Password === true}
              />

              <TextInput
                placeholder="Confirm Password"
                onChangeText={handleChange("ConfirmPassword")}
                secureTextEntry={true}
                Error={errors.ConfirmPassword}
                onBlur={() => setFieldTouched("ConfirmPassword")}
                ErrorVisibility={touched.ConfirmPassword === true}
              />

              <AppButton
                Title="Reset"
                color="white"
                backgroundColor={ColorPallete.primary}
                style={styles.BTN}
                Loading={Loading}
                onPress={Loading ? null : handleSubmit}
              />
            </>
          )}
        </Formik>
      ) : (
        <View style={styles.ConfirmBox}>
          <Lottie
            loop={false}
            source={require("../assets/animations/Done.json")}
            onAnimationFinish={() => navigation.popToTop()}
          />
          <AppText
            Title="Your Password has been changed Successfully!"
            size={17}
          />
        </View>
      )}
    </ScrollContainer>
  );
}

export default NewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  BTN: {
    borderRadius: 8,
  },
  ConfirmBox: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});
