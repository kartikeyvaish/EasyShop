import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import API from "../api/API";
import AuthContext from "../auth/context";
import Button from "../components/Button";
import Container from "../components/Container";
import MyProductsCard from "../components/MyProductsCard";
import Text from "../components/Text";
import ColorPallete from "../config/ColorPallete";

function CartScreen({ history }) {
  const authContext = useContext(AuthContext);
  const [Cart, SetCart] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [Selected, SetSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = "EasyShop | Cart";
    GetCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const GetCart = async () => {
    try {
      SetLoading(true);
      const response = await API.GetCart({ _id: authContext?.User?._id });
      if (response.ok) {
        SetCart(response.data);
        console.log(response.data);
        SetLoading(false);
      } else {
        SetLoading(false);
        toast.error("Server Error");
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Server Error");
    }
  };

  const RemoveProduct = async (_id) => {
    try {
      setOpen(false);
      SetLoading(true);
      const response = await API.RemoveFromCart({
        Owner: authContext?.User?._id,
        _id: _id,
      });
      if (response.ok) {
        SetCart(response.data);
        authContext.SetCartCount(response.data.length);
        SetLoading(false);
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
    <Container
      Loading={Loading}
      style={{ maxWidth: 900, alignItems: "center", paddingTop: 20 }}
    >
      {authContext.User === null ? (
        <Text
          text="You need to Login to see your cart"
          color={ColorPallete.primary}
          textDecoration="underline"
          onClick={() => history.push("/")}
          size={25}
          cursor="pointer"
        />
      ) : Cart.length === 0 ? (
        <>
          <Text text="Your Cart is empty" family="Mulish" size={25} />
          <Button
            Title="Shop Now"
            color="white"
            style={{ width: "auto" }}
            capitalize={false}
            marginTop={30}
            onClick={() => history.push("/")}
          />
        </>
      ) : (
        <>
          {Cart.map((c) => (
            <MyProductsCard
              key={c._id}
              item={c}
              onOptionsClick={() => {
                SetSelected(c);
                setOpen(true);
              }}
              onClick={() => {
                history.push({
                  pathname: "/ProductDetails",
                  state: { _id: c._id },
                });
              }}
            />
          ))}

          <Dialog
            open={open}
            keepMounted
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                padding: 10,
              },
            }}
            onClose={() => setOpen(false)}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 500,
                minWidth: 225,
              }}
            >
              <Button
                Title="Delete Product"
                capitalize={false}
                backgroundColor={ColorPallete.red}
                color="white"
                onClick={() => RemoveProduct(Selected._id)}
              />
            </div>
          </Dialog>
        </>
      )}
    </Container>
  );
}

export default CartScreen;
