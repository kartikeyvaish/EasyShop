import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import ColorPallete from "../config/ColorPallete";
import AppText from "./AppText";
import Icon from "./Icon";
import Image from "./Image";
import SwipeableRow from "./SwipeableRow";

const BaseURL = AppConfiguration.BaseURL;

function CheckUnreadStatus(arr, Owner) {
  if (arr.length) {
    if (arr[arr.length - 1].From === Owner) {
      if (arr[arr.length - 1].Read === false) {
        return true;
      }
    }
  }
  return false;
}

function RoomCard(props) {
  let Status = CheckUnreadStatus(props.Messages, props.User._id);

  return (
    <SwipeableRow onDeletePress={props.onDeletePress}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.container}>
          <View style={styles.ImageBox}>
            <Image
              style={styles.Avatar}
              uri={BaseURL + props.User.ProfilePicture}
              preview={{ uri: BaseURL + props.User.ProfilePicture }}
            />
          </View>
          <View style={styles.MessageBox}>
            <AppText
              Title={props.User.Name}
              weight={Status ? "bold" : "normal"}
              color={Status ? ColorPallete.primary : null}
              size={18}
            />
            {props.LastMessageType === "Text" ? (
              <AppText
                Title={props.LastMessage}
                family="Poppins"
                size={13}
                color={Status ? ColorPallete.primary : null}
                numberOfLines={1}
              />
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  Name="Feather"
                  IconName={
                    props.LastMessage === "image"
                      ? "image"
                      : props.LastMessage === "video"
                      ? "video"
                      : "music"
                  }
                  color={Status ? ColorPallete.primary : null}
                  size={15}
                />
                <AppText
                  Title={
                    props.LastMessage === "image"
                      ? "Image"
                      : props.LastMessage === "video"
                      ? "Video"
                      : "Audio"
                  }
                  color={Status ? ColorPallete.primary : null}
                  family="Poppins"
                  numberOfLines={1}
                  style={{ marginLeft: 5, marginTop: 3 }}
                />
              </View>
            )}
          </View>
          <AppText
            Title={props.TimeAgo}
            style={styles.TimeAgo}
            color={Status ? ColorPallete.primary : null}
          />
        </View>
      </TouchableWithoutFeedback>
    </SwipeableRow>
  );
}

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    maxHeight: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  Avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  ImageBox: {
    flex: 5,
    maxWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  MessageBox: {
    flex: 8,
    paddingTop: 5,
    paddingLeft: 10,
    maxWidth: 200,
  },
  TimeAgo: {
    position: "absolute",
    right: 20,
  },
});
