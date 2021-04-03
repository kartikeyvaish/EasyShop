import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";

import AppText from "../components/AppText";
import Icon from "./Icon";
import ColorPallete from "../config/ColorPallete";
import ActionSheet from "./ActionSheet";
import ActionMenu from "./ActionMenu";
import HelperFunctions from "../config/HelperFunctions";

function ChatKeyBaord({
  Message,
  onChangeText,
  onCameraPress,
  onAttatchmentPress,
  onImageCapturePress,
  onVideoCapturePress,
  onImagePicker,
  onVideoPicker,
  onAudioPicker,
  onSendPress,
  isRecording,
  onStart,
  onPause,
  onEnd,
  onCancel,
  ShowGallerySheet,
  ShowCameraSheet,
  onFocus,
  RecordingDuration,
  RecordStatus,
}) {
  const { colors } = useTheme();
  const [Height, SetHeight] = useState(70);

  const LayoutUpdate = async (event) => {
    try {
      SetHeight(event.nativeEvent.layout.height);
    } catch (error) {}
  };

  return (
    <>
      {ShowGallerySheet ? (
        <ActionSheet Height={Height}>
          <View style={styles.MenuRow}>
            <ActionMenu
              IconName="image"
              Title="Photo"
              Upper={"#C30686"}
              Lower={"#D141A1"}
              onPress={onImagePicker}
            />
            <ActionMenu
              IconName="video"
              Title="Video"
              Upper={"#FB630B"}
              Lower={"#F58F54"}
              onPress={onVideoPicker}
            />
            <ActionMenu
              IconName="music"
              Title="Audio"
              Upper={"#15F907"}
              Lower={"#A4EFA0"}
              onPress={onAudioPicker}
            />
          </View>
        </ActionSheet>
      ) : null}

      {ShowCameraSheet ? (
        <ActionSheet Height={Height}>
          <View style={styles.MenuRow}>
            <ActionMenu
              IconName="camera"
              Title="Capture Image"
              Upper={"#F11731"}
              Lower={"#E05263"}
              onPress={onImageCapturePress}
            />
            <ActionMenu
              IconName="video"
              Title="Capture Video"
              Upper={"#0BEAE1"}
              Lower={"#7BEAE5"}
              onPress={onVideoCapturePress}
            />
          </View>
        </ActionSheet>
      ) : null}
      <View style={styles.container}>
        {isRecording === false ? (
          <View
            style={{ paddingBottom: 5, flexDirection: "row" }}
            onLayout={(event) => LayoutUpdate(event)}
          >
            <View style={styles.CameraBox}>
              <Icon
                Name="Feather"
                IconName="camera"
                size={24}
                onPress={onCameraPress}
              />
            </View>

            <View style={styles.TextInputBox}>
              <TextInput
                multiline={true}
                textAlignVertical="center"
                textAlign="left"
                placeholderTextColor={colors.text}
                value={Message}
                placeholder="Message..."
                style={{
                  fontSize: 18,
                  height: "auto",
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
                onChangeText={onChangeText}
                onFocus={onFocus}
              />
            </View>

            <View style={styles.OperationBox}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {Message.length === 0 ? (
                  <>
                    <Icon
                      Name="Entypo"
                      IconName="attachment"
                      size={24}
                      style={{ margin: 10 }}
                      onPress={onAttatchmentPress}
                    />
                    <Icon
                      Name="FontAwesome"
                      IconName="microphone"
                      size={24}
                      style={{ margin: 10 }}
                      onPress={onStart}
                    />
                  </>
                ) : (
                  <AppText
                    Title="Send"
                    color={ColorPallete.primary}
                    weight="bold"
                    size={18}
                    onPress={onSendPress}
                  />
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.RecorderBox}>
            <Icon
              Name="Entypo"
              IconName="controller-stop"
              size={40}
              style={{ marginLeft: 10 }}
              onPress={onEnd}
            />
            <Icon
              Name="Ionicons"
              IconName={
                RecordStatus === "Recording.." ? "ios-pause" : "ios-play"
              }
              size={35}
              style={{ marginLeft: 10 }}
              onPress={onPause}
            />
            <Icon
              Name="Entypo"
              IconName="cross"
              size={40}
              style={{ marginLeft: 10, marginRight: 10 }}
              onPress={onCancel}
            />
            <AppText
              Title={HelperFunctions.GetDurationFormat(RecordingDuration)}
              color={ColorPallete.card}
              weight="bold"
              size={18}
              style={{ marginRight: 10 }}
            />
            <AppText
              Title={RecordStatus}
              color={ColorPallete.primary}
              weight="bold"
              size={18}
            />
          </View>
        )}
      </View>
    </>
  );
}

export default ChatKeyBaord;

const styles = StyleSheet.create({
  container: {
    width: "auto",
    minHeight: 50,
    maxHeight: 150,
    flexDirection: "row",
    borderTopColor: "grey",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  RecorderBox: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingBottom: 5,
    minHeight: 60,
  },
  CameraBox: {
    width: "15%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  TextInputBox: {
    width: "55%",
    height: "auto",
    padding: 10,
  },
  OperationBox: {
    width: "30%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  ActionSheet: {
    width: "100%",
    height: "auto",
    minHeight: 100,
    position: "absolute",
  },
  MenuRow: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
