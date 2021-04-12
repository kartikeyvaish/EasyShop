import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";

import API from "../api/API";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ColorPallete from "../config/ColorPallete";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";
import EmailVerifySchema from "../schema/EmailVerifySchema";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";
import Container from "../components/Container";
import Lottie from "../components/Lottie";

const ValidationSchema = EmailVerifySchema.EmailVerifySchema();
const InitialValues = EmailVerifySchema.InitialValues;

function EmailVerification({ navigation }) {
  const [CodeSent, SetCodeSent] = useState(false);
  const [Verified, SetVerified] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Status, SetStatus] = useState("Resend Code");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    return () => {};
  }, []);

  const GetUserData = async () => {
    try {
      const response = await API.GetUserData({
        _id: authContext.User._id,
      });
      if (response.ok) {
        if (authContext.User.RememberMe === true) {
          AuthStorage.storeToken(response.data.token);
        }
        authContext.SetUser(response.data.User);
        SetLoading(false);
        SetVerified(true);
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("Server Error");
    }
  };

  const Verify = async (values) => {
    SetLoading(true);
    values.Email = authContext.User.Email;
    try {
      const response = await API.VerifyEmail(values);
      if (response.ok) {
        GetUserData();
      } else {
        SetLoading(false);
        Toast.show(response.data);
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("Server Error");
    }
  };

  const SendCodeAgain = async () => {
    SetLoading(true);
    SetStatus("Sending Code Again...");
    try {
      const response = await API.SendEmailCode({
        Email: authContext.User.Email,
      });
      if (response.ok) {
        SetStatus("Resend Code");
        SetLoading(false);
      } else {
        SetStatus("Resend Code");
        SetLoading(false);
        Toast.show("Server Error");
      }
    } catch (error) {
      SetStatus("Resend Code");
      SetLoading(false);
      Toast.show("Server Error");
    }
  };

  const SendCode = async () => {
    SetLoading(true);
    try {
      const response = await API.SendEmailCode({
        Email: authContext.User.Email,
      });
      if (response.ok) {
        SetCodeSent(true);
        SetLoading(false);
      } else {
        SetLoading(false);
        Toast.show("Server Error");
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("Server Error");
    }
  };

  return (
    <Container style={styles.container}>
      {Verified === false ? (
        <Formik
          initialValues={InitialValues}
          onSubmit={(values) => Verify(values)}
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
                label="Email/Phone"
                disabled={true}
                value={authContext.User.Email}
              />

              {CodeSent === false ? (
                <AppButton
                  Title="Send OTP"
                  color="white"
                  style={{ borderRadius: 8, maxHeight: 50 }}
                  Loading={Loading}
                  onPress={Loading ? null : () => SendCode()}
                  backgroundColor={ColorPallete.primary}
                />
              ) : (
                <>
                  <AppText
                    Title={Status}
                    weight="bold"
                    color={ColorPallete.primary}
                    onPress={Loading ? null : () => SendCodeAgain()}
                  />
                  <TextInput
                    label="6-digit Code"
                    style={{ marginTop: 10 }}
                    keyboardType="numeric"
                    onChangeText={handleChange("OTP")}
                    Error={errors.OTP}
                    onBlur={() => setFieldTouched("OTP")}
                    ErrorVisibility={touched.OTP === true ? true : false}
                  />
                  <AppButton
                    Title="Verify"
                    color="white"
                    style={{ borderRadius: 8, maxHeight: 50 }}
                    Loading={Loading}
                    onPress={Loading ? null : handleSubmit}
                    backgroundColor={ColorPallete.primary}
                  />
                </>
              )}
            </>
          )}
        </Formik>
      ) : (
        <View style={styles.ConfirmBox}>
          <Lottie
            loop={false}
            source={require("../assets/animations/Done.json")}
            onAnimationFinish={() => navigation.goBack()}
          />
          <AppText
            Title="Your Email has been verified Successfully!"
            size={17}
          />
        </View>
      )}
    </Container>
  );
}

export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  ConfirmBox: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});
