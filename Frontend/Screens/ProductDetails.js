import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Share,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Linking from "expo-linking";

import Alert from "../components/Alert";
import API from "../api/API";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AuthContext from "../auth/context";
import ColorCard from "../components/ColorCard";
import ColorPallete from "../config/ColorPallete";
import CarouselFiles from "../components/Carousel";
import HelperFunctions from "../config/HelperFunctions";
import Icon from "../components/Icon";
import ScrollContainer from "../components/ScrollContainer";
import Toast from "../components/Toast";

function ProductDetails({ navigation, route }) {
  const [Color, SetColor] = useState(null);
  const [Product, SetProduct] = useState(null);
  const [InWishlist, SetInWishlist] = useState(false);
  const [InCart, SetInCart] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    ProductDetails();
  }, []);

  useEffect(() => {
    return () => {
      SetLoading(false);
    };
  }, []);

  const ProductDetails = async () => {
    SetLoading(true);
    try {
      const response = await API.GetProductDetails({
        _id: route.params._id,
        OwnerID: authContext.User ? authContext.User._id : null,
      });
      if (response.ok) {
        SetProduct(response.data);
        SetInWishlist(response.data.InWishlist);
        SetInCart(response.data.InCart);
        if (response.data.Colors.length !== 0) {
          SetColor(response.data.Colors[0]);
        }
        SetLoading(false);
      } else {
        Toast.show("Server Error");
        SetLoading(false);
      }
    } catch (error) {
      Toast.show("Server Error");
      SetLoading(false);
    }
  };

  const onShare = async () => {
    try {
      let redirectUrl = Linking.createURL("ProductDetails", {
        queryParams: { ...route.params },
      });
      const result = await Share.share({
        title: Product.Title,
        message: `${Product.Description}.\n Click this link to view ${redirectUrl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {}
  };

  const RenderColorCard = ({ item }) => (
    <ColorCard
      Color={item.ColorInput}
      Variant={item.VariantInput}
      onCirclePress={() => SetColor(item)}
      showDismiss={false}
    />
  );

  const RemoveProduct = async () => {
    SetLoading(true);
    try {
      const response = await API.RemoveProduct({
        _id: route.params._id,
      });
      if (response.ok) {
        navigation.goBack();
        Toast.show("Product Removed Successfully", "success");
      } else {
        SetLoading(false);
        Toast.show("Server Error");
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("Server Error");
    }
  };

  const ToggleWishList = async () => {
    try {
      if (authContext.User === null) {
        navigation.navigate("LoginScreen");
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
          SetInWishlist(!InWishlist);
        } else {
          Toast.show("Server Error");
        }
      }
    } catch (error) {
      Toast.show("Server Error");
    }
  };

  const RemoveConfirmation = () =>
    Alert.alert({
      Title: "Remove Confirmation",
      Description: "Are you sure to remove this Product?",
      TextOne: "No",
      OnePress: null,
      TextTwo: "Yes, Remove",
      TwoPress: () => RemoveProduct(),
      cancelable: true,
    });

  const CreateChat = async () => {
    if (authContext.User) {
      SetLoading(true);
      try {
        let Data = {
          UserOneID: authContext.User._id,
          UserTwoID: Product.Owner,
        };
        const response = await API.CreateChat(Data);
        if (response.ok) {
          SetLoading(false);
          let item = response.data;
          navigation.navigate("ChatRoom", {
            ...item,
            OtherUser: HelperFunctions.GetOtherUser(
              item.Users,
              authContext.User._id
            ),
          });
        } else {
          SetLoading(false);
          Toast.show(response.data);
        }
      } catch (error) {
        SetLoading(false);
        Toast.show("Server Error");
      }
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  const AddToCart = async () => {
    if (authContext.User && Product) {
      SetLoading(true);
      try {
        const response = await API.AddToCart({
          Owner: authContext?.User?._id,
          _id: Product?._id,
        });
        if (response.ok) {
          SetInCart(true);
          SetLoading(false);
        } else {
          SetLoading(false);
          Toast.show(response.data);
        }
      } catch (error) {
        SetLoading(false);
      }
    } else {
      navigation.navigate("LoginScreen");
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
          navigation.replace("OrderingScreen");
        } else {
          SetLoading(false);
          Toast.show(response.data);
        }
      } catch (error) {
        SetLoading(false);
        Toast.show("Server Error");
      }
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <>
      <ScrollContainer style={styles.container} Loading={false}>
        {Loading ? (
          <View style={styles.LoadingScreen}>
            <ActivityIndicator size="large" color={ColorPallete.primary} />
          </View>
        ) : Product === null ? null : (
          <>
            <View style={{ width: "100%", height: 300 }}>
              <CarouselFiles
                Files={Product.Files}
                loop={true}
                autoplay={false}
              />
              <Icon
                Name="Entypo"
                IconName="share"
                style={styles.ShareBTN}
                color="white"
                onPress={() => onShare()}
              />

              <Icon
                Name="AntDesign"
                IconName={InWishlist ? "heart" : "hearto"}
                style={styles.AddTOWishBTN}
                color="red"
                onPress={() => ToggleWishList()}
              />

              <Icon
                Name="MaterialCommunityIcons"
                IconName="chat-outline"
                style={styles.ChatBTN}
                color="dodgerblue"
                onPress={() => CreateChat()}
              />
            </View>
            <View style={styles.DetailBox}>
              <AppText Title={Product.Title} style={styles.Title} />
              <AppText
                Title={HelperFunctions.GivePrice(Product.Price)}
                style={styles.Price}
              />

              <AppText
                Title="Description"
                size={20}
                weight="bold"
                style={{ marginTop: 10 }}
                color={ColorPallete.primary}
              />
              <AppText Title={Product.Description} style={styles.Description} />

              {Product.Highlights ? (
                <>
                  <AppText
                    Title="Highlights"
                    size={18}
                    weight="bold"
                    color={ColorPallete.primary}
                    style={{ marginTop: 10 }}
                  />
                  <AppText
                    Title={Product.Highlights}
                    style={styles.Highlights}
                  />
                </>
              ) : null}

              {Product.Colors.length !== 0 ? (
                Color === null ? null : (
                  <AppText
                    Header="Color"
                    HeaderColor={ColorPallete.primary}
                    Title={" : " + Color.VariantInput}
                    size={18}
                    headerWeight="bold"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  />
                )
              ) : null}
              <View style={styles.Colors}>
                <FlatList
                  data={Product.Colors}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={RenderColorCard}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          </>
        )}
      </ScrollContainer>
      <View style={styles.BTNS}>
        {Product === null ? null : authContext.User ? (
          authContext.User._id === Product.Owner ? (
            <AppButton
              Title="Remove Product"
              color="white"
              style={styles.DeleteBTN}
              onPress={() => RemoveConfirmation()}
              size={16}
            />
          ) : (
            <>
              <AppButton
                Title={InCart ? "In Cart" : "Add to Cart"}
                color={InCart ? "white" : "black"}
                style={styles.CARTBTN}
                backgroundColor={InCart ? ColorPallete.primary : "white"}
                onPress={InCart ? null : () => AddToCart()}
                size={16}
              />
              <AppButton
                Title="BUY"
                color="white"
                style={styles.BUYBTN}
                size={20}
                onPress={() => BuyProduct()}
                family="MuliRegular"
              />
            </>
          )
        ) : (
          <AppButton
            Title="Login to add to cart"
            color="white"
            style={styles.BUYBTN}
            onPress={() => navigation.navigate("LoginScreen")}
            size={16}
          />
        )}
      </View>
    </>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  container: { paddingTop: 0 },
  ShareBTN: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: ColorPallete.red,
    padding: 10,
    borderRadius: 30,
  },
  AddTOWishBTN: {
    position: "absolute",
    right: 20,
    top: 80,
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 30,
  },
  ChatBTN: {
    position: "absolute",
    right: 20,
    top: 140,
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 30,
  },
  Title: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: "InterBold",
  },
  Price: {
    fontSize: 23,
    marginTop: 10,
    fontWeight: "bold",
  },
  Description: {
    fontSize: 16,
    marginTop: 10,
  },
  DetailBox: { paddingLeft: 20, paddingRight: 20, paddingBottom: 50 },
  Highlights: {
    fontSize: 13,
    marginTop: 10,
    fontFamily: "PoppinsRegular",
  },
  LoadingScreen: {
    width: "100%",
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  BTNS: {
    width: "100%",
    height: 60,
    flexDirection: "row",
  },
  CARTBTN: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  BUYBTN: {
    flex: 1,
    backgroundColor: ColorPallete.card,
    justifyContent: "center",
    alignItems: "center",
  },
  DeleteBTN: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPallete.red,
  },
});
