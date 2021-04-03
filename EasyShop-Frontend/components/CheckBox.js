import React from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";

import { useTheme } from "@react-navigation/native";
import AppText from "./AppText";

function CheckBox({ OnPress, checked, Text, Child }) {
  const { colors } = useTheme();

  return (
    <View style={styles.RememberMeBox}>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        color={colors.text}
        uncheckedColor={colors.text}
        onPress={OnPress}
      />
      {Child ? (
        Child
      ) : (
        <AppText size={15} family="InterBold" Title={Text} color={"grey"} />
      )}
    </View>
  );
}

export default CheckBox;

const styles = StyleSheet.create({
  RememberMeBox: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
});
