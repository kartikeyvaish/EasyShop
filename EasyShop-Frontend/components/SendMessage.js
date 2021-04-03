import React from "react";
import { View, StyleSheet } from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import ColorPallete from "../config/ColorPallete";
import AppText from "./AppText";
import AudioPlayer from "./AudioPlayer";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";

const BaseURL = AppConfiguration.BaseURL;

function SendMessage({
  Message,
  Time,
  Date,
  Read,
  Type,
  File,
  Mime,
  CustomFile,
  PreviewFile,
  ProfilePicture,
  Name,
  onPress,
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
      </View>
      <View style={styles.SeenBox}>
        {Read !== null || Read !== undefined ? (
          Read === true ? (
            <AppText Title="Seen" style={styles.Seen} />
          ) : null
        ) : null}
      </View>
    </>
  );
}

export default SendMessage;

const styles = StyleSheet.create({
  FileContainer: {
    flexDirection: "row-reverse",
    overflow: "hidden",
    marginBottom: 10,
  },
  Date: {
    alignSelf: "center",
    color: "white",
    marginBottom: 10,
    backgroundColor: ColorPallete.DateColor,
    padding: 5,
    borderRadius: 5,
  },
  SeenBox: {
    flexDirection: "row-reverse",
  },
  Seen: {
    alignSelf: "flex-end",
    color: "grey",
    marginBottom: 0,
    marginTop: -10,
    marginRight: 5,
  },
});
