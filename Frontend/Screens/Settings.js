import React, { useContext } from "react";
import AuthContext from "../auth/context";

import ScrollContainer from "../components/ScrollContainer";
import SettingsMenuCard from "../components/SettingsMenuCard";
import TopBar from "../components/TopBar";

function Settings({ navigation }) {
  const authContext = useContext(AuthContext);

  return (
    <ScrollContainer>
      <TopBar Name="Settings" onBackPress={() => navigation.goBack()} />

      <SettingsMenuCard
        MenuName="Verify Email"
        Name="MaterialCommunityIcons"
        onPress={() => navigation.navigate("EmailVerification")}
        IconName="email-check"
        visible={authContext.User && authContext.User.Email_Verified === false}
      />

      <SettingsMenuCard
        MenuName="Theme"
        Name="Ionicons"
        onPress={() => navigation.navigate("ModeScreen")}
        IconName="ios-color-palette"
      />

      <SettingsMenuCard
        MenuName="Security"
        Name="MaterialCommunityIcons"
        onPress={() => navigation.navigate("SecurityScreen")}
        IconName="security"
        visible={authContext.User ? true : false}
      />
    </ScrollContainer>
  );
}

export default Settings;
