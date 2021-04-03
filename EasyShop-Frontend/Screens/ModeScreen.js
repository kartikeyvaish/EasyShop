import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";
import Container from "../components/Container";
import RadioButton from "../components/RadioButton";

function ModeScreen(props) {
  const authContext = useContext(AuthContext);

  const ChangeTheme = async (theme) => {
    authContext.SetMode(theme);
    AuthStorage.storeToken(theme, "ModeToken");
  };

  return (
    <Container style={styles.container}>
      <RadioButton
        Name="Light"
        style={{ marginBottom: 20 }}
        Selected={authContext.Mode === "light" ? true : false}
        onPress={() => ChangeTheme("light")}
      />
      <RadioButton
        Name="Dark"
        style={{ marginBottom: 20 }}
        Selected={authContext.Mode === "dark" ? true : false}
        onPress={() => ChangeTheme("dark")}
      />
    </Container>
  );
}

export default ModeScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
});
