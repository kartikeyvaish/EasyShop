import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image as IMG,
  TouchableWithoutFeedback,
} from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import Image from "./Image";
import Modal from "./Modal";
import FileViewBar from "./FileViewBar";
import HelperFunctions from "../config/HelperFunctions";
import ProgressBar from "./ProgressBar";

const BaseURL = AppConfiguration.BaseURL;

function ViewImage({
  modalVisible = false,
  hideModal,
  File,
  PreviewFile,
  CustomFile,
  DateOBJ,
  Time,
  onShare,
  onDownload,
  Loading,
  LoadingText,
  progress,
  DownloadPercentage,
}) {
  const [ShowBar, SetShowBar] = useState(true);
  return (
    <Modal modalVisible={modalVisible} hideModal={hideModal}>
      <View style={styles.container}>
        <View style={styles.ImageBox}>
          <TouchableWithoutFeedback onPress={() => SetShowBar(!ShowBar)}>
            <View>
              {CustomFile ? (
                <IMG
                  style={styles.Avatar}
                  source={{ uri: CustomFile }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={styles.Avatar}
                  uri={BaseURL + File}
                  preview={{ uri: BaseURL + PreviewFile }}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableWithoutFeedback>

          {ShowBar === true ? (
            <View style={styles.FileViewBar}>
              <FileViewBar
                Name="You"
                color="white"
                DATE={
                  DateOBJ
                    ? `${HelperFunctions.getDisplayDate(DateOBJ)}, ${Time}`
                    : `Today, ${Time}`
                }
                onShare={onShare}
                onDownload={onDownload}
                onBackPress={hideModal}
              />
            </View>
          ) : null}

          {Loading ? (
            <View style={styles.LoadingBox}>
              <ProgressBar
                progress={progress}
                DownloadPercentage={DownloadPercentage}
              />
              <AppText
                Title={LoadingText}
                size={30}
                color="white"
                style={{ marginTop: 120 }}
              />
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

export default ViewImage;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: "auto",
    minHeight: 500,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  ImageBox: {
    width: "100%",
    backgroundColor: "black",
    maxHeight: "100%",
  },
  Avatar: {
    width: "100%",
    height: "100%",
  },
  FileViewBar: {
    position: "absolute",
    top: 0,
    height: "auto",
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  LoadingBox: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "rgba(0,0,0,0.9)",
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
