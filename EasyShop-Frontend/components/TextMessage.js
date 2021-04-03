import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";

function TextMessage({ Message, Time }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.MessageStyling} Title={Message} size={12} />
      <View style={styles.TimeBox}>
        <AppText Title={Time} size={11} color="grey" />
      </View>
    </View>
  );
}

export default TextMessage;

const styles = StyleSheet.create({
  container: {
    minWidth: "25%",
    padding: 10,
    maxWidth: "80%",
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  TimeBox: {
    width: "auto",
    height: "auto",
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  MessageStyling: {
    fontWeight: "normal",
    fontSize: 16,
    paddingBottom: 14,
  },
});
