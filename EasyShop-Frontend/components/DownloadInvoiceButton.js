import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import AppText from "./AppText";
import Card from "./Card";
import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";

function DownloadInvoiceButton({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.ButtonBody}>
        <Card style={styles.ButtonInner}>
          <Icon
            Name="FontAwesome5"
            IconName="file-invoice"
            style={{ marginRight: 10 }}
            color={ColorPallete.primary}
          />
          <AppText Title="Download Invoice" weight="bold" size={20} />
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default DownloadInvoiceButton;

const styles = StyleSheet.create({
  ButtonBody: {
    width: "100%",
    height: "auto",
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  ButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "lightgrey",
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 5,
    borderRadius: 10,
  },
});
