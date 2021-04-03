import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import Card from "./Card";
import ColorPallete from "../config/ColorPallete";
import HelperFunctions from "../config/HelperFunctions";
import Image from "./Image";

const BaseURL = AppConfiguration.BaseURL;

function CartCard(props) {
  const ProductImage = () => {
    let img = HelperFunctions.GiveImage(props.Files);
    return (
      <Image
        style={styles.ProductImage}
        uri={BaseURL + img}
        preview={{ uri: BaseURL + img }}
      />
    );
  };

  return (
    <Card style={styles.card} borderColor={ColorPallete.primary}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.container}>
          <View style={{ flex: 2, paddingTop: 15, alignItems: "center" }}>
            {ProductImage()}
          </View>
          <View style={{ flex: 3 }}>
            <AppText
              Header={props.Title}
              style={styles.Title}
              numberOfLines={3}
            />
            <AppText Title={"in " + props.Category} style={styles.Category} />
            <AppText
              Title={HelperFunctions.GivePrice(props.Price)}
              style={styles.Price}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={props.onDelete}>
        <View style={styles.RemoveBTN}>
          <AppText
            Title="Remove From Cart"
            size={20}
            family="Muli"
            color="red"
          />
        </View>
      </TouchableWithoutFeedback>
    </Card>
  );
}

export default CartCard;
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  container: {
    width: "100%",
    height: "auto",
    paddingBottom: 5,
    flexDirection: "row",
  },
  ProductImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  Title: {
    marginTop: 10,
    fontSize: 17,
    fontFamily: "PoppinsRegular",
  },
  Category: {
    color: "grey",
    fontSize: 13,
  },
  Price: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  RemoveBTN: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
