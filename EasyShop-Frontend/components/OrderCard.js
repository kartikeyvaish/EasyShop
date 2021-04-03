import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import Card from "./Card";
import Icon from "./Icon";
import Image from "./Image";
import HelperFunctions from "../config/HelperFunctions";

const BaseURL = AppConfiguration.BaseURL;

function OrderCard({ Files = [], OrderDate, Title, onPress }) {
  let File = HelperFunctions.GiveImage(Files);
  let Date = HelperFunctions.GiveOrderDate(OrderDate);

  let DaysDifference = HelperFunctions.NumberOfDays(OrderDate);
  let DeliveryStatus = DaysDifference >= 4 ? "Delivered" : `Ordered on ${Date}`;

  return (
    <Card style={styles.container}>
      <View style={styles.ImageView}>
        <Image
          style={styles.Image}
          uri={BaseURL + File}
          preview={{ uri: BaseURL + File }}
        />
      </View>

      <View style={styles.DescriptionView}>
        <AppText
          Title={DeliveryStatus}
          style={{ marginBottom: 20 }}
          size={17}
          weight="bold"
          color="green"
        />
        <AppText
          Title={Title}
          numberOfLines={1}
          style={{ marginBottom: 20 }}
          size={16}
          weight="bold"
        />
      </View>

      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.ArrowView}>
          <Icon Name="AntDesign" IconName="right" size={20} />
        </View>
      </TouchableWithoutFeedback>
    </Card>
  );
}

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    height: "auto",
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    marginBottom: 10,
  },
  ImageView: {
    flex: 3,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  Image: {
    width: 80,
    height: 80,
  },
  DescriptionView: {
    flex: 6,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  ArrowView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
