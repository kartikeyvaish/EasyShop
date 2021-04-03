import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import ColorPallete from "../config/ColorPallete";
import Image from "./Image";
import Icon from "./Icon";

const BaseURL = AppConfiguration.ImageURL;
const Instagram = AppConfiguration.Instagram;
const Github = AppConfiguration.Github;

function DeveloperCard(props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        style={styles.Avatar}
        uri={BaseURL + props.ProfilePic}
        preview={{ uri: BaseURL + props.ProfilePic }}
      />
      <View style={{ flex: 1, marginLeft: 20 }}>
        <AppText Title={props.Name} size={20} family="MuliExtraBold" />
        <AppText Title={props.Specialization} size={18} family="Inter" />
        <AppText Title={props.Tech_Used} family="Poppins" />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Icon
            Name="Ionicons"
            IconName="logo-instagram"
            size={30}
            color={colors.text}
            style={{ marginRight: 20 }}
            onPress={() => Linking.openURL(Instagram + props.Instgram_Username)}
          />
          <Icon
            Name="Ionicons"
            IconName="logo-github"
            size={30}
            color={colors.text}
            style={{ marginRight: 20 }}
            onPress={() => Linking.openURL(Github + props.Github_Username)}
          />
          <Icon
            Name="Ionicons"
            IconName="md-mail"
            size={30}
            color={colors.text}
            onPress={() => Linking.openURL(`mailto:${props.Email}`)}
          />
        </View>
      </View>
    </View>
  );
}

export default DeveloperCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    minHeight: 150,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
  },
  Avatar: {
    borderColor: ColorPallete.primary,
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
