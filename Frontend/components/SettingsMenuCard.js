import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import Icon from "./Icon";

function SettingsMenuCard({
  MenuName,
  onPress,
  IconName,
  Name,
  textSize = 25,
  textProps,
  family = "Inter",
  style,
  marginRight = 10,
  visible = true,
}) {
  return visible == true ? (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.EachMenu, style]}>
        <Icon
          Name={Name}
          IconName={IconName}
          style={{ marginRight: marginRight }}
        />
        <AppText
          Title={MenuName}
          size={textSize}
          family={family}
          {...textProps}
        />
      </View>
    </TouchableOpacity>
  ) : null;
}

export default SettingsMenuCard;

const styles = StyleSheet.create({
  EachMenu: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 5,
    alignItems: "center",
    marginBottom: 10,
  },
});
