import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Addresses from "../Screens/Addresses";
import AllCategories from "../Screens/AllCategories";
import CartScreen from "../Screens/CartScreen";
import CategoryResults from "../Screens/CategoryResults";
import ChangePasswordScreen from "../Screens/ChangePasswordScreen";
import ChatRoom from "../Screens/ChatRoom";
import ColorPallete from "../config/ColorPallete";
import ChatScreen from "../Screens/ChatScreen";
import DeveloperScreen from "../Screens/DeveloperScreen";
import DrawerContent from "../navigation/DrawerContent";
import EditAddress from "../Screens/EditAddress";
import EditProfile from "../Screens/EditProfile";
import EditProductScreen from "../Screens/EditProductScreen";
import EmailVerification from "../Screens/EmailVerification";
import ForgotPassword from "../Screens/ForgotPassword";
import HomeScreen from "../Screens/HomeScreen";
import Icon from "../components/Icon";
import LoginScreen from "../Screens/LoginScreen";
import ModeScreen from "../Screens/ModeScreen";
import MyProducts from "../Screens/MyProducts";
import NewAddress from "../Screens/NewAddress";
import NewPasswordScreen from "../Screens/NewPasswordScreen";
import NewProduct from "../Screens/NewProduct";
import Orders from "../Screens/Orders";
import OrderDetails from "../Screens/OrderDetails";
import OrderingScreen from "../Screens/OrderingScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import ProductDetails from "../Screens/ProductDetails";
import RegisterScreen from "../Screens/RegisterScreen";
import SecurityScreen from "../Screens/SecurityScreen";
import Settings from "../Screens/Settings";
import SearchResults from "../Screens/SearchResults";
import useCleaner from "../hooks/useCleaner";
import useLinking from "../hooks/useLinking";
import Wishlist from "../Screens/Wishlist";

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function AppNavigator() {
  const { colors } = useTheme();

  useLinking();
  useCleaner();

  const MyDrawer = () => (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{ backgroundColor: "transparent" }}
      drawerType="back"
    >
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="AllCategories" component={AllCategories} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Addresses" component={Addresses} />
      <Drawer.Screen name="Wishlist" component={Wishlist} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Developers" component={DeveloperScreen} />
      <Drawer.Screen name="Chats" component={ChatScreen} />
      <Drawer.Screen name="CartScreen" component={CartScreen} />
    </Drawer.Navigator>
  );

  const MyTabs = () => (
    <Tab.Navigator
      barStyle={{ backgroundColor: colors.background }}
      activeColor={ColorPallete.primary}
      inactiveColor={colors.text}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon
              Name={"MaterialCommunityIcons"}
              IconName={"home"}
              size={26}
              color={focused ? ColorPallete.primary : colors.text}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyProducts"
        component={MyProducts}
        options={{
          tabBarLabel: "My Products",
          tabBarIcon: ({ focused }) => (
            <Icon
              Name={"Entypo"}
              IconName={"shopping-bag"}
              size={20}
              color={focused ? ColorPallete.primary : colors.text}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );

  const HeaderOptions = {
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.text,
    headerTitleStyle: { fontFamily: "InterBold" },
  };

  const SpringAnimationConfig = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Navigator screenOptions={HeaderOptions}>
        <Stack.Screen
          name="HomeScreen"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false, animationTypeForReplace: "pop" }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false, animationTypeForReplace: "pop" }}
        />
        <Stack.Screen
          name="OrderingScreen"
          component={OrderingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewAddress"
          component={NewAddress}
          options={{
            headerShown: true,
            headerTitle: "New Address",
          }}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{
            headerShown: true,
            headerTitle: "Edit Address",
          }}
        />
        <Stack.Screen
          name="ModeScreen"
          component={ModeScreen}
          options={{
            headerShown: true,
            headerTitle: "Select Mode",
          }}
        />
        <Stack.Screen
          name="SecurityScreen"
          component={SecurityScreen}
          options={{
            headerShown: true,
            headerTitle: "Security",
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            headerShown: true,
            headerTitle: "Change Password",
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerTitle: "Forgot Password",
          }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPasswordScreen}
          options={{
            headerTitle: "New Password",
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: "Edit Profile",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerTitle: "Product Details",
          }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProductScreen}
          options={{
            headerTitle: "Edit Product",
          }}
        />
        <Stack.Screen
          name="NewProduct"
          component={NewProduct}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{
            headerShown: true,
            headerTitle: "Order Details",
          }}
        />
        <Stack.Screen
          name="CategoryResults"
          component={CategoryResults}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{
            headerTitle: "Verify your Email",
          }}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default AppNavigator;
