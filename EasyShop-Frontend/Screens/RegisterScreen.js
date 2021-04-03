import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Formik } from "formik";
import { Appearance } from "react-native-appearance";

import API from "../api/API";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";
import ColorPallete from "../config/ColorPallete";
import PhoneInputField from "../components/PhoneInputField";
import RegisterSchema from "../schema/RegisterSchema";
import ScrollContainer from "../components/ScrollContainer";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";
import TermsCheckBox from "../components/TermsCheckBox";

const ValidationSchema = RegisterSchema.RegisterSchema();

const InitialValues = RegisterSchema.InitialValues;

function RegisterScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [TermsAccepted, SetTermsAccepted] = useState(false);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const Register = async (values) => {
    SetLoading(true);
    try {
      values.Phone = values.FormattedPhone;
      const response = await API.Register(values);
      if (response.ok) {
        SetLoading(false);
        AuthStorage.storeToken(response.data.token);
        AuthStorage.storeToken(Appearance.getColorScheme(), "ModeToken");
        authContext.SetUser(response.data.User);
        navigation.popToTop();
      } else {
        Toast.show(response.data, "danger");
        SetLoading(false);
      }
    } catch (error) {
      SetLoading(false);
    }
  };

  return (
    <ScrollContainer>
      <View style={styles.UpperBox}>
        <AppText
          Title="Create an Account"
          size={24}
          color={"white"}
          family={"MuliBold"}
        />
      </View>

      <View style={styles.container}>
        <Formik
          initialValues={InitialValues}
          onSubmit={(values) => {
            if (TermsAccepted === true) {
              Register(values);
            } else {
              Toast.show("Please accept Terms & Conditions!", "danger");
            }
          }}
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
                placeholder="Name"
                onChangeText={handleChange("Name")}
                Error={errors.Name}
                onBlur={() => setFieldTouched("Name")}
                ErrorVisibility={touched.Name === true}
              />

              <TextInput
                placeholder="Email"
                onChangeText={handleChange("Email")}
                Error={errors.Email}
                keyboardType="email-address"
                onBlur={() => setFieldTouched("Email")}
                ErrorVisibility={touched.Email === true}
              />

              <PhoneInputField
                onChangeText={handleChange("Phone")}
                onChangeFormattedText={handleChange("FormattedPhone")}
                setFieldTouched={() => setFieldTouched("Phone")}
                Error={errors.Phone}
                ErrorVisibility={touched.Phone === true}
              />

              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={handleChange("Password")}
                Error={errors.Password}
                onBlur={() => setFieldTouched("Password")}
                ErrorVisibility={touched.Password === true}
              />

              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={handleChange("ConfirmPassword")}
                Error={errors.ConfirmPassword}
                onBlur={() => setFieldTouched("ConfirmPassword")}
                ErrorVisibility={touched.ConfirmPassword === true}
              />

              <TermsCheckBox
                OnPress={() => SetTermsAccepted(!TermsAccepted)}
                checked={TermsAccepted}
              />

              <AppButton
                Title="Register"
                backgroundColor={ColorPallete.primary}
                style={styles.RegisterBTN}
                onPress={Loading ? null : handleSubmit}
                color="white"
                Loading={Loading}
              />
            </>
          )}
        </Formik>

        <AppText
          Header="Already Have An Account? "
          Title=" Login"
          size={18}
          family="Inter"
          weight="bold"
          color="dodgerblue"
          onPress={() => navigation.navigate("LoginScreen")}
          style={{ alignSelf: "center", marginTop: 20 }}
        />
      </View>
    </ScrollContainer>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    paddingTop: 20,
  },
  RegisterLogo: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: StatusBar.currentHeight + 20,
    left: 20,
  },
  Name: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    height: "auto",
  },
  PhoneNumberBox: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 2,
  },
  UpperBox: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    backgroundColor: ColorPallete.primary,
    padding: 20,
  },
  RegisterBTN: {
    width: "100%",
    height: 60,
    marginTop: 60,
    borderRadius: 10,
  },
  Terms: {
    color: "grey",
    fontSize: 12,
    fontFamily: "Inter",
  },
});
