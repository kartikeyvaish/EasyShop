import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import AppText from "./AppText";

function AppButton({
  style,
  Title,
  color,
  family = "MontserratBold",
  size = 20,
  backgroundColor,
  onPress,
  Loading,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.ButtonStyle,
          backgroundColor ? { backgroundColor: backgroundColor } : {},
          style,
        ]}
      >
        <AppText
          Title={Title}
          color={color ? color : null}
          size={size}
          family={family}
        />
        {Loading ? (
          <ActivityIndicator
            size={"small"}
            color="white"
            style={{ position: "absolute", right: 10 }}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  ButtonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
