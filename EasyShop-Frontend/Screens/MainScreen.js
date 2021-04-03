import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import GradientButton from "../components/GradientButton";

import AppText from "../components/AppText";
import Container from "../components/Container";

function MainScreen({ navigation }) {
  const { colors } = useTheme();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container style={styles.container} hidden={false}>
      <Feather
        name="shopping-cart"
        size={40}
        color={colors.text}
        style={{ marginLeft: 10, marginBottom: 10 }}
      />
      <AppText Title="Welcome to EasyShop!" size={30} family="Inter" />
      <AppText Title="Buy . Sell . Exchange" size={20} />

      <View style={styles.BottomBox}>
        <GradientButton
          style={{ marginVertical: 8 }}
          onPressAction={() => navigation.navigate("LoginScreen")}
          text="Login"
          blueViolet
        />

        <GradientButton
          style={{ marginVertical: 8 }}
          onPressAction={() => navigation.navigate("RegisterScreen")}
          text="Create An Account"
          RedAnotherShade
        />

        {/* <AppText
          Title="By continuing, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use."
          size={13}
          style={{ paddingLeft: 5, marginBottom: 10 }}
        /> */}
      </View>
    </Container>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 0,
  },
  BTNS: {
    width: "100%",
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  BottomBox: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
});
