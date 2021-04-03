import React, { useContext } from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "../components/AppText";
import Alert from "../components/Alert";
import API from "../api/API";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";
import ColorPallete from "../config/ColorPallete";
import DrawerCard from "../components/DrawerCard";
import Toast from "../components/Toast";

const BaseURL = AppConfiguration.BaseURL;

function DrawerContent({ navigation }) {
  const { User, SetUser } = useContext(AuthContext);

  const Logout = async () => {
    const response = await API.Logout({
      _id: User._id,
    });
    if (response.ok) {
      navigation.closeDrawer();
      AuthStorage.removeToken();
      SetUser(null);
    } else {
      navigation.closeDrawer();
      Toast.show("Error in Logging Out");
    }
  };

  const RemoveConfirmation = () =>
    Alert.alert({
      Title: "Logout",
      Description: "Are you sure you want to Logout?",
      TextOne: "No",
      OnePress: null,
      TextTwo: "Yes, Logout",
      TwoPress: () => Logout(),
      cancelable: true,
    });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.UpperBox}>
          {User !== null ? (
            <TouchableWithoutFeedback
              onPress={() => navigation.replace("HomeScreen")}
            >
              <View>
                <Avatar.Image
                  source={{ uri: BaseURL + User.ProfilePicture }}
                  size={100}
                  style={{ marginBottom: 20 }}
                />
                <AppText
                  Title={User.Name}
                  color={ColorPallete.white}
                  size={20}
                  family="Poppins"
                />
                <AppText
                  Title={User.Email}
                  color={ColorPallete.white}
                  weight="bold"
                />
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <AppText
              Title="Log in"
              color={ColorPallete.white}
              size={20}
              family="Poppins"
              onPress={() => navigation.navigate("LoginScreen")}
            />
          )}
        </View>
        <DrawerCard
          Name="All Categories"
          onPress={() => navigation.navigate("AllCategories")}
        />
        <DrawerCard
          Name="My Account"
          topBorder={true}
          onPress={() =>
            User === null
              ? navigation.navigate("LoginScreen")
              : navigation.navigate("Profile")
          }
        />
        <DrawerCard
          Name="Addresses"
          onPress={() =>
            User === null
              ? navigation.navigate("LoginScreen")
              : navigation.navigate("Addresses")
          }
        />
        <DrawerCard
          Name="Wishlist"
          onPress={() =>
            User === null
              ? navigation.navigate("LoginScreen")
              : navigation.navigate("Wishlist", { _id: User._id })
          }
        />
        <DrawerCard
          Name="My Orders"
          onPress={() =>
            User === null
              ? navigation.navigate("LoginScreen")
              : navigation.navigate("Orders", { _id: User._id })
          }
        />
        <DrawerCard
          Name="Chats"
          onPress={() =>
            User === null
              ? navigation.navigate("LoginScreen")
              : navigation.navigate("Chats")
          }
        />
        <DrawerCard
          Name="Preferences"
          topBorder={true}
          size={15}
          onPress={() => navigation.navigate("Settings")}
        />
        <DrawerCard Name={"Terms & Data Policy"} size={15} />
        <DrawerCard
          Name="Develepors"
          size={15}
          onPress={() => navigation.navigate("Developers")}
        />
      </ScrollView>
      {User !== null ? (
        <DrawerCard
          Name="Logout"
          topBorder={true}
          onPress={() => {
            navigation.closeDrawer();
            RemoveConfirmation();
          }}
        />
      ) : null}
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  UpperBox: {
    height: "auto",
    width: "100%",
    backgroundColor: ColorPallete.primary,
    justifyContent: "center",
    padding: 20,
  },
});
