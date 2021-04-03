import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { useTheme } from "@react-navigation/native";

function ActionSheet({ Height, children }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.ActionSheet,
        {
          bottom: Height,
        },
      ]}
    >
      <ScrollView style={[styles.InnerBox, {
    backgroundColor: colors.background}]}>{children}</ScrollView>
    </View>
  );
}

export default ActionSheet;

const styles = StyleSheet.create({
  ActionSheet: {
    width: "100%",
    height: "auto",
    minHeight: 100,
    position: "absolute",
  },
  InnerBox: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    maxHeight: 300,
    borderColor: "grey",
    borderRadius: 5,
  },
});
