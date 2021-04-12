import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import API from "../api/API";
import Alert from "../components/Alert";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import CartCard from "../components/CartCard";
import Container from "../components/Container";
import ColorPallete from "../config/ColorPallete";
import Icon from "../components/Icon";
import Toast from "../components/Toast";
import TopBar from "../components/TopBar";

function CartScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [Cart, SetCart] = useState([]);
  const [Refreshing, SetRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetCart();
    });

    return unsubscribe;
  }, [navigation]);

  const GetCart = async () => {
    try {
      const response = await API.GetCart({ _id: authContext?.User?._id });
      if (response.ok) {
        SetCart(response.data);
      }
    } catch (error) {}
  };

  const RenderCartCard = ({ item }) => (
    <CartCard
      {...item}
      onPress={() => navigation.navigate("ProductDetails", { _id: item._id })}
      onDelete={() => RemoveConfirmation(item._id)}
    />
  );

  const RemoveConfirmation = (_id) =>
    Alert.alert({
      Title: "Remove Confirmation",
      Description: "Are you sure to remove this Product from cart?",
      TextOne: "No",
      OnePress: null,
      TextTwo: "Yes, Remove",
      TwoPress: () => RemoveProduct(_id),
      cancelable: true,
    });

  const RemoveProduct = async (_id) => {
    try {
      const response = await API.RemoveFromCart({
        Owner: authContext?.User?._id,
        _id: _id,
      });
      if (response.ok) {
        SetCart(response.data);
      } else {
        Toast.show(response.data);
      }
    } catch (error) {
      Toast.show("Server Error");
    }
  };

  return (
    <>
      <Container>
        <TopBar Name="My Cart" onBackPress={() => navigation.goBack()} />
        {Cart.length ? (
          <FlatList
            data={Cart}
            keyExtractor={(item) => item._id.toString()}
            renderItem={RenderCartCard}
            keyboardShouldPersistTaps="always"
            refreshing={Refreshing}
            onRefresh={() => GetCart()}
          />
        ) : (
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              Name="MaterialIcons"
              IconName="add-shopping-cart"
              size={150}
              color={ColorPallete.primary}
              style={{ marginTop: 50 }}
            />
            <AppText
              Title="Your cart is empty!"
              style={{ marginTop: 50 }}
              size={20}
              weight="bold"
            />
            <AppText Title="Add items to it." style={{ marginTop: 10 }} />

            <AppButton
              Title="Shop Now"
              backgroundColor={ColorPallete.primary}
              color="white"
              style={styles.ShowNowBTN}
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        )}
      </Container>
      {Cart.length ? (
        <AppButton
          Title="Proceed to Checkout"
          backgroundColor={ColorPallete.primary}
          color="white"
          style={{ width: "100%", maxHeight: 50 }}
          onPress={() => navigation.navigate("OrderingScreen")}
        />
      ) : null}
    </>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  ShowNowBTN: {
    maxHeight: 50,
    marginTop: 50,
    borderRadius: 10,
  },
});
