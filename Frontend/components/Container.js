import React from "react";
import { View, StatusBar as SB, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";

import AppText from "./AppText";
import Lottie from "./Lottie";

function Container({
  children,
  style,
  hidden = true,
  Loading,
  LoadingText = "Loading..",
}) {
  const { colors } = useTheme();
  return (
    <>
      <StatusBar
        style={"light"}
        backgroundColor={
          hidden === true ? colors.statusBarColor : "transparent"
        }
      />
      <View
        style={[
          {
            flex: 1,
            paddingTop: hidden === false ? 0 : SB.currentHeight,
            backgroundColor: colors.background,
          },
          style,
        ]}
      >
        {children}
      </View>
      {Loading ? (
        <View style={styles.LoadingScreen}>
          <Lottie
            source={require("../assets/animations/Loading.json")}
            autoPlay={true}
            loop={true}
            backgroundColor="transparent"
          >
            <AppText Title={LoadingText} size={40} color="white" />
          </Lottie>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  LoadingScreen: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Container;
