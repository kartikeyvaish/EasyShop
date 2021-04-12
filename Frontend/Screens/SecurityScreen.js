import React from "react";
import { StyleSheet } from "react-native";

import Container from "../components/Container";
import ColorPallete from "../config/ColorPallete";
import SettingsMenuCard from "../components/SettingsMenuCard";

function SecurityScreen({ navigation }) {
  return (
    <Container style={styles.container}>
      <SettingsMenuCard
        MenuName="Change Password"
        family="MuliBold"
        textSize={20}
        onPress={() => navigation.navigate("ChangePassword")}
        style={styles.cardStyle}
      />
      <SettingsMenuCard
        MenuName="Delete Account"
        textSize={20}
        textProps={{
          color: ColorPallete.red,
          weight: "bold",
        }}
        style={styles.cardStyle}
      />
    </Container>
  );
}

export default SecurityScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  cardStyle: {
    marginBottom: 20,
  },
});
