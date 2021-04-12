import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import Icon from "./Icon";

function ActionMenu({
  Name = "Feather",
  IconName,
  size,
  color = "white",
  Upper = "red",
  Lower = "red",
  Title,
  onPress,
}) {
  return (
    <View style={styles.Box}>
      <TouchableOpacity onPress={onPress}>
        <View>
          <View style={styles.IconBox}>
            <View
              style={{ flex: 1, width: "100%", backgroundColor: Upper }}
            ></View>
            <View
              style={{ flex: 1, width: "100%", backgroundColor: Lower }}
            ></View>
            <Icon
              Name={Name}
              IconName={IconName}
              size={size}
              color={color}
              style={styles.Icon}
            />
          </View>
        </View>
      </TouchableOpacity>
      {Title ? <AppText Title={Title} style={{ alignSelf: "center" }} /> : null}
    </View>
  );
}

export default ActionMenu;

const styles = StyleSheet.create({
  Box: {
    maxWidth: Dimensions.get("screen").width / 3,
    justifyContent: "space-evenly",
    height: "100%",
    alignItems: "center",
  },
  Icon: { position: "absolute" },
  IconBox: {
    width: 50,
    height: 50,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
