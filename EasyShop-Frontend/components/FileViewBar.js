import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import AppText from "./AppText";
import Icon from "./Icon";

function FileViewBar({ Name, onBackPress, style, DATE, onShare, onDownload }) {
  return (
    <View style={[styles.FileViewBar, style]}>
      <View style={{ flex: 8, flexDirection: "row" }}>
        <TouchableWithoutFeedback onPress={onBackPress}>
          <View style={styles.BackBTN}>
            <Icon
              Name="Ionicons"
              IconName="ios-arrow-back"
              size={25}
              color={"white"}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.Header}>
          <AppText Title={Name} size={25} family="Muli" color={"white"} />
          <AppText Title={DATE} size={15} family="Muli" color={"white"} />
        </View>
      </View>
      <View style={styles.IconBox}>
        <Icon
          Name="Entypo"
          IconName="share"
          size={30}
          color={"white"}
          onPress={onShare}
        />
        <Icon
          Name="Feather"
          IconName="download"
          size={30}
          color={"white"}
          onPress={onDownload}
        />
      </View>
    </View>
  );
}

export default FileViewBar;

const styles = StyleSheet.create({
  FileViewBar: {
    flexDirection: "row",
    height: 50,
  },
  BackBTN: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 10,
  },
  Header: {
    flex: 9,
    justifyContent: "center",
  },
  IconBox: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
