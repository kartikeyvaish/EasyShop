import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { TextInput as AppTextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import AppText from "./AppText";
import ColorPallete from "../config/ColorPallete";

function TextInput(props) {
  const { colors } = useTheme();
  const [ShowPassword, SetShowPassword] = useState(false);

  const Themes = {
    colors: {
      ...colors,
      underlineColor: colors.primary,
      placeholder: colors.text,
    },
  };

  let { Error, ErrorVisibility } = props;

  const HiddenRender = () => (
    <Ionicons
      name={ShowPassword === false ? "md-eye" : "md-eye-off"}
      size={24}
      color={colors.text}
      style={{ paddingTop: 0 }}
    />
  );

  return (
    <View
      style={{
        marginBottom: ErrorVisibility === true && Error ? 5 : 8,
        ...props.style,
      }}
    >
      <AppTextInput
        {...props}
        mode="outlined"
        style={styles.TextInput}
        theme={Themes}
        dense={props.multiline === true ? false : true}
        placeholderTextColor="grey"
        textAlignVertical="top"
        secureTextEntry={
          props.secureTextEntry ? !ShowPassword : props.secureTextEntry
        }
        right={
          props.secureTextEntry && props.secureTextEntry === true ? (
            <AppTextInput.Icon
              name={() => HiddenRender()}
              onPress={() => SetShowPassword(!ShowPassword)}
            />
          ) : null
        }
      />

      {ErrorVisibility === true && Error ? (
        <AppText
          Title={props.Error}
          size={13}
          color={ColorPallete.red}
          style={{ paddingLeft: 2, paddingTop: 2 }}
        />
      ) : null}

      {props.NormalText ? (
        <AppText
          Title={props.NormalText}
          size={12}
          style={{ paddingLeft: 2, paddingTop: 2 }}
          color={props.normalTextColor ? props.normalTextColor : null}
        />
      ) : null}
    </View>
  );
}

export default TextInput;

const styles = StyleSheet.create({
  TextInput: {
    fontSize: 18,
    maxHeight: 150,
  },
});
