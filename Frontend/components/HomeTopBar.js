import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Body, Button, Header, Icon, Left, Right } from "native-base";
import Constants from "expo-constants";

import Badge from "./Badge";

function HomeTopBar({ onDrawerPress, children, onCartPress, CartLength }) {
  const { dark, colors } = useTheme();

  return (
    <View
      style={[
        styles.TopBarBox,
        { backgroundColor: dark ? colors.background : colors.primary },
      ]}
    >
      <Header
        style={styles.HeaderCustom}
        androidStatusBarColor={colors.statusBarColor}
        translucent={true}
        noShadow
      >
        <Left>
          <Button transparent>
            <Icon name="ios-menu" onPress={onDrawerPress} />
          </Button>
        </Left>
        <Body>
          <Text style={styles.Logo}>{Constants.manifest.name}</Text>
        </Body>
        <Right>
          <Button transparent onPress={onCartPress}>
            <Icon name="ios-cart" />
            {CartLength ? (
              <Badge number={CartLength} style={styles.NotificationBadge} />
            ) : null}
          </Button>
        </Right>
      </Header>
      {children}
    </View>
  );
}

export default HomeTopBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TopBarBox: {
    width: "100%",
    height: "auto",
    paddingBottom: 10,
  },
  HeaderCustom: { backgroundColor: "transparent", marginTop: 0 },
  Logo: { fontSize: 22, color: "white", fontFamily: "MuliBold" },
  SearchBar: {
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "white",
    height: 45,
  },
  NotificationBadge: { position: "absolute", right: 10, top: 5 },
});
