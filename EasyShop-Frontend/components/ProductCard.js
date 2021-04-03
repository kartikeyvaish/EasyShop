import React, { useContext } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SwipeRow, View, Button } from "native-base";
import { useTheme } from "@react-navigation/native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import AuthContext from "../auth/context";
import Icon from "./Icon";
import Image from "./Image";
import HelperFunctions from "../config/HelperFunctions";

const BaseURL = AppConfiguration.BaseURL;

function ProductCard(props) {
  const { colors } = useTheme();
  const authContext = useContext(AuthContext);

  const ProductImage = () => {
    let img = HelperFunctions.GiveImage(props.Files);
    return (
      <Image
        style={styles.ProductImage}
        uri={BaseURL + img}
        preview={{ uri: BaseURL + img }}
      />
    );
  };

  return (
    <SwipeRow
      rightOpenValue={-75}
      disableRightSwipe={true}
      disableLeftSwipe={props.disableLeftSwipe ? true : false}
      style={[
        styles.Seperator,
        {
          backgroundColor: colors.background,
        },
      ]}
      body={
        <>
          <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.container}>
              <View style={{ flex: 2, paddingTop: 15, alignItems: "center" }}>
                {ProductImage()}
              </View>
              <View style={{ flex: 3 }}>
                <AppText
                  Header={props.Title}
                  style={styles.Title}
                  numberOfLines={3}
                />
                <AppText
                  Title={"in " + props.Category}
                  style={styles.Category}
                />
                <AppText
                  Title={HelperFunctions.GivePrice(props.Price)}
                  style={styles.Price}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          {props.ShowEditBTN === true ? (
            props.Owner === authContext.User._id ? (
              <TouchableWithoutFeedback onPress={props.onEditPress}>
                <View style={styles.EditBTN}>
                  <Icon Name="Feather" IconName="edit" />
                </View>
              </TouchableWithoutFeedback>
            ) : null
          ) : props.WishlistToggle ? (
            <TouchableWithoutFeedback onPress={props.onEditPress}>
              <View style={styles.EditBTN}>
                <Icon Name="Ionicons" IconName="ios-trash" />
              </View>
            </TouchableWithoutFeedback>
          ) : null}
        </>
      }
      right={
        <Button danger onPress={props.onDeletePress}>
          <Icon Name="Ionicons" IconName="ios-trash" color="white" />
        </Button>
      }
    />
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    paddingBottom: 10,
    flexDirection: "row",
  },
  Seperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 0,
    paddingBottom: 0,
  },
  ProductImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  Title: {
    marginTop: 10,
    fontSize: 17,
    fontFamily: "PoppinsRegular",
  },
  Description: {},
  Category: {
    color: "grey",
    fontSize: 13,
  },
  Price: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  EditBTN: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
