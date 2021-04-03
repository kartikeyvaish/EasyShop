import React, { useEffect, useState } from "react";
import { Appearance, AppearanceProvider } from "react-native-appearance";
import AppLoading from "expo-app-loading";
import JWT from "expo-jwt";
import { NavigationContainer } from "@react-navigation/native";
import { Root } from "native-base";

import AppNavigator from "./navigation/AppNavigator";
import AppConfiguration from "./config/AppConfiguration";
import AuthContext from "./auth/context";
import AuthStorage from "./auth/storage";
import RootNav from "./navigation/RootNavigation";
import Theme from "./themes/Theme";
import useFonts from "./hooks/useFonts";

const key = AppConfiguration.JWT_Key;
const defaultScheme = Appearance.getColorScheme();

function GetTheme(Mode) {
  return Mode === "Default" ? Theme[Appearance.getColorScheme()] : Theme[Mode];
}

export default function App() {
  const [User, SetUser] = useState(null);
  const [IsReady, SetIsReady] = useState(false);
  const [Mode, SetMode] = useState(defaultScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      ChangeTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const ChangeTheme = async (colorScheme) => {
    const modeToken = await AuthStorage.getToken("ModeToken");
    if (modeToken) {
      SetMode(colorScheme);
      AuthStorage.storeToken(colorScheme, "ModeToken");
    }
  };

  const LoadFontsAndRestoreToken = async () => {
    await useFonts();
    const token = await AuthStorage.getToken();
    if (token) {
      const res = JWT.decode(token, key);
      SetUser(res);
    }
    const modeToken = await AuthStorage.getToken("ModeToken");
    if (modeToken) {
      SetMode(modeToken);
    }
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFontsAndRestoreToken}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <AppearanceProvider>
      <AuthContext.Provider value={{ User, SetUser, Mode, SetMode }}>
        <NavigationContainer theme={GetTheme(Mode)} ref={RootNav.navigationRef}>
          <Root>
            <AppNavigator />
          </Root>
        </NavigationContainer>
      </AuthContext.Provider>
    </AppearanceProvider>
  );
}
