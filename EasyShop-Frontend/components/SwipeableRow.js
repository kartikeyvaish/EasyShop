import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";
import Swipeable from "react-native-gesture-handler/Swipeable";

function SwipeableRow({ onDeletePress, children }) {
  return (
    <Swipeable
      renderRightActions={() => (
        <TouchableWithoutFeedback onPress={onDeletePress}>
          <View style={styles.DeleteBTN}>
            <Icon
              Name="Ionicons"
              IconName="ios-trash"
              size={24}
              color="white"
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    >
      {children}
    </Swipeable>
  );
}

export default SwipeableRow;

const styles = StyleSheet.create({
  DeleteBTN: {
    backgroundColor: ColorPallete.red,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
});
