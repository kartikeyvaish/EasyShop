import React from "react";
import { View, StyleSheet, Text } from "react-native";

import HelperFunctions from "../config/HelperFunctions";

function Badge({
  number,
  style,
  size,
  onPress,
  textColor = "white",
  backgroundColor = "#F56040",
}) {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: backgroundColor,
          width: size,
          height: size,
        },
      ]}
    >
      <Text onPress={onPress} style={{ color: textColor, fontWeight: "bold" }}>
        {HelperFunctions.abbreviateNumber(number)}
      </Text>
    </View>
  );
}

export default Badge;

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: "auto",
    padding: 4,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 40,
    maxHeight: 40,
  },
});
