import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "./AppText";

function GradientButton({
  children,
  style,
  text,
  width = "100%",
  onPressAction,
  purpleViolet,
  violetPink,
  pinkDarkGreen,
  blueViolet,
  blueMarine,
  deepBlue,
  RedShade,
  RedAnotherShade,
  gradientBegin = "#00d2ff",
  gradientEnd = "#3a47d5",
  gradientDirection = "horizontal",
  height = 60,
  radius = 40,
  textStyle = {},
  disabled = false,
  disabledGradientBegin = "#D3D3D3",
  disabledGradientEnd = "#696969",
}) {
  const { dark, colors } = useTheme();
  const purpleVioletColor = ["#7B42F6", "#B01EFF"];
  const violetPinkColor = ["#B01EFF", "#E1467C"];
  const pinkDarkGreenColor = ["#E1467C", "#205284"];
  const blueVioletColor = ["#3672F8", "#B01EFF"];
  const blueMarineColor = ["#14F1D9", "#3672F8"];
  const deepBlueColor = ["#4F73C3", "#3C46A2"];
  const RedShadeColor = [colors.card, colors.primary];
  const RedAnotherShadeColor = [colors.card, colors.card];
  const disabledColor = [
    disabledGradientBegin || "#D3D3D3",
    disabledGradientEnd || "#696969",
  ];

  const horizontalGradient = {
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  };

  const verticalGradient = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  };

  const diagonalGradient = {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  };

  return (
    <TouchableWithoutFeedback onPress={disabled ? null : onPressAction}>
      <View style={[{ height, width }, style]}>
        <LinearGradient
          style={[styles.gradient, { borderRadius: radius }]}
          colors={
            disabled
              ? disabledColor
              : purpleViolet
              ? purpleVioletColor
              : violetPink
              ? violetPinkColor
              : pinkDarkGreen
              ? pinkDarkGreenColor
              : blueViolet
              ? blueVioletColor
              : blueMarine
              ? blueMarineColor
              : RedShade
              ? RedShadeColor
              : RedAnotherShade
              ? RedAnotherShadeColor
              : deepBlue
              ? deepBlueColor
              : [gradientBegin, gradientEnd]
          }
          start={
            gradientDirection === "vertical"
              ? verticalGradient.start
              : gradientDirection === "diagonal"
              ? diagonalGradient.start
              : horizontalGradient.start
          }
          end={
            gradientDirection === "vertical"
              ? verticalGradient.end
              : gradientDirection === "diagonal"
              ? diagonalGradient.end
              : horizontalGradient.end
          }
        >
          <AppText
            Title={text}
            style={[styles.text, textStyle]}
            family="Inter"
          />
          {children}
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default GradientButton;

const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
