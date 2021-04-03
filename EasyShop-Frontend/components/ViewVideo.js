import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Video } from "expo-av";
import Slider from "@react-native-community/slider";
import { ActivityIndicator } from "react-native-paper";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import ColorPallete from "../config/ColorPallete";
import FileViewBar from "./FileViewBar";
import HelperFunctions from "../config/HelperFunctions";
import Icon from "./Icon";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";

const BaseURL = AppConfiguration.BaseURL;

function ViewVideo({
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
  _id,
  LoadingText,
  CurrentPlaying,
  progress,
  DownloadPercentage,
}) {
  const [ShowBar, SetShowBar] = useState(true);
  const [Loaded, SetLoaded] = useState(false);
  const [Playing, SetPlaying] = useState(false);
  const [CurrentTime, SetCurrentTime] = useState(0);
  const [Duration, SetDuration] = useState(0);
  const [Value, SetValue] = useState(0);
  const videoPlayer = useRef(null);

  useEffect(() => {
    if (CurrentPlaying !== _id) {
      PauseAudio();
    }
  }, [CurrentPlaying]);

  const DestroyVideoInstance = async () => {
    try {
      hideModal();
      if (videoPlayer !== null) {
        await videoPlayer.current.unloadAsync();
      }
    } catch (error) {}
  };

  const OnLoaded = async () => {
    try {
      const response = await videoPlayer.current.getStatusAsync();
      SetDuration(response.durationMillis);
      SetLoaded(true);
      videoPlayer.current.playAsync();
      SetPlaying(true);
    } catch (error) {}
  };

  const UpdateStatus = async (data) => {
    try {
      if (data.didJustFinish) {
        ResetPlayer();
      } else if (data.positionMillis) {
        if (data.durationMillis) {
          SetCurrentTime(data.positionMillis);
          SetValue((data.positionMillis / data.durationMillis) * 100);
        }
      }
    } catch (error) {}
  };

  const ResetPlayer = async () => {
    try {
      if (Loaded) {
        SetValue(0);
        SetPlaying(false);
        SetCurrentTime(0);
        await videoPlayer.current.setPositionAsync(0);
        await videoPlayer.current.stopAsync();
        SetCurrentTime(0);
      }
    } catch (error) {}
  };

  const SeekUpdate = async (data) => {
    try {
      if (Loaded) {
        const result = (data / 100) * Duration;
        await videoPlayer.current.setPositionAsync(Math.round(result));
      } else {
        SetValue(0);
      }
    } catch (error) {}
  };

  const PlayAudio = async () => {
    try {
      if (Loaded) {
        if (Playing === false) {
          videoPlayer.current.playAsync();
          SetPlaying(true);
        }
      }
    } catch (error) {
      SetPlaying(false);
    }
  };

  const PauseAudio = async () => {
    try {
      if (Loaded) {
        if (Playing === true) {
          videoPlayer.current.pauseAsync();
          SetPlaying(false);
        }
      }
    } catch (error) {
      SetPlaying(true);
    }
  };

  return (
    <Modal modalVisible={modalVisible} hideModal={() => DestroyVideoInstance()}>
      <View style={styles.container}>
        <View style={styles.ImageBox}>
          <TouchableWithoutFeedback onPress={() => SetShowBar(!ShowBar)}>
            <View>
              <View style={styles.Avatar}>
                <Video
                  ref={videoPlayer}
                  style={styles.Avatar}
                  source={{ uri: CustomFile ? CustomFile : BaseURL + File }}
                  isMuted={false}
                  resizeMode="contain"
                  onPlaybackStatusUpdate={(status) => UpdateStatus(status)}
                  onLoad={() => OnLoaded()}
                  usePoster={true}
                  posterSource={{
                    uri: CustomFile ? PreviewFile : BaseURL + PreviewFile,
                  }}
                  progressUpdateIntervalMillis={100}
                />
                {Loaded === false ? (
                  <ActivityIndicator
                    size="large"
                    style={styles.Loading}
                    color="white"
                  />
                ) : ShowBar ? (
                  Playing === true ? (
                    <Icon
                      Name="AntDesign"
                      IconName="pausecircle"
                      style={styles.Loading}
                      color="white"
                      size={50}
                      onPress={() => PauseAudio()}
                    />
                  ) : (
                    <Icon
                      Name="AntDesign"
                      IconName="play"
                      style={styles.Loading}
                      color="white"
                      size={50}
                      onPress={() => PlayAudio()}
                    />
                  )
                ) : null}

                {ShowBar ? (
                  <View style={styles.VideoControls}>
                    <View style={styles.SubViewCOntrols}>
                      <AppText
                        Title={HelperFunctions.GetDurationFormat(CurrentTime)}
                        color="white"
                        style={styles.Time}
                      />
                      <Slider
                        style={{ flex: 1 }}
                        minimumValue={0}
                        maximumValue={100}
                        value={Value}
                        onSlidingComplete={(data) => SeekUpdate(data)}
                        minimumTrackTintColor={ColorPallete.white}
                        maximumTrackTintColor="grey"
                        thumbTintColor={ColorPallete.primary}
                      />
                      <AppText
                        Title={HelperFunctions.GetDurationFormat(Duration)}
                        color="white"
                        style={styles.Time}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
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

export default ViewVideo;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
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
  Loading: {
    position: "absolute",
  },
  Avatar: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  FileViewBar: {
    position: "absolute",
    top: 0,
    height: 100,
    paddingBottom: 10,
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  VideoControls: {
    position: "absolute",
    bottom: 0,
    marginBottom: 50,
    height: "auto",
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  Time: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    color: "white",
    fontFamily: "MuliBold",
  },
  SubViewCOntrols: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
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
