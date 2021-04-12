import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import API from "../api/API";
import AuthContext from "../auth/context";
import Alert from "../components/Alert";
import AppText from "../components/AppText";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import RoundButton from "../components/RoundButton";
import Toast from "../components/Toast";
import TopBar from "../components/TopBar";
import ColorPallete from "../config/ColorPallete";

function MyProducts({ navigation }) {
  const authContext = useContext(AuthContext);
  const [Loading, SetLoading] = useState(false);
  const [LoadingText, SetLoadingText] = useState("Getting Products");
  const [Products, SetProducts] = useState([]);
  const [Refreshing, SetRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (authContext.User !== null) {
        GetProducts();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const Refresh = async () => {
    try {
      SetRefreshing(true);
      GetProducts();
    } catch (error) {}
  };

  const GetProducts = async () => {
    try {
      const response = await API.GetProducts({
        Owner: authContext.User._id,
      });
      if (response.ok) {
        SetProducts(response.data);
        SetRefreshing(false);
      } else {
        Toast.show("Server Error");
        SetRefreshing(false);
      }
    } catch (error) {
      Toast.show("Server Error");
      SetRefreshing(false);
    }
  };

  const RemoveProduct = async (_id) => {
    SetLoading(true);
    SetLoadingText("Removing Product..");
    try {
      const response = await API.RemoveProduct({
        _id: _id,
      });
      if (response.ok) {
        let filter = Products.filter((c) => c._id !== _id);
        SetProducts(filter);
        SetLoading(false);
      } else {
        Toast.show("Server Error");
        SetLoading(false);
      }
    } catch (error) {
      Toast.show("Server Error");
      SetLoading(false);
    }
  };

  const RemoveConfirmation = (_id) =>
    Alert.alert({
      Title: "Remove Confirmation",
      Description: "Are you sure to remove this Product?",
      TextOne: "No",
      OnePress: null,
      TextTwo: "Yes, Remove",
      TwoPress: () => RemoveProduct(_id),
      cancelable: true,
    });

  const RenderProductCard = ({ item }) => (
    <ProductCard
      {...item}
      onPress={() => navigation.navigate("ProductDetails", { _id: item._id })}
      onDeletePress={() => RemoveConfirmation(item._id)}
      onEditPress={() => navigation.navigate("EditProduct", { ...item })}
      ShowEditBTN={true}
    />
  );

  return (
    <Container Loading={Loading} LoadingText={LoadingText}>
      <TopBar Name="My Products" onBackPress={() => navigation.goBack()} />

      {authContext.User === null ? (
        <AppText
          Title="You need to Login First"
          size={20}
          weight="bold"
          color={ColorPallete.primary}
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.NoProducts}
        />
      ) : (
        <>
          {Products.length === 0 ? (
            <AppText
              Title="No Products Added"
              size={20}
              weight="bold"
              style={styles.NoProducts}
            />
          ) : null}

          <FlatList
            data={Products}
            keyExtractor={(item) => item._id.toString()}
            renderItem={RenderProductCard}
            showsVerticalScrollIndicator={false}
            refreshing={Refreshing}
            onRefresh={() => Refresh()}
          />

          <RoundButton
            onPress={() =>
              authContext.User === null
                ? navigation.navigate("LoginScreen")
                : navigation.navigate("NewProduct")
            }
            style={styles.AddBTN}
            Name={"AntDesign"}
            IconName={"plus"}
          />
        </>
      )}
    </Container>
  );
}

export default MyProducts;

const styles = StyleSheet.create({
  NoProducts: {
    marginLeft: 20,
    textDecorationLine: "underline",
  },
  AddBTN: {
    position: "absolute",
    bottom: 40,
    right: 30,
  },
});
