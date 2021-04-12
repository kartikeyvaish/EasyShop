import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import Badge from "./Badge";
import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";

function BadgeSelect({
  number,
  style,
  fill,
  SelectedColor = ColorPallete.primary,
}) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 6 }}>
      {fill === true ? (
        <Icon
          Name="AntDesign"
          IconName="checkcircleo"
          style={{ marginLeft: 2 }}
          color={ColorPallete.primary}
        />
      ) : (
        <Badge
          number={number}
          style={[
            {
              borderColor: SelectedColor,
              borderWidth: StyleSheet.hairlineWidth,
              elevation: 0,
              borderRadius: 30,
            },
            style,
          ]}
          size={28}
          backgroundColor={fill ? SelectedColor : null}
          textColor={fill ? "white" : colors.text}
        />
      )}
    </View>
  );
}

export default BadgeSelect;

const styles = StyleSheet.create({
  container: {},
});
