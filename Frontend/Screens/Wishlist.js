import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import API from "../api/API";
import AuthContext from "../auth/context";
import AppText from "../components/AppText";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import Toast from "../components/Toast";
import TopBar from "../components/TopBar";

function Wishlist({ navigation }) {
  const authContext = useContext(AuthContext);
  const [Loading, SetLoading] = useState(false);
  const [LoadingText, SetLoadingText] = useState("Getting Products");
  const [Products, SetProducts] = useState([]);
  const [Refreshing, SetRefreshing] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    GetWishlist();
  }, []);

  const GetWishlist = async () => {
    SetLoading(true);
    try {
      const response = await API.GetWishList({
        _id: authContext.User._id,
      });
      if (response.ok) {
        if (JSON.stringify(response.data) === JSON.stringify(Products)) {
        } else {
          SetProducts(response.data);
        }
        SetLoading(false);
        SetRefreshing(false);
      } else {
        SetLoading(false);
        SetRefreshing(false);
        Toast.show("Server Error");
      }
    } catch (error) {
      SetLoading(false);
      SetRefreshing(false);
      Toast.show("Server Error");
    }
  };

  const Refresh = async () => {
    SetRefreshing(true);
    GetWishlist();
  };

  const RenderProductCard = ({ item }) => (
    <ProductCard
      {...item}
      onPress={() => navigation.navigate("ProductDetails", { _id: item._id })}
      onDeletePress={() => RemoveConfirmation(item._id)}
      onEditPress={() => RemoveFromList(item._id)}
      disableLeftSwipe={true}
      WishlistToggle={true}
    />
  );

  const RemoveFromList = async (ProductID) => {
    try {
      const response = await API.RemoveWishList({
        ProductID,
        OwnerID: authContext.User._id,
      });
      if (response.ok) {
        const filtered = Products.filter((c) => c._id !== ProductID);
        SetProducts(filtered);
        Toast.show("Removed Successfully", "success");
      } else {
        Toast.show("Server Error");
      }
    } catch (error) {
      Toast.show("Server Error");
    }
  };

  return (
    <Container Loading={Loading} LoadingText={LoadingText}>
      <TopBar Name="Wishlist" onBackPress={() => navigation.goBack()} />

      {Products.length === 0 ? (
        <AppText
          Title="No Products in Wishlist"
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
    </Container>
  );
}

export default Wishlist;

const styles = StyleSheet.create({
  NoProducts: {
    marginLeft: 20,
  },
});
