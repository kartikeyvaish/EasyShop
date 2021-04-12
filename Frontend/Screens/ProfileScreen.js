import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import ColorPallete from "../config/ColorPallete";
import Icon from "../components/Icon";
import Image from "../components/Image";
import ScrollContainer from "../components/ScrollContainer";
import SettingsMenuCard from "../components/SettingsMenuCard";

const BaseURL = AppConfiguration.BaseURL;

function ProfileScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  return (
    <ScrollContainer>
      <View style={styles.ProfilePart}>
        <Image
          style={styles.Avatar}
          uri={BaseURL + authContext.User.ProfilePicture}
          preview={{ uri: BaseURL + authContext.User.ProfilePicture }}
        />
        <AppText
          Title={authContext.User.Name}
          size={25}
          family="Poppins"
          color="white"
        />
        <AppText
          Title={authContext.User.Phone}
          family="MuliBold"
          color="white"
        />
        <AppText Title={authContext.User.Email} family="Muli" color="white" />
        <Icon
          Name={"MaterialIcons"}
          IconName={"edit"}
          size={28}
          color="white"
          style={{ position: "absolute", right: 10, top: 10 }}
          onPress={() => navigation.navigate("EditProfile")}
        />
      </View>
      <SettingsMenuCard
        MenuName="Orders"
        Name="MaterialCommunityIcons"
        onPress={() => navigation.navigate("Orders")}
        IconName="cart"
      />
      <SettingsMenuCard
        MenuName="Addresses"
        Name="FontAwesome"
        onPress={() => navigation.navigate("Addresses")}
        IconName="address-book"
        marginRight={12}
      />
    </ScrollContainer>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  ProfilePart: {
    width: "100%",
    height: "auto",
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPallete.primary,
  },
  Avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
});
