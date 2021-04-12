import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";

function RoundButton({
  onPress,
  style,
  Name,
  IconName,
  color = "white",
  backgroundColor = ColorPallete.primary,
  size = 24,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.AddBTN, style, { backgroundColor: backgroundColor }]}
    >
      <Icon Name={Name} IconName={IconName} size={size} color={color} />
    </TouchableOpacity>
  );
}

export default RoundButton;

const styles = StyleSheet.create({
  AddBTN: {
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
