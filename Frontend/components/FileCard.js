import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import Icon from "./Icon";
import AppConfiguration from "../config/AppConfiguration";

const BaseURL = AppConfiguration.BaseURL;

function FileCard({ File, Type, onPress, StorageType }) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.FileBox}>
        <View style={[styles.ImageBox, { borderColor: colors.text }]}>
          {Type === "image" ? (
            <Image
              source={{
                uri: StorageType === "Previous" ? BaseURL + File : File,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Icon Name="AntDesign" IconName="playcircleo" size={40} />
          )}
        </View>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.DeleteBTN}>
            <Icon Name="Entypo" IconName="cross" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

export default FileCard;

const styles = StyleSheet.create({
  FileBox: {
    paddingRight: 10,
    paddingTop: 10,
    marginRight: 10,
    minWidth: 85,
    minHeight: 85,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageBox: {
    width: 85,
    height: 85,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  DeleteBTN: {
    width: 25,
    height: 25,
    borderRadius: 20,
    position: "absolute",
    right: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    zIndex: 9,
  },
  Cross: {
    position: "absolute",
    left: -2,
  },
});
