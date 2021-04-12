import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

function Card({ children, style, backgroundColor, borderColor }) {
  const { dark, colors } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.background,
          borderColor: borderColor ? borderColor : colors.text,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({});
