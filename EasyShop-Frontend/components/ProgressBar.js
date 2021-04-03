import React from "react";
import { StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

import AppText from "./AppText";

function ProgressBar({ progress, DownloadPercentage }) {
  return (
    <Progress.Bar
      progress={progress}
      width={200}
      height={50}
      animated={true}
      style={styles.ProgressBar}
    >
      <AppText
        Title={DownloadPercentage}
        size={30}
        color="white"
        style={styles.Percenatge}
      />
    </Progress.Bar>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  ProgressBar: {
    position: "absolute",
    justifyContent: "center",
  },
  Percenatge: {
    position: "absolute",
    alignSelf: "center",
  },
});
