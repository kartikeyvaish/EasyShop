import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@react-navigation/native";

function AppTextInput({
  Style,
  ViewStyle,
  placeholder,
  keyboardType,
  onChangeText,
  secureTextEntry,
  multiline,
  prefillValue,
  Error,
  disabled,
  NormalText,
  onBlur,
  ErrorVisibility,
  maxLength,
}) {
  const [ShowPassword, SetShowPassword] = useState(false);
  const { dark, colors } = useTheme();

  const HiddenRender = () => (
    <Ionicons
      name={ShowPassword === false ? "md-eye" : "md-eye-off"}
      size={24}
      color={colors.text}
      style={{ paddingTop: 10 }}
    />
  );

  const Themes = {
    colors: {
      primary: colors.primary,
      background: colors.background,
      placeholder: colors.text,
      text: colors.text,
      underlineColor: colors.primary,
    },
  };

  return (
    <View style={[{ flex: 1 }, ViewStyle]}>
      <TextInput
        disabled={disabled}
        label={placeholder}
        right={
          secureTextEntry === true ? (
            <TextInput.Icon
              name={() => HiddenRender()}
              onPress={() => SetShowPassword(!ShowPassword)}
            />
          ) : null
        }
        onChangeText={onChangeText}
        mode={"outlined"}
        maxLength={maxLength}
        keyboardType={keyboardType}
        dense={true}
        secureTextEntry={secureTextEntry ? !ShowPassword : secureTextEntry}
        onBlur={onBlur}
        defaultValue={prefillValue ? prefillValue : ""}
        multiline={multiline}
        placeholderTextColor={colors.text}
        theme={Themes}
        style={[styles.TextInputBox, Style]}
        textAlignVertical="top"
      />

      {Error ? (
        <HelperText type="error" visible={ErrorVisibility} padding="none">
          {Error}
        </HelperText>
      ) : null}

      {NormalText ? <Text style={styles.NormalText}>{NormalText}</Text> : null}
    </View>
  );
}

export default AppTextInput;

const styles = StyleSheet.create({
  TextInputBox: {
    fontSize: 16,
    maxHeight: 150,
    height: 40,
  },
  NormalText: {
    color: "grey",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});
