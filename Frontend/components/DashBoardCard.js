import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import AppText from "./AppText";
import AppConfiguration from "../config/AppConfiguration";
import HelperFunctions from "../config/HelperFunctions";
import Image from "./Image";
import Card from "./Card";

const BaseURL = AppConfiguration.BaseURL;

function DashBoardCard({ index, item, onPress }) {
  const img = HelperFunctions.GiveImage(item.Files);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            paddingLeft: index % 2 === 0 ? 10 : 5,
            paddingRight: index % 2 === 0 ? 5 : 10,
            marginBottom: index % 2 === 0 ? 10 : null,
          },
        ]}
      >
        <View style={styles.InnerBox}>
          <View style={styles.ProductImageBox}>
            <Card>
              <Image
                style={styles.ProductImage}
                uri={BaseURL + img}
                preview={{ uri: BaseURL + img }}
              />
            </Card>
          </View>
          <AppText Title={item.Title} numberOfLines={1} style={styles.Title} />
          <AppText
            Title={"in " + item.Category}
            color="grey"
            numberOfLines={1}
            size={13}
            style={styles.Category}
          />
          <AppText
            Title={HelperFunctions.GivePrice(item.Price)}
            numberOfLines={1}
            color="green"
            style={styles.Price}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default DashBoardCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width / 2,
    height: 210,
  },
  InnerBox: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  ProductImageBox: {
    width: 130,
    height: 130,
  },
  ProductImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    elevation: 15,
  },
  Title: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  Category: { paddingLeft: 10, paddingRight: 10 },
  Price: { paddingLeft: 10, paddingRight: 10, marginTop: 10 },
});
