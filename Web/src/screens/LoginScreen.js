import { useContext, useEffect, useState } from "react";
import { Formik } from "formik";

import API from "../api/API";
import Avatar from "../components/Avatar";
import { GoogleLogin } from "react-google-login";
import Button from "../components/Button";
import Box from "../components/Box";
import Checkbox from "../components/CheckBox";
import Container from "../components/Container";
import Configuration from "../config/Configuration";
import GoogleBTN from "../components/GoogleBTN";
import Link from "../components/Link";
import LoginSchema from "../schema/LoginSchema";
import PasswordInput from "../components/PasswordInput";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { toast } from "react-toastify";
import AuthContext from "../auth/context";

const ValidationSchema = LoginSchema.LoginScehma();
const InitialValues = LoginSchema.InitialValues;

function LoginScreen({ history }) {
  const [Loading, SetLoading] = useState(false);
  const [Keep, SetKeep] = useState(false);
  const { User, SetUser, Mode } = useContext(AuthContext);

  useEffect(() => {
    document.title = "EasyShop | Login";
    if (User !== null) {
      history.replace("/not-found-404");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {};
  }, []);

  const Login = async (values) => {
    SetLoading(true);
    try {
      values.Mode = Mode;
      const response = await API.Login(values);
      if (response.ok) {
        if (values.RememberMe === true) {
          localStorage.setItem("AuthToken", response.data.token);
        }
        SetUser(response.data.User);
        toast.success("Login Successfull");
        SetLoading(false);
        history.replace("/Home");
      } else {
        toast.error(response.data);
        SetLoading(false);
      }
    } catch (error) {
      toast.error("Some Error Occurred");
      SetLoading(false);
    }
  };

  const LoginWithGoogle = async (res) => {
    SetLoading(true);
    try {
      let Data = {
        Email: res.profileObj.email,
        RememberMe: true,
        Mode: Mode,
      };
      const response = await API.LoginWithGoogle(Data);
      if (response.ok) {
        localStorage.setItem("AuthToken", response.data.token);
        SetUser(response.data.User);
        toast.success("Login Successfull");
        SetLoading(false);
        history.replace("/Home");
      } else {
        SetLoading(false);
        toast.error(response.data);
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Server Error");
    }
  };

  return (
    <Container style={styles.container}>
      <div style={styles.loginBox}>
        <Box>
          <Avatar uri={Configuration.LogoURL} />
          <Text
            text="EasyShop"
            size={35}
            family="Mulish"
            weight="700"
            marginLeft={15}
          />
        </Box>
        <Text text="Login to Continue" marginTop={10} marginBottom={50} />

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
                error={errors.Email}
                onChange={handleChange("Email")}
                onBlur={() => setFieldTouched("Email")}
                ErrorVisibility={touched.Email === true ? true : false}
              />

              <PasswordInput
                error={errors.Password}
                onChange={handleChange("Password")}
                onBlur={() => setFieldTouched("Password")}
                ErrorVisibility={touched.Password === true}
              />

              <Link
                text="Forgot Password?"
                marginTop={-5}
                marginBottom={15}
                size={15}
                style={{ alignSelf: "flex-end" }}
              />

              <div style={styles.RememberMeOption}>
                <Checkbox
                  onChange={() => {
                    SetKeep(!Keep);
                    setFieldValue("RememberMe", !values.RememberMe);
                  }}
                />
                <Text text="Remember Me?" marginRight={10} />
              </div>

              <Button Title="Login" onClick={handleSubmit} Loading={Loading} />
            </>
          )}
        </Formik>

        <GoogleLogin
          clientId={Configuration.ClientID}
          render={(renderProps) => <GoogleBTN onClick={renderProps.onClick} />}
          buttonText="Login"
          onSuccess={LoginWithGoogle}
          onFailure={() => console.log("Failure")}
          cookiePolicy={"single_host_origin"}
        />

        <Box marginTop={30} marginBottom={30}>
          <Text text="Already have an Account?" marginRight={10} />
          <Link
            text="Register"
            marginTop={-3}
            onClick={() => history.push("/Register")}
          />
        </Box>
      </div>
    </Container>
  );
}

export default LoginScreen;

const styles = {
  container: {
    alignItems: "center",
    paddingTop: 50,
  },
  loginBox: {
    width: "100%",
    height: "auto",
    maxWidth: 500,
    maxHeight: 500,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  RememberMeOption: {
    display: "flex",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20,
  },
};
