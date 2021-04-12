import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";

import AddressSchema from "../schema/AddressSchema";
import AppButton from "../components/AppButton";
import API from "../api/API";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import AppConfiguration from "../config/AppConfiguration";
import PhoneInputField from "../components/PhoneInputField";
import Picker from "../components/Picker";
import RadioButton from "../components/RadioButton";
import ScrollContainer from "../components/ScrollContainer";
import TextInput from "../components/TextInput";
import Toast from "../components/Toast";

const States = AddressSchema.States;
const key = AppConfiguration.JWT_Key;

const ValidationSchema = AddressSchema.AddressSchema();

const InitialValues = AddressSchema.InitialValues;

function NewAddress({ navigation }) {
  const { colors } = useTheme();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    return () => {};
  }, []);

  const AddAddress = async (values) => {
    try {
      values.Phone = values.FormattedPhone;
      let Data = {
        ...values,
        ...{ OwnerID: authContext.User._id },
      };
      const response = await API.NewAddress(Data);
      if (response.ok) {
        Toast.show("Address Updated", "success");
        navigation.goBack();
      } else {
        Toast.show("Server Error", "danger");
      }
    } catch (error) {
      Toast.show("SERVER Error", "danger");
    }
  };

  return (
    <ScrollContainer style={styles.container}>
      <Formik
        initialValues={InitialValues}
        onSubmit={(values) => AddAddress(values)}
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
              placeholder="Name"
              onChangeText={handleChange("Name")}
              Error={errors.Name}
              onBlur={() => setFieldTouched("Name")}
              ErrorVisibility={touched.Name === true ? true : false}
            />

            <PhoneInputField
              onChangeText={handleChange("Phone")}
              onChangeFormattedText={handleChange("FormattedPhone")}
              setFieldTouched={() => setFieldTouched("Phone")}
              Error={errors.Phone}
              ErrorVisibility={touched.Phone === true ? true : false}
            />

            <TextInput
              placeholder="Pincode"
              onChangeText={handleChange("Pincode")}
              keyboardType="number-pad"
              Error={errors.Pincode}
              onBlur={() => setFieldTouched("Pincode")}
              ErrorVisibility={touched.Pincode === true ? true : false}
            />

            <TextInput
              placeholder="Address (Area and Street)"
              onChangeText={handleChange("Address")}
              multiline={true}
              Error={errors.Address}
              onBlur={() => setFieldTouched("Address")}
              ErrorVisibility={touched.Address === true ? true : false}
            />

            <TextInput
              placeholder="Locality (optional)"
              onChangeText={handleChange("Locality")}
            />

            <TextInput
              placeholder="City"
              onChangeText={handleChange("City")}
              Error={errors.City}
              onBlur={() => setFieldTouched("City")}
              ErrorVisibility={touched.City === true ? true : false}
            />

            <View>
              <AppText
                Title="State"
                size={18}
                family="MuliBold"
                style={{ marginLeft: 5, marginBottom: 5 }}
              />
              <Picker
                data={States}
                placeholder="Select State"
                selectedValue={values.State}
                onValueChange={handleChange("State")}
              />
            </View>

            <View>
              <AppText
                Title="Address Type"
                size={18}
                family="MuliBold"
                style={{ marginTop: 20, marginLeft: 10 }}
              />
              <View style={styles.AddressType}>
                <RadioButton
                  Selected={values.AddressType === "HOME"}
                  Name="HOME"
                  onPress={() => setFieldValue("AddressType", "HOME")}
                />
                <RadioButton
                  Selected={values.AddressType === "WORK"}
                  Name="WORK"
                  onPress={() => setFieldValue("AddressType", "WORK")}
                />
              </View>
              {touched.AddressType === true && errors.AddressType ? (
                <AppText
                  Title="Address Type is Required"
                  color="red"
                  style={{ marginLeft: 10, marginTop: 5 }}
                />
              ) : null}
            </View>

            <View style={styles.BTNS}>
              <AppButton
                Title="Save"
                color="white"
                backgroundColor={colors.primary}
                style={{ elevation: 5, borderRadius: 8, marginRight: 10 }}
                onPress={handleSubmit}
              />
              <AppButton
                Title="Cancel"
                style={{
                  borderColor: colors.text,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderRadius: 8,
                }}
                onPress={() => navigation.goBack()}
              />
            </View>
          </>
        )}
      </Formik>
    </ScrollContainer>
  );
}

export default NewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  BTNS: {
    flexDirection: "row",
    marginTop: 20,
    padding: 5,
    paddingBottom: 50,
  },
  AddressType: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
