import React from "react";
import { View, StyleSheet } from "react-native";
import ColorPallete from "../config/ColorPallete";
import HelperFunctions from "../config/HelperFunctions";

import AppText from "./AppText";
import Card from "./Card";

function PriceBreakup({ FinalPrice = 0, Quantity = 1 }) {
  return (
    <Card
      style={{
        width: "95%",
        height: "auto",
        alignSelf: "center",
        elevation: 5,
        marginTop: 20,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: ColorPallete.primary,
        borderWidth: StyleSheet.hairlineWidth,
      }}
    >
      <View
        style={{
          padding: 15,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      >
        <AppText Title="Price Details" size={18} />
      </View>

      <View
        style={{
          height: "auto",
          flexDirection: "row",
          padding: 15,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      >
        <View style={{ flex: 1 }}>
          <AppText
            Title={`Price (${Quantity} ${Quantity > 1 ? "items" : "item"})`}
          />
          <AppText Title="Delivery Charges" style={{ marginTop: 10 }} />
        </View>
        <View style={{ flex: 2, alignItems: "flex-end" }}>
          <AppText Title={HelperFunctions.GivePrice(FinalPrice.toString())} />
          <AppText Title="FREE" style={{ marginTop: 10 }} color="green" />
        </View>
      </View>

      <View
        style={{
          height: "auto",
          flexDirection: "row",
          padding: 15,
        }}
      >
        <View style={{ flex: 1 }}>
          <AppText Title="Amount Payable" />
        </View>
        <View style={{ flex: 2, alignItems: "flex-end" }}>
          <AppText
            Title={HelperFunctions.GivePrice(FinalPrice.toString())}
            color="green"
          />
        </View>
      </View>
    </Card>
  );
}

export default PriceBreakup;

const styles = StyleSheet.create({
  container: {},
});
