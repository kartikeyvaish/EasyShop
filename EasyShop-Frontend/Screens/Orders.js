import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import API from "../api/API";
import AuthContext from "../auth/context";
import Container from "../components/Container";
import OrderCard from "../components/OrderCard";
import Toast from "../components/Toast";
import TopBar from "../components/TopBar";

function Orders({ navigation }) {
  const authContext = useContext(AuthContext);
  const [OrdersArray, SetOrdersArray] = useState([]);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    GetOrders();
  }, []);

  const GetOrders = async () => {
    if (authContext?.User) {
      SetLoading(true);
      try {
        const response = await API.GetOrders({ _id: authContext.User._id });
        if (response.ok) {
          SetLoading(false);
          SetOrdersArray(response.data.reverse());
        } else {
          SetLoading(false);
          Toast.show("Server Error");
        }
      } catch (error) {
        SetLoading(false);
        Toast.show("Server Error");
      }
    } else {
      Toast.show("You must be logged in to see your orders");
    }
  };

  const RenderOrderCard = ({ item }) => (
    <OrderCard
      Files={item.Product.Files}
      Title={item.Product.Title}
      OrderDate={item.DateTime}
      onPress={() => navigation.navigate("OrderDetails", { ...item })}
    />
  );

  return (
    <Container Loading={Loading}>
      <TopBar Name="My Orders" onBackPress={() => navigation.goBack()} />

      <View style={styles.container}>
        <FlatList
          data={OrdersArray}
          keyExtractor={(item) => item._id.toString()}
          renderItem={RenderOrderCard}
          refreshing={Loading}
          onRefresh={() => GetOrders()}
        />
      </View>
    </Container>
  );
}

export default Orders;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: 5,
  },
});
