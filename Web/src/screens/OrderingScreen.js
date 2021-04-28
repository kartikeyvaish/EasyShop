import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import AuthContext from "../auth/context";
import SingleContainer from "../components/SingleContainer";
import Text from "../components/Text";
import StepperBars from "../components/StepperBars";
import Button from "../components/Button";
import HelperFunctions from "../config/HelperFunctions";
import API from "../api/API";
import SelectAddress from "../components/SelectAddress";
import NotFoundLottie from "../animations/Done.json";
import OrderCartCard from "../components/OrderCartCard";
import PricePayButton from "../components/PricePayButton";
import ColorPallete from "../config/ColorPallete";
import PaymentModeCard from "../components/PaymentModeCard";
import LottieFile from "../components/LottieFile";

const Steps = ["Select Address", "Order Summary", "Payment"];

function OrderingScreen({ history }) {
  const authContext = useContext(AuthContext);
  const [Address, SetAddress] = useState(null);
  const [AddressComplete, SetAddressComplete] = useState(false);
  const [AddressSelect, SetAddressSelect] = useState(null);
  const [Cart, SetCart] = useState([]);
  const [FinalPrice, SetFinalPrice] = useState(0);
  const [Loading, SetLoading] = useState(false);
  const [LoadingText, SetLoadingText] = useState("");
  const [OrderComplete, SetOrderComplete] = useState(false);
  const [OrderPlaced, SetOrderPlaced] = useState(false);
  const [PaymentMode, SetPaymentMode] = useState("Cash On Delivery");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    document.title = "EasyShop | Login";
    if (authContext.User === null) {
      history.replace("/not-found-404");
    } else {
      GetAddresses();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Cart.length) {
      let result = 0;
      for (let i = 0; i < Cart.length; i++) {
        result += parseInt(Cart[i].Price) * parseInt(Cart[i].Quantity);
      }
      SetFinalPrice(result);
    }
  }, [Cart]);

  const handleNext = () => setActiveStep((PrevStep) => PrevStep + 1);

  const handleBack = () => setActiveStep((PrevStep) => PrevStep - 1);

  const Increment = (_id) => {
    let temp = [...Cart];
    let index = temp.findIndex((obj) => obj._id === _id);
    if (index !== -1) {
      if (temp[index].Quantity === 5) {
        toast.error("Only 5 units is allowed per customer!");
      } else {
        temp[index].Quantity += 1;
        SetCart(temp);
      }
    }
  };

  const Decrement = (_id) => {
    let temp = [...Cart];
    let index = temp.findIndex((obj) => obj._id === _id);
    if (index !== -1) {
      if (temp[index].Quantity > 1) {
        temp[index].Quantity -= 1;
      } else {
        temp[index].Quantity = 1;
      }
      SetCart(temp);
    }
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
          history.replace("/");
        } else {
          SetCart(filter);
        }
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  const completed = {
    "Select Address": AddressComplete,
    "Order Summary": OrderComplete,
    Payment: OrderPlaced,
  };

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
            handleNext();
            found = true;
            break;
          }
        }
        if (found === false && response.data.length > 0) {
          SetAddressSelect(response.data[0]);
          SetAddressComplete(true);
          handleNext();
        }
        GetCart();
      } else {
        SetLoading(false);
        toast.error("SERVER ERROR");
      }
    } catch (error) {
      SetLoading(false);
      toast.error("SERVER ERROR");
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
        toast.error("Server Error");
      }
    } catch (error) {
      SetLoading(false);
    }
  };

  const AddressMenu = () => (
    <>
      {AddressComplete === false ? (
        <div
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {Address !== null ? (
            <>
              {Address.map((c) => (
                <SelectAddress
                  key={c._id}
                  item={c}
                  selected={AddressSelect === c ? true : false}
                  onClick={() => SetAddressSelect(c)}
                />
              ))}
              <Button
                Title="Proceed"
                color="white"
                capitalize={false}
                backgroundColor="orangered"
                onClick={
                  AddressSelect === null
                    ? () => toast.error("Select an Address")
                    : () => {
                        SetAddressComplete(true);
                        handleNext();
                      }
                }
                style={{ maxWidth: 500 }}
              />
            </>
          ) : (
            <Button
              Title="Add a address to continue"
              color="white"
              onClick={null}
              style={{ maxWidth: 500 }}
            />
          )}
        </div>
      ) : null}
    </>
  );

  const OrderMenu = () => (
    <>
      {AddressComplete === true && OrderComplete === false ? (
        <>
          <div
            style={{
              width: "100%",
              height: "auto",
              padding: 15,
              paddingTop: 0,
            }}
          >
            <Text text={AddressSelect.Name} size={15} weight="bold" />
            <Text
              text={HelperFunctions.GiveAddressFormat(AddressSelect)}
              size={14}
            />
            <Text text={AddressSelect.Phone} marginBottom={5} size={14} />
            <Button
              Title="Change Address"
              color="white"
              size={18}
              family="Inter"
              capitalize={false}
              backgroundColor={ColorPallete.primary}
              onClick={() => {
                SetAddressComplete(false);
                handleBack();
              }}
            />
          </div>

          {Cart?.map((item) => (
            <OrderCartCard
              Title={item.Title}
              Files={item.Files}
              Price={item.Price}
              Quantity={item.Quantity}
              Category={item.Category}
              Color={item.Colors}
              SelectedColor={item.SelectedColor}
              onColorChange={null}
              onRemove={() => RemoveProduct(item._id)}
              key={item._id}
              Increment={() => Increment(item._id)}
              Decrement={() => Decrement(item._id)}
            />
          ))}
          <div style={{ display: "flex" }}>
            <PricePayButton
              Price={HelperFunctions.GivePrice(FinalPrice.toString())}
              onClick={() => SetOrderComplete(true)}
            />
          </div>
        </>
      ) : null}
    </>
  );

  const PaymentMenu = () => (
    <>
      {AddressComplete === true && OrderComplete === true ? (
        <>
          <Text
            text="Payment Options"
            size={20}
            family="Inter"
            style={{ padding: 15 }}
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              padding: 10,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PaymentModeCard
              Name="Cash on Delivery"
              checked={
                (PaymentMode === "Cash On Delivery") === true ? true : false
              }
              onClick={() => SetPaymentMode("Cash on Delivery")}
            />
          </div>

          <div style={{ display: "flex" }}>
            <PricePayButton
              Price={HelperFunctions.GivePrice(FinalPrice.toString())}
              onClick={() => PlaceOrder()}
            />
          </div>
        </>
      ) : null}
    </>
  );

  const AfterOrderPlace = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 50,
      }}
    >
      <LottieFile uri={NotFoundLottie} />

      <Text
        text="Order Placed successfully!"
        size={20}
        family="Inter"
        marginTop={50}
      />

      <Button
        Title="Conitnue Shopping"
        size={18}
        color="white"
        style={{ maxWidth: 300 }}
        marginTop={30}
        capitalize={false}
        onClick={() => history.replace("/")}
      />
    </div>
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
        toast.error(response.data);
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Server Error");
    }
  };

  return (
    <SingleContainer
      boxStyle={{ maxWidth: 1200, flexDirection: "column" }}
      LoadingText={LoadingText}
      Loading={Loading}
    >
      {OrderPlaced === true ? (
        <>{AfterOrderPlace()}</>
      ) : (
        <>
          <Text
            text={
              AddressComplete === false
                ? "Select Address"
                : OrderComplete === false
                ? "Order Summary"
                : "Payment"
            }
            size={20}
            weight="bold"
            family="Mulish"
            marginTop={20}
            marginLeft={20}
          />
          <div style={{ width: "100%", height: "auto" }}>
            <StepperBars
              steps={Steps}
              activeStep={activeStep}
              completed={completed}
            />

            {AddressMenu()}

            {OrderMenu()}

            {PaymentMenu()}
          </div>
        </>
      )}
    </SingleContainer>
  );
}

export default OrderingScreen;
