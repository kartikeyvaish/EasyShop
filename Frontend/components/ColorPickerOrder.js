import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import ColorPallete from "../config/ColorPallete";
import HyperlinkText from "./HyperlinkText";

function ColorPickerOrder({ Color, SelectedColor, onPress }) {
  return Color?.length ? (
    <>
      {SelectedColor !== null ? (
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: SelectedColor.ColorInput,
              marginRight: 10,
            }}
          ></View>
          <AppText
            size={16}
            Title={
              SelectedColor.VariantInput
                ? SelectedColor.VariantInput
                : SelectedColor.ColorInput
            }
            style={{ marginRight: 10 }}
          />

          {Color?.length > 1 ? (
            <HyperlinkText
              Title={"Change"}
              size={15}
              onPress={onPress}
              color={ColorPallete.primary}
              family="Inter"
            />
          ) : null}
        </View>
      ) : (
        <HyperlinkText
          Title={"Select Color"}
          onPress={onPress}
          color={ColorPallete.primary}
          family="Inter"
        />
      )}
    </>
  ) : null;
}

export default ColorPickerOrder;

const styles = StyleSheet.create({
  container: {},
});
