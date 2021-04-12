import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import AppText from "./AppText";
import Card from "./Card";
import RadioButton from "./RadioButton";

function PaymentModeCard({ Title, Selected, Available = true, Text, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Card style={[styles.container, { opacity: Available ? 1 : 0.5 }]}>
        <View style={{ flex: 1 }}>
          <RadioButton Selected={Selected} />
        </View>
        <View style={{ flex: 6, justifyContent: "center", marginTop: -5 }}>
          <AppText Title={Title} size={20} />
          {Text ? <AppText Title={Text} size={12} /> : null}
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
}

export default PaymentModeCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    elevation: 5,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    width: "95%",
    height: "auto",
    padding: 20,
    alignSelf: "center",
  },
});
