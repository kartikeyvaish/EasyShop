import React from "react";
import { View, StyleSheet, Text } from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import ColorPallete from "../config/ColorPallete";
import AppText from "./AppText";
import AudioPlayer from "./AudioPlayer";
import Icon from "./Icon";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";

const BaseURL = AppConfiguration.BaseURL;

function RecievedMessage({
  Message,
  Time,
  Date,
  Type,
  File,
  Mime,
  CustomFile,
  PreviewFile,
  ProfilePicture,
  Name,
  onPress,
  onShare,
  CurrentPlaying,
}) {
  return (
    <>
      {Date ? <AppText Title={Date} style={styles.Date} /> : null}
      <View style={styles.FileContainer}>
        {Type === "Text" ? (
          <TextMessage Message={Message} Time={Time} />
        ) : Mime === "audio" ? (
          <AudioPlayer
            Message={Message}
            Time={Time}
            File={File}
            CustomFile={CustomFile}
            ProfilePicture={ProfilePicture}
            Name={Name}
            CurrentPlaying={CurrentPlaying}
          />
        ) : (
          <ImageMessage
            File={Mime === "image" ? File : BaseURL + PreviewFile}
            PreviewFile={Mime === "image" ? PreviewFile : BaseURL + PreviewFile}
            CustomFile={
              Mime === "image"
                ? CustomFile
                : CustomFile
                ? PreviewFile
                : BaseURL + PreviewFile
            }
            onPress={onPress}
            Mime={Mime}
            Time={Time}
            isVideo={Mime === "video" ? true : false}
          />
        )}
        {Mime === "audio" ? (
          <View style={styles.ShareBox}>
            <Icon
              Name="Entypo"
              IconName="share"
              size={20}
              style={styles.ShareBTN}
              color={"white"}
              onPress={onShare}
            />
          </View>
        ) : null}
      </View>
    </>
  );
}

export default RecievedMessage;

const styles = StyleSheet.create({
  FileContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    overflow: "hidden",
  },
  Date: {
    alignSelf: "center",
    color: "white",
    marginBottom: 10,
    backgroundColor: ColorPallete.DateColor,
    padding: 5,
    borderRadius: 5,
  },
  ShareBox: {
    width: "100%",
    height: "100%",
    paddingTop: 25,
    paddingLeft: 10,
  },
  ShareBTN: {
    backgroundColor: "lightgrey",
    width: 32,
    padding: 5,
    borderRadius: 40,
  },
});
