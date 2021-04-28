import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddIcon from "@material-ui/icons/Add";

import Dialog from "@material-ui/core/Dialog";

import API from "../api/API";
import AuthContext from "../auth/context";
import Container from "../components/Container";
import ColorPallete from "../config/ColorPallete";
import MyProductsCard from "../components/MyProductsCard";
import Text from "../components/Text";
import Button from "../components/Button";

function MyProducts({ history }) {
  const authContext = useContext(AuthContext);
  const [Loading, SetLoading] = useState(false);
  const [LoadingText, SetLoadingText] = useState("Getting Products");
  const [Products, SetProducts] = useState([]);
  const [Selected, SetSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = "EasyShop | Your Products";
    GetProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {};
  }, []);

  const GetProducts = async () => {
    if (authContext.User !== null) {
      SetLoading(true);
      try {
        const response = await API.GetProducts({
          Owner: authContext.User._id,
        });
        if (response.ok) {
          SetProducts(response.data);
          SetLoading(false);
        } else {
          toast.error("Server Error");
          SetLoading(false);
        }
      } catch (error) {
        toast.error("Server Error");
        SetLoading(false);
      }
    }
  };

  const RemoveProduct = async (_id) => {
    setOpen(false);
    SetLoading(true);
    SetLoadingText("Removing Product..");
    try {
      const response = await API.RemoveProduct({
        _id: _id,
      });
      if (response.ok) {
        let filter = Products.filter((c) => c._id !== _id);
        SetProducts(filter);
        SetLoading(false);
        toast.success("Product Removed Successfully");
      } else {
        toast.error("Server Error");
        SetLoading(false);
      }
    } catch (error) {
      toast.error("Server Error");
      SetLoading(false);
    }
  };

  return (
    <Container
      style={{ padding: 10 }}
      Loading={Loading}
      LoadingText={LoadingText}
    >
      <div style={styles.Box}>
        {authContext.User === null ? (
          <Text
            text="You must be logged In to see your products"
            marginLeft={10}
            family="Mulish"
            weight="700"
            marginBottom={20}
            marginTop={10}
          />
        ) : (
          <>
            <div style={styles.InnerContainer}>
              <div
                style={styles.AddProductBTN}
                onClick={() => history.push("/AddProduct")}
              >
                <AddIcon style={styles.AddIcon} />
                <Text text="Add Product" marginLeft={10} />
              </div>

              <Text
                text={
                  Products.length === 0
                    ? "You have no Products on Portal"
                    : "Your Products"
                }
                size={20}
                family="Mulish"
                weight="700"
                marginBottom={20}
                marginTop={20}
              />
            </div>

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
                  Title="Edit Product"
                  capitalize={false}
                  marginBottom={20}
                  color="white"
                  onClick={() => {
                    history.push({
                      pathname: "/EditProduct",
                      state: { ...Selected },
                    });
                  }}
                />
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
      </div>
    </Container>
  );
}

export default MyProducts;

const styles = {
  AddIcon: {
    backgroundColor: ColorPallete.primary,
    color: "white",
    borderRadius: "50%",
  },
  Box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  InnerContainer: {
    width: "100%",
    maxWidth: 800,
    height: "auto",
  },
  AddProductBTN: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: ColorPallete.primary,
    borderWidth: 1,
    borderStyle: "solid",
    maxWidth: 150,
  },
};
