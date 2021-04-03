import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import API from "../api/API";
import AddressCard from "../components/AddressCard";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import BadgeSelect from "../components/BadgeSelect";
import Card from "../components/Card";
import ColorPallete from "../config/ColorPallete";
import ColorPickerModal from "../components/ColorPickerModal";
import Container from "../components/Container";
import HelperFunctions from "../config/HelperFunctions";
import Lottie from "../components/Lottie";
import OrderCartCard from "../components/OrderCartCard";
import PaymentModeCard from "../components/PaymentModeCard";
import PriceBreakup from "../components/PriceBreakup";
import RadioButton from "../components/RadioButton";
import Seperator from "../components/Seperator";
import Toast from "../components/Toast";
import TopBar from "../components/TopBar";
import { useBackHandler } from "../hooks/useBackHandler";

function OrderingScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [Address, SetAddress] = useState(null);
  const [AddressComplete, SetAddressComplete] = useState(false);
  const [AddressSelect, SetAddressSelect] = useState(null);
  const [Cart, SetCart] = useState([]);
  const [ColorProduct, SetColorProduct] = useState(null);
  const [FinalPrice, SetFinalPrice] = useState(0);
  const [Loading, SetLoading] = useState(false);
  const [LoadingText, SetLoadingText] = useState("");
  const [ModalVisible, SetModalVisible] = useState(false);
  const [OrderComplete, SetOrderComplete] = useState(false);
  const [OrderPlaced, SetOrderPlaced] = useState(false);
  const [PaymentMode, SetPaymentMode] = useState("Cash On Delivery");

  useEffect(() => {
    GetAddresses();
    return () => {};
  }, []);

  useEffect(() => {
    if (Cart.length) {
      let result = 0;
      for (let i = 0; i < Cart.length; i++) {
        result += parseInt(Cart[i].Price) * parseInt(Cart[i].Quantity);
      }
      SetFinalPrice(result);
    }
  }, [Cart]);

  useBackHandler(() => {
    if (AddressComplete === true && OrderComplete === true) {
      SetOrderComplete(false);
      return true;
    } else if (AddressComplete === true) {
      SetAddressComplete(false);
      return true;
    }
    return false;
  });

  const GetAddresses = async () => {
    SetLoading(true);
    SetLoadingText("Fetching Address");
    try {
      const response = await API.GetAddresses({
        OwnerID: authContext.User._id,
      });
      if (response.ok) {
        SetLoading(false);
        SetAddress(response.data);
        let found = false;
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].Default === true) {
            SetAddressSelect(response.data[i]);
            SetAddressComplete(true);
            found = true;
            break;
          }
        }
        if (found === false && response.data.length > 0) {
          SetAddressSelect(response.data[0]);
          SetAddressComplete(true);
        }
        GetCart();
      } else {
        SetLoading(false);
        Toast.show("SERVER ERROR");
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("SERVER ERROR");
    }
  };

  const GetCart = async () => {
    SetLoading(true);
    SetLoadingText("Fetching Cart...");
    try {
      const response = await API.GetCart({ _id: authContext?.User?._id });
      if (response.ok) {
        SetLoading(false);
        let result = response.data;
        for (let i = 0; i < result.length; i++) {
          result[i].Quantity = 1;
          if (result[i].Colors.length) {
            result[i].SelectedColor = result[i].Colors[0];
          } else {
            result[i].SelectedColor = null;
          }
        }
        SetCart(result);
      } else {
        SetLoading(false);
        Toast.show("Server Error");
      }
    } catch (error) {
      SetLoading(false);
    }
  };

  const BreadCrumbs = () => (
    <View style={styles.BreadCrumbs}>
      <BadgeSelect number={1} fill={AddressComplete} />
      <Seperator fill={AddressComplete} />

      <BadgeSelect number={2} fill={OrderComplete} />
      <Seperator fill={OrderComplete} />

      <BadgeSelect number={3} />

      <View style={styles.MenuHeadersBox}>
        <View style={styles.AddressHeader}>
          <AppText
            Title={"Address"}
            color={AddressComplete ? ColorPallete.primary : null}
          />
        </View>

        <View style={styles.OrderSummaryHeader}>
          <AppText
            Title={"Order Summary"}
            color={OrderComplete ? ColorPallete.primary : null}
          />
        </View>

        <View style={styles.PaymentHeader}>
          <AppText Title={"Payments"} />
        </View>
      </View>
    </View>
  );

  const Increment = (_id) => {
    let temp = [...Cart];
    let index = temp.findIndex((obj) => obj._id == _id);
    if (index !== -1) {
      if (temp[index].Quantity === 5) {
        Toast.show("Only 5 units is allowed per customer!");
      } else {
        temp[index].Quantity += 1;
        SetCart(temp);
      }
    }
  };

  const Decrement = (_id) => {
    let temp = [...Cart];
    let index = temp.findIndex((obj) => obj._id == _id);
    if (index !== -1) {
      if (temp[index].Quantity > 1) {
        temp[index].Quantity -= 1;
      } else {
        temp[index].Quantity = 1;
      }
      SetCart(temp);
    }
  };

  const ChangeColor = (_id) => {
    let temp = [...Cart];
    let index = temp.findIndex((obj) => obj._id == ColorProduct?._id);
    if (index !== -1) {
      const colorIndex = temp[index].Colors.findIndex((obj) => obj._id == _id);
      if (colorIndex !== -1) {
        temp[index].SelectedColor = temp[index].Colors[colorIndex];
        SetCart(temp);
      }
    }
    SetModalVisible(false);
  };

  const RemoveProduct = async (_id) => {
    try {
      const response = await API.RemoveFromCart({
        Owner: authContext?.User?._id,
        _id: _id,
      });
      if (response.ok) {
        const filter = Cart.filter((c) => c._id !== _id);
        if (filter.length === 0) {
          navigation.popToTop();
        } else {
          SetCart(filter);
        }
      } else {
        Toast.show(response.data);
      }
    } catch (error) {
      Toast.show("Server Error");
    }
  };

  const RenderAddress = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => SetAddressSelect(item)}>
      <View style={styles.EachAddressBox}>
        <View style={styles.EachRadioBTN}>
          <RadioButton
            Selected={AddressSelect?._id === item._id ? true : false}
            onPress={() => SetAddressSelect(item)}
          />
        </View>
        <View style={{ flex: 9 }}>
          <AddressCard
            {...item}
            showOptions={false}
            style={{ borderBottomWidth: 0 }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const AddressMenu = () => (
    <>
      {AddressComplete === false ? (
        <View style={{ flex: 1 }}>
          <>
            {Address ? (
              <AppText
                Title="Select Address for Delivery"
                size={18}
                family="MuliBold"
                style={{ paddingLeft: 15, paddingTop: 10 }}
              />
            ) : (
              <AppButton
                Title="Add a address to continue"
                style={styles.AddAddressBTN}
                color="white"
                onPress={() => navigation.navigate("NewAddress")}
              />
            )}
            <View style={{ width: "100%", height: "auto" }}>
              <FlatList
                data={Address}
                keyExtractor={(item) => item._id.toString()}
                renderItem={RenderAddress}
              />
            </View>
            <AppButton
              Title="Proceed"
              color="white"
              style={{
                maxHeight: 60,
                width: "100%",
                marginTop: 20,
                position: "absolute",
                bottom: 0,
                backgroundColor: ColorPallete.card,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9,
              }}
              size={20}
              onPress={
                AddressSelect === null
                  ? () =>
                      Toast.show(
                        "Select an Address",
                        "danger",
                        "OKAY",
                        {
                          marginBottom: 50,
                        },
                        3000
                      )
                  : () => SetAddressComplete(true)
              }
              family="MuliRegular"
            />
          </>
        </View>
      ) : null}
    </>
  );

  const OrderMenu = () => (
    <>
      {AddressComplete === true && OrderComplete === false ? (
        <>
          <ScrollView style={{ height: "100%" }}>
            <>
              <Card style={styles.AddressDisplayBox}>
                <AppText Title={AddressSelect.Name} size={18} />
                <AppText
                  Title={HelperFunctions.GiveAddressFormat(AddressSelect)}
                />
                <AppText Title={AddressSelect.Phone} />
                <AppButton
                  Title="Change Address"
                  color="white"
                  size={18}
                  family="Inter"
                  style={styles.ChangeAddressBTN}
                  onPress={() => SetAddressComplete(false)}
                />
              </Card>
              {Cart?.map((item) => (
                <OrderCartCard
                  Title={item.Title}
                  Files={item.Files}
                  Price={item.Price}
                  Quantity={item.Quantity}
                  Category={item.Category}
                  Color={item.Colors}
                  SelectedColor={item.SelectedColor}
                  onColorChange={() => {
                    SetColorProduct(item);
                    SetModalVisible(true);
                  }}
                  onRemove={() => RemoveProduct(item._id)}
                  key={item._id}
                  Increment={() => Increment(item._id)}
                  Decrement={() => Decrement(item._id)}
                />
              ))}
            </>
          </ScrollView>
          <View style={styles.BUYBTN}>
            <View style={{ flex: 3 }}>
              <AppText
                Title={HelperFunctions.GivePrice(FinalPrice.toString())}
                size={25}
                style={styles.FinalPrice}
              />
            </View>
            <View style={{ flex: 2, padding: 5 }}>
              <AppButton
                Title="Pay"
                style={styles.PayBTN}
                color="white"
                backgroundColor={ColorPallete.primary}
                onPress={() => null}
                onPress={() => SetOrderComplete(true)}
                family="MuliRegular"
              />
            </View>
          </View>
        </>
      ) : null}
    </>
  );

  const PaymentMenu = () => (
    <>
      {AddressComplete === true && OrderComplete === true ? (
        <>
          <ScrollView style={styles.PaymentPage}>
            <AppText
              Title="Payment Options"
              size={20}
              family="Inter"
              style={{ padding: 15 }}
            />

            <PaymentModeCard
              Title="Cash on Delivery"
              Selected={true}
              onPress={() => SetPaymentMode("Cash on Delivery")}
            />

            <PriceBreakup FinalPrice={FinalPrice} Quantity={Cart?.length} />
          </ScrollView>

          <View style={styles.BottomPayBar}>
            <View style={{ flex: 3 }}>
              <AppText
                Title={HelperFunctions.GivePrice(FinalPrice.toString())}
                size={25}
                style={styles.FinalPrice}
              />
            </View>
            <View style={{ flex: 2, padding: 5 }}>
              <AppButton
                Title="Place Order"
                style={styles.PayBTN}
                color="white"
                backgroundColor={ColorPallete.card}
                onPress={() => PlaceOrder()}
              />
            </View>
          </View>
        </>
      ) : null}
    </>
  );

  const AfterOrderPlace = () => (
    <View style={styles.OrderPlacedAnimation}>
      <Lottie
        loop={false}
        autoPlay={true}
        source={require("../assets/animations/Done.json")}
        style={{ maxHeight: 200 }}
      />

      <AppText
        Title={"Order Placed successfully!"}
        size={20}
        family="Poppins"
      />

      <AppButton
        Title="Conitnue Shopping"
        style={styles.ContinueShoppingBTN}
        size={18}
        color="white"
        onPress={() => navigation.replace("HomeScreen")}
      />
    </View>
  );

  const PlaceOrder = async () => {
    SetLoading(true);
    try {
      let Data = {
        Products: Cart,
        PlacedBy: authContext.User._id,
        DeliveryAddress: AddressSelect,
        PaymentMode: PaymentMode,
      };
      const response = await API.PlaceOrder(Data);
      if (response.ok) {
        SetLoading(false);
        SetOrderPlaced(true);
      } else {
        SetLoading(false);
        Toast.show(response.data);
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("Server Error");
    }
  };

  return (
    <Container Loading={Loading} LoadingText={LoadingText}>
      {OrderPlaced ? (
        AfterOrderPlace()
      ) : (
        <>
          <TopBar
            Name={
              AddressComplete === false
                ? "Select Address"
                : OrderComplete === false
                ? "Order Summary"
                : "Payment"
            }
          />

          {BreadCrumbs()}

          {AddressMenu()}

          {OrderMenu()}

          {PaymentMenu()}

          <ColorPickerModal
            ModalVisible={ModalVisible}
            ColorProduct={ColorProduct}
            onBackButtonPress={() => SetModalVisible(false)}
            onBackdropPress={() => SetModalVisible(false)}
            onPress={(_id) => ChangeColor(_id)}
          />
        </>
      )}
    </Container>
  );
}

export default OrderingScreen;

const styles = StyleSheet.create({
  EachAddressBox: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
  },
  EachRadioBTN: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  BreadCrumbs: {
    width: Dimensions.get("screen").width,
    height: 60,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  MenuHeadersBox: {
    width: Dimensions.get("screen").width,
    height: 20,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 10,
  },
  AddressHeader: {
    flex: 1,
    alignItems: "flex-start",
  },
  OrderSummaryHeader: {
    flex: 1,
    alignItems: "center",
  },
  PaymentHeader: {
    flex: 1,
    alignItems: "flex-end",
  },
  PaymentPage: {
    width: "100%",
    height: "100%",
    marginBottom: 200,
  },
  AddAddressBTN: {
    margin: 10,
    maxHeight: 50,
    backgroundColor: ColorPallete.primary,
  },
  BUYBTN: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
    flexDirection: "row",
    height: "auto",
    marginTop: 5,
  },
  AddressDisplayBox: {
    width: "95%",
    height: "auto",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
    borderWidth: StyleSheet.hairlineWidth,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 12,
    marginRight: 10,
    borderColor: "grey",
    paddingTop: 5,
    elevation: 5,
  },
  ChangeAddressBTN: {
    maxHeight: 45,
    width: "100%",
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: ColorPallete.primary,
    borderRadius: 5,
  },
  OrderPlacedAnimation: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: -50,
  },
  ContinueShoppingBTN: {
    maxHeight: 60,
    backgroundColor: ColorPallete.primary,
    borderRadius: 5,
    position: "absolute",
    bottom: 50,
  },
  BottomPayBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 65,
    flexDirection: "row",
  },
  PayBTN: {
    borderRadius: 5,
  },
  FinalPrice: {
    padding: 15,
  },
});
