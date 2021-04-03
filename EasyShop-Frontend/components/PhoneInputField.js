import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";

import AppText from "./AppText";

function PhoneInputField(props) {
  const { colors } = useTheme();

  return (
    <>
      <PhoneInput
        {...props}
        defaultCode="IN"
        layout="second"
        disableArrowIcon={true}
        containerStyle={[
          styles.PhoneNumberBox,
          {
            backgroundColor: colors.background,
            borderColor: colors.text,
            marginBottom:
              props.ErrorVisibility === true && props.Error ? 0 : 10,
          },
        ]}
        textInputStyle={{ color: colors.text }}
        textInputProps={{
          placeholderTextColor: "grey",
          maxLength: 10,
          onBlur: props.setFieldTouched,
        }}
        codeTextStyle={{ color: colors.text }}
        flagButtonStyle={{ backgroundColor: colors.background }}
        countryPickerButtonStyle={{
          backgroundColor: colors.background,
        }}
        textContainerStyle={{
          backgroundColor: colors.background,
        }}
      />

      {props.ErrorVisibility === true && props.Error ? (
        <AppText
          Title={props.Error}
          size={13}
          color="red"
          style={{ paddingLeft: 2, paddingTop: 2 }}
        />
      ) : null}
    </>
  );
}

export default PhoneInputField;

const styles = StyleSheet.create({
  PhoneNumberBox: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 2,
  },
});
