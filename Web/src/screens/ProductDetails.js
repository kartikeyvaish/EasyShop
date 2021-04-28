import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatIcon from "@material-ui/icons/Chat";

import API from "../api/API";
import AuthContext from "../auth/context";
import Button from "../components/Button";
import ColorCard from "../components/ColorCard";
import ColorPallete from "../config/ColorPallete";
import HelperFunctions from "../config/HelperFunctions";
import ProductCarousels from "../components/ProductCarousels";
import SingleContainer from "../components/SingleContainer";
import Text from "../components/Text";
import Alert from "../components/Alert";

function ProductDetails({ history }) {
  const [Loading, SetLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const [Color, SetColor] = useState(null);
  const [Product, SetProduct] = useState(null);
  const [InWishlist, SetInWishlist] = useState(false);
  const [AlertOpen, SetAlertOpen] = useState(false);

  useEffect(() => {
    ProductDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {};
  }, []);

  const ProductDetails = async () => {
    SetLoading(true);
    try {
      const response = await API.GetProductDetails({
        _id: history.location.state._id,
        OwnerID: authContext.User ? authContext.User._id : null,
      });
      if (response.ok) {
        SetProduct(response.data);
        SetInWishlist(response.data.InWishlist);
        if (response.data.Colors.length !== 0) {
          SetColor(response.data.Colors[0]);
        }
        SetLoading(false);
      } else {
        toast.error("Server Error");
        SetLoading(false);
      }
    } catch (error) {
      toast.error("Server Error");
      SetLoading(false);
    }
  };

  const ToggleWishList = async () => {
    try {
      if (authContext.User === null) {
        toast.error("You must be logged in to add item to wishlist");
      } else {
        let response = null;
        if (InWishlist) {
          response = await API.RemoveWishList({
            ProductID: Product._id,
            OwnerID: authContext.User._id,
          });
        } else {
          response = await API.AddToWishList({
            ProductID: Product._id,
            OwnerID: authContext.User._id,
          });
        }
        if (response.ok) {
          if (response.data === "Removed from Wishlist") {
            SetInWishlist(false);
          } else {
            SetInWishlist(true);
          }
        } else {
          toast.error("Server Error");
        }
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  const RemoveProduct = async () => {
    SetLoading(true);
    try {
      const response = await API.RemoveProduct({
        _id: history.location.state._id,
      });
      if (response.ok) {
        history.replace("/Home");
        toast.success("Product Removed Successfully", "success");
      } else {
        SetLoading(false);
        toast.error("Server Error");
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Server Error");
    }
  };

  const BuyProduct = async () => {
    if (authContext.User && Product) {
      SetLoading(true);
      try {
        const response = await API.AddToCart({
          Owner: authContext?.User?._id,
          _id: Product?._id,
        });
        if (response.ok) {
          authContext.SetCartCount(response.data.length);
          setTimeout(function () {
            history.push("/place-order");
          }, 500);
        } else {
          SetLoading(false);
          toast.error(response.data);
        }
      } catch (error) {
        SetLoading(false);
        toast.error("Server Error");
      }
    } else {
      history.push("/Login");
    }
  };

  return (
    <SingleContainer
      boxStyle={{
        flexDirection: "column",
        paddingBottom: 20,
        maxWidth: 1000,
      }}
      Loading={Loading}
    >
      {Product !== null ? (
        <>
          <div style={{ width: "100%", height: 300 }}>
            <ProductCarousels itemArray={Product.Files} />
          </div>
          <Text
            text={Product.Title}
            wordBreak="break-word"
            marginLeft={10}
            marginTop={10}
            family="Inter"
            weight="bold"
            size={20}
          />

          <Text
            text={HelperFunctions.GivePrice(Product.Price)}
            wordBreak="break-word"
            marginLeft={10}
            marginTop={10}
            family="Inter"
            color="green"
            weight="bold"
            size={18}
          />

          <Text
            text="Description"
            marginLeft={10}
            marginTop={10}
            color={ColorPallete.primary}
            size={20}
          />
          <Text
            text={Product.Description}
            wordBreak="break-word"
            marginLeft={10}
            size={16}
          />

          <Text
            text="Highlights"
            marginLeft={10}
            marginTop={10}
            color={ColorPallete.primary}
            size={20}
          />
          <Text
            text={Product.Highlights}
            wordBreak="break-word"
            marginLeft={10}
            size={16}
          />

          <Text
            text="Colors Available"
            marginLeft={10}
            marginTop={10}
            color={ColorPallete.primary}
            size={20}
          />
          <div style={styles.ColorsBox}>
            {Product.Colors.map((c) => (
              <ColorCard
                color={c.ColorInput}
                Variant={c.VariantInput}
                key={c._id}
                Selected={Color === c}
              />
            ))}
          </div>

          {authContext.User._id !== Product.Owner ? (
            <>
              <div style={styles.WishListBTN} onClick={() => ToggleWishList()}>
                {InWishlist ? (
                  <>
                    <FavoriteIcon style={{ fontSize: 30, color: "red" }} />
                    <Text text="In Wishlist" size={20} marginLeft={15} />
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon
                      style={{ fontSize: 30, color: "red" }}
                    />
                    <Text text="Add to Wishlist" size={20} marginLeft={15} />
                  </>
                )}
              </div>
              <div style={styles.WishListBTN} onClick={null}>
                <>
                  <ChatIcon
                    style={{ fontSize: 30, color: ColorPallete.primary }}
                  />
                  <Text text="Chat with Seller" size={20} marginLeft={15} />
                </>
              </div>
            </>
          ) : null}

          <div style={styles.BTNS}>
            {authContext.User !== null ? (
              <>
                {authContext.User._id === Product.Owner ? (
                  <Button
                    backgroundColor={ColorPallete.red}
                    Title="Remove Product"
                    color="white"
                    marginLeft={10}
                    marginRight={10}
                    onClick={() => SetAlertOpen(true)}
                    Loading={Loading}
                  />
                ) : (
                  <>
                    <Button
                      backgroundColor="orangered"
                      Title="Buy"
                      color="white"
                      marginLeft={10}
                      marginRight={10}
                      onClick={() => BuyProduct()}
                      Loading={Loading}
                    />
                  </>
                )}
              </>
            ) : (
              <Button
                backgroundColor="orangered"
                Title="Login to Buy"
                color="white"
                onClick={() => history.push("/Login")}
                marginLeft={10}
                marginRight={10}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <Text
            text="Product not available or may have been removed."
            size={20}
            weight="bold"
            marginLeft={15}
            marginTop={15}
          />
          <Button
            Title="Go to Home"
            color="white"
            marginLeft={15}
            marginTop={15}
            style={{ maxWidth: 200 }}
            marginRight={15}
          />
        </>
      )}
      <Alert
        open={AlertOpen}
        alertLabel="Remove Product"
        placeholder="Are you sure to remove the Product?"
        handleClose={() => SetAlertOpen(false)}
        agreeBTNText="Yes, Remove"
        onClick={() => RemoveProduct()}
      />
    </SingleContainer>
  );
}

export default ProductDetails;

const styles = {
  ColorsBox: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    overflow: "auto",
    paddingTop: 5,
    marginBottom: 5,
  },
  BTNS: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    maxWidth: 500,
    alignItems: "center",
    alignSelf: "center",
  },
  AddToCartBTN: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  WishListBTN: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    cursor: "pointer",
  },
};
