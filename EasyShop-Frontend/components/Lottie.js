import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "@react-navigation/native";

function Lottie({
  style,
  resizeMode = "cover",
  autoPlay = true,
  loop,
  source,
  onAnimationFinish,
  backgroundColor,
  children,
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.background,
        },
        style,
      ]}
    >
      <LottieView
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.background,
          },
        ]}
        resizeMode={resizeMode}
        autoPlay={autoPlay}
        loop={loop}
        source={source}
        onAnimationFinish={onAnimationFinish}
      />
      {children}
    </View>
  );
}

export default Lottie;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width / 2,
  },
});
