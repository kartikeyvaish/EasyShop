import React from "react";
import { View, StyleSheet } from "react-native";
import ColorPallete from "../config/ColorPallete";

function Seperator({ fill, backgroundColor = ColorPallete.primary }) {
  return (
    <View style={styles.MainBox}>
      <View
        style={{
          backgroundColor: fill ? backgroundColor : "grey",
          height: 2,
          width: "100%",
          marginTop: 20,
        }}
      ></View>
    </View>
  );
}

export default Seperator;

const styles = StyleSheet.create({
  MainBox: {
    flex: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
