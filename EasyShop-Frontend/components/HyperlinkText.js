import React from "react";
import { StyleSheet, Text } from "react-native";

function HyperlinkText({
  Title,
  onPress,
  size = 12,
  color = "dodgerblue",
  family = "Inter",
}) {
  return (
    <>
      <Text
        style={{
          color: color,
          fontSize: size,
          fontFamily: family,
          textDecorationLine: "underline",
        }}
        onPress={onPress}
      >
        {Title}
      </Text>
    </>
  );
}

export default HyperlinkText;

const styles = StyleSheet.create({
  container: {},
});
