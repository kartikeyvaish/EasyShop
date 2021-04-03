import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

import AppText from "./AppText";
import Card from "./Card";
import HelperFunctions from "../config/HelperFunctions";

function OrderProgress({ Date }) {
  let OrderDate = HelperFunctions.GiveOrderDate(Date);
  let DeliveryDate = HelperFunctions.GiveDeliveryDate(Date);
  let DaysDifference = HelperFunctions.NumberOfDays(Date);

  let DeliveryStatus =
    DaysDifference >= 4 ? "Delivered" : `Expected to deliver before`;

  let animateTo =
    DaysDifference < 1
      ? ((DaysDifference + 0.3) * 60) / 4
      : (DaysDifference * 60) / 4;

  const [Height, SetHeight] = useState(new Animated.Value(0));

  const Ball = ({ backgroundColor = "red" }) => (
    <View
      style={{
        width: 10,
        height: 10,
        backgroundColor: backgroundColor,
        borderRadius: 20,
      }}
    ></View>
  );

  useEffect(() => {
    ShowProgress();
  }, []);

  const ShowProgress = () => {
    Animated.timing(Height, {
      toValue: animateTo,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <AppText
          Header={
            DaysDifference < 4 ? "Expected Delivery : " : "Order Delivered on "
          }
          headerWeight="bold"
          weight="normal"
          size={16}
          Title={HelperFunctions.GiveDeliveryDate(Date)}
        />
        <View style={styles.DetailsBox}>
          <View style={styles.ProgressBarView}>
            <Ball backgroundColor="limegreen" />
            <View style={{ width: 4, height: 60 }}>
              <Animated.View
                style={{
                  width: "100%",
                  height: Height,
                  maxHeight: 60,
                  backgroundColor: "limegreen",
                }}
              ></Animated.View>
            </View>
            <Ball backgroundColor="limegreen" />
          </View>

          <View style={styles.TrackView}>
            <View style={styles.Dates}>
              <View>
                <AppText Title="Ordered" size={17} family="PoppinsRegular" />
                <AppText Title={OrderDate} size={12} family="Inter" />
              </View>
              <View>
                <AppText
                  Title={DeliveryStatus}
                  size={17}
                  family="PoppinsRegular"
                />
                <AppText Title={DeliveryDate} size={12} family="Inter" />
              </View>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default OrderProgress;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    padding: 10,
  },
  card: {
    flex: 1,
    borderColor: "lightgrey",
    borderWidth: 1,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
  },
  DetailsBox: {
    flex: 1,
    flexDirection: "row",
  },
  TrackView: {
    flex: 4,
    justifyContent: "center",
  },
  Dates: {
    width: "auto",
    height: 150,
    marginLeft: 10,
    justifyContent: "space-evenly",
  },
  ProgressBarView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
