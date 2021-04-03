import React from "react";
import { View, StyleSheet } from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import Icon from "./Icon";
import Image from "./Image";

const BaseURL = AppConfiguration.BaseURL;

function ImageTopBar({
  IconName = "ios-arrow-back",
  IconType = "Ionicons",
  IconSize = 30,
  IconStyle,
  ImageStyle,
  File,
  Title,
  TextSize = 24,
  TextColor,
  onBackPress,
  Status,
}) {
  return (
    <View style={styles.Header}>
      <Icon
        Name={IconType}
        IconName={IconName}
        size={IconSize}
        style={[IconStyle, { marginLeft: 10 }]}
        onPress={onBackPress}
      />
      <Image
        style={[styles.Avatar, ImageStyle]}
        uri={BaseURL + File}
        preview={{ uri: BaseURL + File }}
      />
      <View>
        <AppText
          Title={Title}
          size={TextSize}
          family="Muli"
          color={TextColor ? TextColor : null}
        />
        {Status ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={[
                styles.StatusCircle,
                {
                  backgroundColor: Status === "Online" ? "green" : "red",
                },
              ]}
            ></View>
            <AppText
              Title={Status}
              size={15}
              family="Muli"
              color={TextColor ? TextColor : null}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default ImageTopBar;

const styles = StyleSheet.create({
  Header: {
    width: "100%",
    height: "auto",
    paddingBottom: 10,
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  Avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginLeft: 5,
    marginRight: 15,
  },
  StatusCircle: {
    width: 8,
    height: 8,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
  },
});
