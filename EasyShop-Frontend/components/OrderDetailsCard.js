import React from "react";
import { View, StyleSheet } from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import Card from "./Card";
import HelperFunctions from "../config/HelperFunctions";
import Image from "./Image";

const BaseURL = AppConfiguration.BaseURL;

function OrderDetailsCard({ Title, SellerName, Price, Quantity, Files }) {
  const File = HelperFunctions.GiveImage(Files);

  return (
    <View style={{ padding: 10 }}>
      <Card style={styles.container}>
        <View style={styles.DetailsBox}>
          <AppText Title={Title} numberOfLines={1} weight="bold" size={20} />
          <AppText
            Title={`Seller : ${SellerName}`}
            numberOfLines={1}
            style={{ marginTop: 10 }}
          />
          <AppText
            Title={HelperFunctions.GivePrice(Price)}
            numberOfLines={1}
            weight="bold"
            size={18}
            style={{ marginTop: 15 }}
          />
          <AppText
            Title={`Quantity : ${Quantity}`}
            numberOfLines={1}
            style={{ marginTop: 5 }}
          />
        </View>
        <View style={styles.ImageBox}>
          <Image
            style={styles.Image}
            uri={BaseURL + File}
            preview={{ uri: BaseURL + File }}
          />
        </View>
      </Card>
    </View>
  );
}

export default OrderDetailsCard;

const styles = StyleSheet.create({
  Image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  container: {
    width: "100%",
    height: "auto",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
  },
  DetailsBox: {
    flex: 3,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  ImageBox: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
