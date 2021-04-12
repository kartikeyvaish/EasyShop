import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";

import API from "../api/API";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ColorPallete from "../config/ColorPallete";
import ForgotPasswordSchema from "../schema/ForgotPasswordSchema";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";
import ScrollContainer from "../components/ScrollContainer";

const ValidationSchema = ForgotPasswordSchema.ForgotPassword();
const InitialValues = ForgotPasswordSchema.InitialValues;

function ForgotPassword({ navigation }) {
  const [CodeSent, SetCodeSent] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Status, SetStatus] = useState("Resend Code");

  useEffect(() => {
    return () => {};
  }, []);

  const SendCode = async (values) => {
    SetLoading(true);
    try {
      const response = await API.SendOTP(values);
      if (response.ok) {
        Toast.show(response.data, "success");
        SetLoading(false);
        SetCodeSent(true);
      } else {
        Toast.show(response.data, "danger");
        SetLoading(false);
      }
    } catch (error) {
      Toast.show("Server Error", "danger");
      SetLoading(false);
    }
  };

  const SendCodeAgain = async (values) => {
    SetStatus("Sending Code Again...");
    try {
      const response = await API.SendOTP(values);
      if (response.ok) {
        Toast.show(response.data, "success");
        SetStatus("Resend Code");
      } else {
        Toast.show(response.data, "danger");
        SetStatus("Resend Code");
      }
    } catch (error) {
      Toast.show("Server Error", "danger");
      SetStatus("Resend Code");
    }
  };

  const VerifyOTP = async (values) => {
    SetLoading(true);
    try {
      const response = await API.VerifyOTP(values);
      if (response.ok) {
        navigation.replace("NewPassword", values);
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
    <ScrollContainer style={{ paddingTop: 15 }}>
      <View style={styles.container}>
        <Formik
          initialValues={InitialValues}
          onSubmit={(values) => SendCode(values)}
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
              <TextInput
                label="Email/Phone"
                onChangeText={handleChange("Email")}
                Error={errors.Email}
                keyboardType="email-address"
                disabled={CodeSent}
                onBlur={() => setFieldTouched("Email")}
                ErrorVisibility={touched.Email === true ? true : false}
              />
              {CodeSent === false ? (
                <AppButton
                  Title="Send OTP"
                  color="white"
                  style={{ borderRadius: 8 }}
                  Loading={Loading}
                  onPress={Loading ? null : handleSubmit}
                  backgroundColor={ColorPallete.primary}
                />
              ) : (
                <>
                  <AppText
                    Title={Status}
                    weight="bold"
                    color={ColorPallete.primary}
                    onPress={() => SendCodeAgain(values)}
                  />
                  <TextInput
                    label="6-digit Code"
                    style={{ marginTop: 10 }}
                    onChangeText={handleChange("OTP")}
                    keyboardType="numeric"
                  />
                  <AppButton
                    Title="Verify"
                    color="white"
                    style={{ borderRadius: 8 }}
                    Loading={Loading}
                    onPress={Loading ? null : () => VerifyOTP(values)}
                    backgroundColor={ColorPallete.primary}
                  />
                </>
              )}
            </>
          )}
        </Formik>
      </View>
    </ScrollContainer>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingRight: 15,
    paddingLeft: 15,
    flex: 1,
  },
});
