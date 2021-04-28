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

function Wishlist({ history }) {
  const authContext = useContext(AuthContext);
  const [Loading, SetLoading] = useState(false);
  const [LoadingText, SetLoadingText] = useState("");
  const [Selected, SetSelected] = useState(null);
  const [Products, SetProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    GetWishlist();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const GetWishlist = async () => {
    if (authContext.User) {
      SetLoadingText("Getting Products");
      SetLoading(true);
      try {
        const response = await API.GetWishList({
          _id: authContext.User._id,
        });
        if (response.ok) {
          SetProducts(response.data);
          SetLoading(false);
        } else {
          SetLoading(false);
          toast.error("Server Error");
        }
      } catch (error) {
        SetLoading(false);
        toast.error("Server Error");
      }
    }
  };

  const RemoveFromList = async (ProductID) => {
    setOpen(false);
    SetLoading(true);
    SetLoadingText("Removing from List");
    try {
      const response = await API.RemoveWishList({
        ProductID,
        OwnerID: authContext.User._id,
      });
      if (response.ok) {
        const filtered = Products.filter((c) => c._id !== ProductID);
        SetLoading(false);
        SetProducts(filtered);
        toast.success("Removed Successfully");
      } else {
        SetLoading(false);
        toast.error("Server Error");
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Server Error");
    }
  };

  return (
    <Container
      Loading={Loading}
      LoadingText={LoadingText}
      style={{ maxWidth: 900, paddingTop: 10 }}
    >
      {authContext.User ? (
        <Text
          text="Tou need to be logged in to see your wishlist"
          size={25}
          weight="bold"
        />
      ) : Products.length === 0 ? (
        <Text text="No Products in Wishlist" size={25} weight="bold" />
      ) : (
        <Text text="Wishlist" size={25} weight="bold" />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 20,
        }}
      >
        {Products.map((c) => (
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
      </div>
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
            onClick={() => RemoveFromList(Selected._id)}
          />
        </div>
      </Dialog>
    </Container>
  );
}

export default Wishlist;
