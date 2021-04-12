import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import API from "../api/API";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import CategoryCard from "../components/CategoryCard";
import CategoriesSchema from "../schema/CategoriesSchema";
import DashBoardCard from "../components/DashBoardCard";
import HomeTopBar from "../components/HomeTopBar";
import InputBox from "../components/InputBox";
import ScrollContainer from "../components/ScrollContainer";

const Categories = CategoriesSchema.Catgories;

function HomeScreen({ navigation }) {
  const [Search, SetSearch] = useState("");
  const [RecentProducts, SetRecentProducts] = useState([]);
  const [CartLength, SetCartLength] = useState(0);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      navigation.closeDrawer();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetCartLength();
      GetRecentProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const GetCartLength = async () => {
    if (authContext) {
      if (authContext.User) {
        try {
          const response = await API.GetCartLength({
            _id: authContext.User._id,
          });
          if (response.ok) {
            SetCartLength(response.data.Length);
          }
        } catch (error) {}
      }
    }
  };

  const RenderCategoryCard = ({ item }) => (
    <CategoryCard
      {...item}
      ImageSize={60}
      containerSize={70}
      size={12}
      onPress={() => navigation.navigate("CategoryResults", { ...item })}
    />
  );

  const GetRecentProducts = async () => {
    try {
      const response = await API.GetRecentProducts();
      if (response.ok) {
        SetRecentProducts(response.data);
        if (JSON.stringify(response.data) !== JSON.stringify(RecentProducts)) {
        }
      }
    } catch (error) {}
  };

  return (
    <ScrollContainer style={styles.container}>
      <HomeTopBar
        onDrawerPress={() => navigation.openDrawer()}
        onCartPress={() => navigation.navigate("CartScreen")}
        CartLength={CartLength}
      >
        <InputBox
          placeholder="Search for Sellers or Products.."
          inputStyle={{ fontFamily: "InterBold" }}
          onChangeText={(text) => SetSearch(text)}
          left={Search.length === 0 ? "ios-search" : null}
          right={Search.length === 0 ? null : "ios-search"}
          onRightPress={() =>
            Search.length === 0
              ? null
              : navigation.navigate("SearchResults", { Search: Search })
          }
        />
      </HomeTopBar>

      <View style={styles.Categories}>
        <FlatList
          data={Categories}
          keyExtractor={(item) => item._id.toString()}
          renderItem={RenderCategoryCard}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        />
      </View>

      <AppText
        Title={"Dashboard"}
        family="PoppinsRegular"
        size={25}
        style={{ paddingLeft: 15, paddingTop: 10, paddingBottom: 10 }}
      />

      <View style={styles.RecentProducts}>
        {RecentProducts.map((item, index) => (
          <DashBoardCard
            key={item._id}
            index={index}
            item={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { _id: item._id })
            }
          />
        ))}
      </View>
    </ScrollContainer>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  Categories: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
  },
  RecentProducts: { flexDirection: "row", flexWrap: "wrap", marginBottom: 50 },
});
