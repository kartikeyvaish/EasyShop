import { useContext, useEffect, useState } from "react";
import { Formik } from "formik";

import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Box from "../components/Box";
import Configuration from "../config/Configuration";
import RegisterSchema from "../schema/RegisterSchema";
import PasswordInput from "../components/PasswordInput";
import PhoneInput from "../components/PhoneInput";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { toast } from "react-toastify";
import CheckBoxDiv from "../components/CheckBoxDiv";
import SingleContainer from "../components/SingleContainer";
import AuthContext from "../auth/context";
import API from "../api/API";

const ValidationSchema = RegisterSchema.RegisterSchema();
const InitialValues = RegisterSchema.InitialValues;

function RegisterScreen({ history }) {
  const [Loading, SetLoading] = useState(false);
  const [Terms, SetTerms] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = "EasyShop | Register";
    if (authContext.User !== null) {
      history.replace("/not-found-404");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {};
  }, []);

  const Register = async (values) => {
    let FormattedPhone = values.Phone.replace(/-|\s/g, "");
    values.Phone = FormattedPhone;
    console.log(values);
    if (Terms === false) {
      toast.warning("Accept Terms and Conditons");
    } else {
      SetLoading(true);
      try {
        const response = await API.Register(values);
        if (response.ok) {
          SetLoading(false);
          localStorage.setItem("AuthToken", response.data.token);
          authContext.SetUser(response.data.User);
          history.replace("/");
          toast.success("Registered Successfully");
        } else {
          toast.error(response.data);
          SetLoading(false);
        }
      } catch (error) {
        toast.error("Server Error");
        SetLoading(false);
      }
    }
  };

  return (
    <SingleContainer
      containerStyle={styles.container}
      boxStyle={styles.loginBox}
      Loading={Loading}
    >
      <div>
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
        <Text text="Create An Account" marginTop={10} marginBottom={20} />

        <Formik
          initialValues={InitialValues}
          onSubmit={(values) => Register(values)}
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
                label="Name"
                error={errors.Name}
                onChange={handleChange("Name")}
                onBlur={() => setFieldTouched("Name")}
                ErrorVisibility={touched.Name === true ? true : false}
              />

              <TextInput
                label="Email"
                error={errors.Email}
                onChange={handleChange("Email")}
                onBlur={() => setFieldTouched("Email")}
                ErrorVisibility={touched.Email === true ? true : false}
              />

              <PhoneInput
                error={errors.Phone}
                onChange={handleChange("Phone")}
                onBlur={() => setFieldTouched("Phone")}
                ErrorVisibility={touched.Phone === true ? true : false}
              />

              <PasswordInput
                error={errors.Password}
                onChange={handleChange("Password")}
                onBlur={() => setFieldTouched("Password")}
                ErrorVisibility={touched.Password === true ? true : false}
              />

              <PasswordInput
                error={errors.ConfirmPassword}
                onChange={handleChange("ConfirmPassword")}
                onBlur={() => setFieldTouched("ConfirmPassword")}
                ErrorVisibility={
                  touched.ConfirmPassword === true ? true : false
                }
              />

              <CheckBoxDiv
                onChange={() => SetTerms(!Terms)}
                marginBottom={8}
                marginTop={8}
              />

              <Button
                Title="Register"
                onClick={handleSubmit}
                Loading={Loading}
                marginTop={10}
              />
            </>
          )}
        </Formik>
      </div>
    </SingleContainer>
  );
}

export default RegisterScreen;

const styles = {
  container: {
    alignItems: "center",
    paddingTop: 20,
  },
  loginBox: {
    width: "90%",
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
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
};
