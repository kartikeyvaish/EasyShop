import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image as IMG,
} from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import Icon from "./Icon";
import Image from "./Image";

const BaseURL = AppConfiguration.BaseURL;

function ImageMessage(props) {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        maxWidth: "80%",
        maxHeight: 300,
        borderColor: "grey",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
      }}
    >
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View
          style={{
            backgroundColor: "white",
            margin: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.CustomFile ? (
            <IMG
              style={styles.Avatar}
              source={{
                uri: props.CustomFile,
              }}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.Avatar}
              uri={BaseURL + props.File}
              preview={{ uri: BaseURL + props.PreviewFile }}
              resizeMode="cover"
            />
          )}
          {props.isVideo === true ? (
            <Icon
              Name="AntDesign"
              IconName="play"
              size={60}
              color="white"
              style={{ position: "absolute" }}
            />
          ) : null}
          <AppText
            Title={props.Mime === "audio" ? null : props.Time}
            style={styles.FileTime}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default ImageMessage;

const styles = StyleSheet.create({
  Avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  FileTime: {
    position: "absolute",
    right: 10,
    bottom: 5,
    fontSize: 12,
    color: "white",
    fontFamily: "MuliBold",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
