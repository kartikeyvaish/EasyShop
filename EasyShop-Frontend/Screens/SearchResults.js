import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import API from "../api/API";
import AppText from "../components/AppText";
import Container from "../components/Container";
import ColorPallete from "../config/ColorPallete";
import InputBox from "../components/InputBox";
import Lottie from "../components/Lottie";
import ProductCard from "../components/ProductCard";
import Toast from "../components/Toast";

function SearchResults({ navigation, route }) {
  const [Search, SetSearch] = useState(route.params.Search);
  const [Products, SetProducts] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [Refreshing, SetRefreshing] = useState(true);

  useEffect(() => {
    GetSearchResults();
    return () => {};
  }, []);

  const GetSearchResults = async () => {
    try {
      const resposne = await API.GetSearchResults({
        Search: Search,
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
      onPress={() =>
        navigation.navigate("ProductDetails", {
          _id: item._id,
          OwnerID: item.Owner,
        })
      }
      ShowEditBTN={false}
    />
  );

  const Refresh = async () => {
    try {
      SetRefreshing(true);
      GetSearchResults();
    } catch (error) {}
  };

  return (
    <Container>
      <InputBox
        style={styles.InputBox}
        defaultValue={route.params.Search}
        onChangeText={(text) => SetSearch(text)}
        left={"md-arrow-back"}
        right={"ios-search"}
        leftColor="white"
        rightColor="white"
        inputStyle={styles.inputStyle}
        onLeftPress={() => navigation.goBack()}
        onRightPress={
          Loading
            ? null
            : Search.length === 0
            ? null
            : () => {
                SetLoading(true);
                GetSearchResults();
              }
        }
      />

      {Products.length === 0 ? (
        <AppText
          Title="No Products to show"
          style={{ paddingLeft: 20, paddingTop: 20 }}
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

export default SearchResults;

const styles = StyleSheet.create({
  InputBox: {
    width: "100%",
    marginLeft: 0,
    height: 55,
    backgroundColor: ColorPallete.primary,
  },
  inputStyle: { color: "white", fontSize: 20, fontFamily: "InterBold" },
});
