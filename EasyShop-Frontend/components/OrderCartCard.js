import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "./AppButton";
import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import Card from "./Card";
import ColorPallete from "../config/ColorPallete";
import ColorPickerOrder from "./ColorPickerOrder";
import Counter from "./Counter";
import HelperFunctions from "../config/HelperFunctions";
import Image from "./Image";

const BaseURL = AppConfiguration.BaseURL;

function OrderCartCard({
  Title,
  Color,
  Category,
  SelectedColor,
  Price,
  Files,
  Quantity,
  Increment,
  Decrement,
  onColorChange,
  onRemove,
}) {
  const img = HelperFunctions.GiveImage(Files);

  return (
    <Card style={styles.OrderDetailsBox}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.Details}>
          <AppText Title={Title} size={17} numberOfLines={1} />
          <AppText Title={"in " + Category} size={14} color="grey" />
          <ColorPickerOrder
            Color={Color}
            SelectedColor={SelectedColor}
            onPress={onColorChange}
          />
          <AppText
            Title={HelperFunctions.GivePrice(Price)}
            size={17}
            style={{ marginTop: 20 }}
          />
        </View>
        <View style={styles.ProductImageBox}>
          <Image
            style={styles.ProductImage}
            uri={BaseURL + img}
            preview={{ uri: BaseURL + img }}
          />
          <Counter
            Quantity={Quantity}
            Increment={Increment}
            Decrement={Decrement}
          />
        </View>
      </View>
      <AppButton
        Title="Remove Product"
        color={ColorPallete.red}
        onPress={onRemove}
      />
    </Card>
  );
}

export default OrderCartCard;

const styles = StyleSheet.create({
  OrderDetailsBox: {
    width: "95%",
    height: "auto",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    borderWidth: 1 - StyleSheet.hairlineWidth,
    borderColor: ColorPallete.primary,
    alignSelf: "center",
    elevation: 10,
    paddingTop: 10,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    borderRadius: 10,
  },
  Details: {
    flex: 9,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  ProductImageBox: {
    flex: 6,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  ProductImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  RemoveBTN: {
    backgroundColor: ColorPallete.primary,
    borderRadius: 12,
    marginTop: 10,
    maxHeight: 40,
  },
});
