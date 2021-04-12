import React from "react";
import { StyleSheet, FlatList } from "react-native";

import CategoriesSchema from "../schema/CategoriesSchema";
import ColorPallete from "../config/ColorPallete";
import Container from "../components/Container";
import CategoryCard from "../components/CategoryCard";
import TopBar from "../components/TopBar";

const Categories = CategoriesSchema.Catgories;

function AllCategories({ navigation }) {
  const RenderProductCard = ({ item }) => (
    <CategoryCard
      {...item}
      onPress={() => navigation.navigate("CategoryResults", { ...item })}
    />
  );

  return (
    <Container>
      <TopBar
        Name="All Categories"
        style={{ backgroundColor: ColorPallete.primary, marginBottom: 10 }}
        color={ColorPallete.white}
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={Categories}
        keyExtractor={(item) => item._id.toString()}
        renderItem={RenderProductCard}
        showsVerticalScrollIndicator={false}
        numColumns={3}
      />
    </Container>
  );
}

export default AllCategories;

const styles = StyleSheet.create({
  container: {},
});
