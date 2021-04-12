import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import API from "../api/API";
import AppText from "../components/AppText";
import Container from "../components/Container";
import Lottie from "../components/Lottie";
import ProductCard from "../components/ProductCard";
import Toast from "../components/Toast";
import TopBar from "../components/TopBar";

function CategoryResults({ navigation, route }) {
  const [Products, SetProducts] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [Refreshing, SetRefreshing] = useState(true);

  useEffect(() => {
    GetCategoryResult();
    return () => {};
  }, []);

  const GetCategoryResult = async () => {
    try {
      const resposne = await API.GetCategoryRes({
        Category: route.params.Title,
      });
      if (resposne.ok) {
        SetProducts(resposne.data);
        SetLoading(false);
        SetRefreshing(false);
      } else {
        Toast.show("Server Error");
        SetLoading(false);
        SetRefreshing(false);
      }
    } catch (error) {
      Toast.show("Server Error");
      SetLoading(false);
      SetRefreshing(false);
    }
  };

  const RenderProductCard = ({ item }) => (
    <ProductCard
      {...item}
      onPress={() => navigation.navigate("ProductDetails", { _id: item._id })}
      ShowEditBTN={false}
    />
  );

  const Refresh = async () => {
    try {
      SetRefreshing(true);
      GetCategoryResult();
    } catch (error) {}
  };

  return (
    <Container>
      <TopBar
        Name={route.params.Title}
        onBackPress={() => navigation.goBack()}
      />

      {Products.length === 0 ? (
        <AppText
          Title="No Products to show"
          style={{ paddingLeft: 20 }}
          weight="bold"
          size={20}
        />
      ) : null}

      {Loading ? (
        <Lottie
          source={require("../assets/animations/Loading.json")}
          autoPlay={true}
          loop={true}
        />
      ) : (
        <FlatList
          data={Products}
          keyExtractor={(item) => item._id.toString()}
          renderItem={RenderProductCard}
          showsVerticalScrollIndicator={false}
          refreshing={Refreshing}
          onRefresh={() => Refresh()}
        />
      )}
    </Container>
  );
}

export default CategoryResults;

const styles = StyleSheet.create({
  container: {},
});
