import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { Formik } from "formik";
import { Appearance } from "react-native-appearance";
import * as Google from "expo-google-app-auth";

import AppText from "../components/AppText";
import API from "../api/API";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";
import CheckBox from "../components/CheckBox";
import ColorPallete from "../config/ColorPallete";
import Icon from "../components/Icon";
import LoginSchema from "../schema/LoginSchema";
import ScrollContainer from "../components/ScrollContainer";
import Toast from "../components/Toast";
import TextInput from "../components/TextInput";
import AppConfiguration from "../config/AppConfiguration";

const ValidationSchema = LoginSchema.LoginScehma();

const InitialValues = LoginSchema.InitialValues;

function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const authContext = useContext(AuthContext);
  const [Keep, SetKeep] = useState(false);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const Login = async (values) => {
    try {
      values.Mode = Appearance.getColorScheme();
      SetLoading(true);
      const response = await API.Login(values);
      if (response.ok) {
        if (values.RememberMe === true) {
          AuthStorage.storeToken(response.data.token);
        }
        AuthStorage.storeToken(values.Mode, "ModeToken");
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

  const LoginWithGoogle = async () => {
    SetLoading(true);
    try {
      const result = await Google.logInAsync({
        androidClientId: AppConfiguration.DevClientID,
        androidStandaloneAppClientId: AppConfiguration.ClientID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        let Data = {
          Email: result.user.email,
          RememberMe: true,
          Mode: Appearance.getColorScheme(),
        };
        const response = await API.LoginWithGoogle(Data);
        if (response.ok) {
          AuthStorage.storeToken(response.data.token);
          AuthStorage.storeToken(Data.Mode, "ModeToken");
          authContext.SetUser(response.data.User);
          navigation.popToTop();
        } else {
          SetLoading(false);
          Toast.show(response.data, "danger");
        }
      } else {
        SetLoading(false);
      }
    } catch (e) {
      SetLoading(false);
      Toast.show("Server Error", "danger");
    }
  };

  return (
    <ScrollContainer>
      <View style={styles.UpperBox}>
        <AppText
          Title="Welcome to EasyShop!"
          size={24}
          color={"white"}
          family={"MuliBold"}
        />
      </View>
      <View style={styles.LowerBox}>
        <AppText
          Title="Login to continue.."
          style={styles.LoginHeading}
          size={20}
        />

        <Formik
          initialValues={InitialValues}
          onSubmit={(values) => Login(values)}
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
                label="Email/Phone"
                onChangeText={handleChange("Email")}
                Error={errors.Email}
                keyboardType="email-address"
                onBlur={() => setFieldTouched("Email")}
                ErrorVisibility={touched.Email === true ? true : false}
              />

              <TextInput
                label="Password"
                secureTextEntry={true}
                onChangeText={handleChange("Password")}
                Error={errors.Password}
                onBlur={() => setFieldTouched("Password")}
                ErrorVisibility={touched.Password === true}
              />

              <CheckBox
                Text="Remember Me"
                OnPress={() => {
                  SetKeep(!Keep);
                  setFieldValue("RememberMe", !values.RememberMe);
                }}
                checked={Keep}
              />

              <AppText
                Title="Forgot Password?"
                size={15}
                family="Inter"
                weight="bold"
                style={{ alignSelf: "flex-end" }}
                onPress={() => navigation.navigate("ForgotPassword")}
              />

              <View style={styles.LoginBTN}>
                {Loading ? (
                  <ActivityIndicator color={colors.primary} size={30} />
                ) : (
                  <Icon
                    Name="AntDesign"
                    IconName="arrowright"
                    size={24}
                    color={colors.text}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </>
          )}
        </Formik>

        <AppText
          Title="Or Continue using"
          size={18}
          family="Inter"
          weight="bold"
          style={{ alignSelf: "center", marginTop: 40, marginBottom: 40 }}
        />
      </View>
      <View style={styles.SocialMedia}>
        <TouchableOpacity onPress={() => LoginWithGoogle()}>
          <View style={styles.SocialBTNS}>
            <Image
              source={require("../assets/Logos/Google.png")}
              style={styles.GoogleBTN}
            />
          </View>
        </TouchableOpacity>
      </View>
      <AppText
        Header="Don't Have An Account? "
        Title=" Register"
        size={18}
        family="Inter"
        weight="bold"
        color="dodgerblue"
        onPress={() => navigation.navigate("RegisterScreen")}
        style={{ alignSelf: "center", marginTop: 15 }}
      />
    </ScrollContainer>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  UpperBox: {
    width: "100%",
    height: "auto",
    padding: 20,
    justifyContent: "center",
    backgroundColor: ColorPallete.primary,
  },
  LowerBox: { paddingLeft: 15, paddingRight: 15 },
  LoginBTN: {
    width: 60,
    height: 60,
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  SocialMedia: {
    flexDirection: "row",
    width: "60%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  SocialBTNS: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "dodgerblue",
    borderWidth: StyleSheet.hairlineWidth,
    width: 60,
    alignSelf: "center",
    height: 60,
    marginBottom: 20,
    borderRadius: 50,
  },
  GoogleBTN: {
    width: 50,
    height: 50,
  },
  LoginHeading: { alignSelf: "center", marginTop: 40, marginBottom: 20 },
});
