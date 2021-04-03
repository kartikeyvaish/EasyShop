import React from "react";
import { StyleSheet, FlatList } from "react-native";

import Container from "../components/Container";
import ColorPallete from "../config/ColorPallete";
import DeveloperCard from "../components/DeveloperCard";
import Developers from "../schema/Developers";
import TopBar from "../components/TopBar";

const InitialDevelopers = Developers.Developers;

function DeveloperScreen({ navigation }) {
  return (
    <Container>
      <TopBar
        Name="About Us"
        style={styles.TopBar}
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
        data={InitialDevelopers}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <DeveloperCard {...item} />}
      />
    </Container>
  );
}

export default DeveloperScreen;

const styles = StyleSheet.create({
  TopBar: {
    paddingTop: 10,
    marginBottom: 20,
  },
  AddBTN: {
    width: 60,
    height: 60,
    backgroundColor: ColorPallete.primary,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 30,
  },
});
