import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import AppText from "./AppText";

import Icon from "./Icon";

function Counter({ Quantity, Increment, Decrement }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Decrement}>
        <View style={[styles.Icons, { opacity: Quantity === 1 ? 0.5 : 1 }]}>
          <Icon Name="AntDesign" IconName="minus" color="black" />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.Quantity}>
        <AppText Title={Quantity} size={18} weight="bold" />
      </View>

      <TouchableWithoutFeedback onPress={Increment}>
        <View style={styles.Icons}>
          <Icon Name="AntDesign" IconName="plus" color="black" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Counter;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
  },
  Icons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  Quantity: {
    flex: 1,
    marginLeft: 1,
    marginRight: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
