import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import AppText from "./AppText";
import HelperFunctions from "../config/HelperFunctions";
import Icon from "./Icon";

function ColorCard({
  Color,
  Variant,
  onPress,
  onCirclePress,
  showDismiss = true,
}) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onCirclePress}>
        <View
          style={[
            styles.Card,
            {
              backgroundColor: Color,
            },
          ]}
        ></View>
      </TouchableWithoutFeedback>
      <AppText Title={HelperFunctions.ColorVariant(Color, Variant)} />
      {showDismiss ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.DeleteBTN}>
            <Icon Name="Entypo" IconName="cross" size={18} color="#121212" />
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
}

export default ColorCard;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: "center",
    marginRight: 10,
    alignItems: "center",
  },
  DeleteBTN: {
    width: 20,
    height: 20,
    borderRadius: 20,
    position: "absolute",
    right: 5,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    zIndex: 9,
  },
  Card: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgrey",
  },
});
