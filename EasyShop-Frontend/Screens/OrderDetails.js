import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import API from "../api/API";
import AppConfiguration from "../config/AppConfiguration";
import AppText from "../components/AppText";
import DownloadInvoiceButton from "../components/DownloadInvoiceButton";
import OrderDetailsCard from "../components/OrderDetailsCard";
import OrderProgress from "../components/OrderProgress";
import PriceBreakup from "../components/PriceBreakup";
import ProgressBar from "../components/ProgressBar";
import ScrollContainer from "../components/ScrollContainer";
import ShippingAddressCard from "../components/ShippingAddressCard";
import Toast from "../components/Toast";

const BaseURL = AppConfiguration.BaseURL;

function OrderDetails({ route }) {
  const [Loading, SetLoading] = useState(false);
  const [IsDownloading, SetIsDownloading] = useState(false);
  const [Progress, SetProgress] = useState(0);
  const [DownloadPercent, SetDownloadPercent] = useState("");
  const [LoadingText, SetLoadingText] = useState("Downloading Invoice");

  const DownloadInvoice = async () => {
    SetLoading(true);
    try {
      const response = await API.CheckInvoice({
        ProductID: route.params.Product._id,
        OrderID: route.params.OrderID,
      });
      if (response.ok) {
        SetLoading(false);
        SaveToGallery(response.data);
      } else {
        Toast.show(response.data);
        SetLoading(false);
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("Server Error while downloading invoice");
    }
  };

  const DownloadStatus = ({ totalBytesExpectedToWrite, totalBytesWritten }) => {
    SetProgress(
      (totalBytesWritten / totalBytesExpectedToWrite).toFixed(1) * 100
    );
    SetDownloadPercent(
      `${(totalBytesWritten / totalBytesExpectedToWrite).toFixed(1) * 100}%`
    );
  };

  const SaveToGallery = async (item) => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      SetLoadingText("Downloading File....");
      SetIsDownloading(true);
      try {
        let name = item.split("/").pop();

        const result = FileSystem.createDownloadResumable(
          BaseURL + item,
          FileSystem.cacheDirectory + name,
          {},
          DownloadStatus
        );

        const response = await result.downloadAsync();

        if (response.status === 200) {
          const asset = await MediaLibrary.createAssetAsync(response.uri);
          MediaLibrary.createAlbumAsync("EasyShop/Invoices", asset, false)
            .then(() => {
              SetIsDownloading(false);
              Toast.show("File Saved Successfully!", "success");
              SetProgress(0);
              SetDownloadPercent("");
            })
            .catch(() => {
              SetIsDownloading(false);
              Toast.show("Error In Saving File");
              SetProgress(0);
              SetDownloadPercent("");
            });
        } else {
          SetIsDownloading(false);
          Toast.show("Error In Saving File");
          SetProgress(0);
          SetDownloadPercent("");
        }
      } catch (error) {
        SetIsDownloading(false);
        Toast.show("Error In Saving File");
        SetProgress(0);
        SetDownloadPercent("");
      }
    } else {
      Toast.show("Need Storage permission to download Invoice");
    }
  };

  return (
    <>
      <ScrollContainer style={styles.container} Loading={Loading}>
        <View style={styles.OrderID}>
          <AppText Title={`Order ID : ${route.params.OrderID}`} size={15} />
        </View>

        <OrderDetailsCard
          Files={route.params.Product.Files}
          Price={route.params.Price}
          Quantity={route.params.Quantity}
          SellerName={route.params.Seller.Name}
          Title={route.params.Product.Title}
        />

        <OrderProgress Date={route.params.DateTime} />

        <ShippingAddressCard Address={route.params.DeliveryAddress} />

        <DownloadInvoiceButton onPress={() => DownloadInvoice()} />

        <PriceBreakup
          FinalPrice={route.params.Price}
          Quantity={route.params.Quantity}
        />
      </ScrollContainer>
      {IsDownloading ? (
        <View style={styles.LoadingBox}>
          <ProgressBar
            progress={Progress}
            DownloadPercentage={DownloadPercent}
          />
          <AppText
            Title={LoadingText}
            size={30}
            color="white"
            style={{ marginTop: 120 }}
          />
        </View>
      ) : null}
    </>
  );
}

export default OrderDetails;

const styles = StyleSheet.create({
  container: { paddingTop: 0 },
  OrderID: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  LoadingBox: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,0.9)",
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
  },
});
