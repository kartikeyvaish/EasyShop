import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import ColorPallete from "../config/ColorPallete";
import AppText from "./AppText";
import Badge from "./Badge";

function DrawerCard({ notifyNumber, Name, topBorder, size, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={topBorder === true ? styles.container : styles.NormalContainer}
      >
        <View style={{ flex: 9 }}>
          <AppText
            Title={Name}
            size={size ? size : 18}
            family="PoppinsRegular"
          />
        </View>
        {notifyNumber === 0 || notifyNumber === undefined ? null : (
          <Badge number={notifyNumber} style={styles.Badge} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default DrawerCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    borderTopColor: ColorPallete.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  NormalContainer: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    padding: 10,
  },
  Badge: {
    position: "relative",
  },
});
