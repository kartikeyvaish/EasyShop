import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import Card from "./Card";

function ShippingAddressCard({ Address }) {
  return (
    <View style={{ padding: 10 }}>
      <Card style={styles.ShippingDetailsBox}>
        <AppText Title={`Shipping Details`} size={15} color="grey" />
        <AppText
          Title={Address.Name}
          size={18}
          weight="bold"
          style={{ marginBottom: 10, marginTop: 10 }}
        />

        <AppText Title={Address.Address} size={15} family="Inter" />
        {Address.Locality ? (
          <AppText Title={Address.Locality} size={15} family="Inter" />
        ) : null}
        <AppText
          Title={Address.City + ", " + Address.State}
          size={15}
          family="Inter"
        />
        <AppText
          Title={`Pincode : ${Address.Pincode}`}
          size={15}
          family="Inter"
        />
        <AppText Title={Address.Phone} size={13} family="Inter" />
      </Card>
    </View>
  );
}

export default ShippingAddressCard;

const styles = StyleSheet.create({
  ShippingDetailsBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingLeft: 15,
    borderRadius: 12,
    elevation: 5,
  },
});
