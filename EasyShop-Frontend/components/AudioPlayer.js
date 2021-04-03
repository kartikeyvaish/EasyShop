import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";
import Image from "./Image";
import Toast from "./Toast";
import HelperFunctions from "../config/HelperFunctions";

const BaseURL = AppConfiguration.BaseURL;

function AudioPlayer({
  _id,
  Time,
  File,
  CustomFile,
  ProfilePicture,
  Name,
  CurrentPlaying,
  style,
}) {
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Playing, SetPlaying] = useState(false);
  const [Duration, SetDuration] = useState(false);
  const [Value, SetValue] = useState(0);
  const sound = useRef(new Audio.Sound());
  const { colors } = useTheme();

  useEffect(() => {
    LoadAudio();
    return () => sound.current.unloadAsync();
  }, []);

  useEffect(() => {
    if (CurrentPlaying !== _id) {
      PauseAudio();
    }
  }, [CurrentPlaying]);

  const UpdateStatus = async (data) => {
    try {
      if (data.didJustFinish) {
        ResetPlayer();
      } else if (data.positionMillis) {
        if (data.durationMillis) {
          SetValue((data.positionMillis / data.durationMillis) * 100);
        }
      }
    } catch (error) {}
  };

  const ResetPlayer = async () => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        SetValue(0);
        SetPlaying(false);
        await sound.current.setPositionAsync(0);
        await sound.current.stopAsync();
      }
    } catch (error) {}
  };

  const SeekUpdate = async (data) => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        const result = (data / 100) * Duration;
        await sound.current.setPositionAsync(Math.round(result));
      }
    } catch (error) {}
  };

  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          { uri: CustomFile ? CustomFile : BaseURL + File },
          {},
          true
        );
        if (result.isLoaded === false) {
          SetLoading(false);
          SetLoaded(false);
          Toast.show("Error in Loading Audio");
        } else {
          sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
          SetLoading(false);
          SetLoaded(true);
          SetDuration(result.durationMillis);
        }
      } catch (error) {
        SetLoading(false);
        SetLoaded(false);
      }
    } else {
      SetLoading(false);
      SetLoaded(true);
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          SetPlaying(true);
        }
      }
    } catch (error) {
      SetPlaying(false);
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          SetPlaying(false);
        }
      }
    } catch (error) {
      SetPlaying(true);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={{ flex: 9 }}>
        <AppText
          Title={Name}
          style={styles.Name}
          color={ColorPallete.primary}
          weight="bold"
        />
        <View style={styles.SeekBar}>
          {Loading ? (
            <ActivityIndicator size={"small"} color={ColorPallete.card} />
          ) : Loaded === false ? (
            <Icon
              Name="MaterialIcons"
              IconName={"replay"}
              size={30}
              onPress={() => LoadAudio()}
            />
          ) : (
            <Icon
              Name="Entypo"
              IconName={Playing ? "controller-paus" : "controller-play"}
              size={30}
              onPress={Playing ? () => PauseAudio() : () => PlayAudio()}
            />
          )}

          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={100}
            value={Value}
            onSlidingComplete={(data) => SeekUpdate(data)}
            minimumTrackTintColor={ColorPallete.primary}
            maximumTrackTintColor={colors.text}
          />
          <AppText
            Title={
              Playing
                ? HelperFunctions.GetDurationFormat((Value * Duration) / 100)
                : HelperFunctions.GetDurationFormat(Duration)
            }
            style={{ position: "absolute", left: 40, bottom: 5 }}
            size={10}
          />
          <AppText
            Title={Time}
            style={{ position: "absolute", right: 10, bottom: 5 }}
            size={11}
          />
        </View>
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Image
            style={styles.Avatar}
            uri={BaseURL + ProfilePicture}
            preview={{ uri: BaseURL + ProfilePicture }}
          />
          <Icon
            Name="FontAwesome"
            IconName="microphone"
            size={16}
            color={ColorPallete.primary}
            style={styles.Microphone}
          />
        </View>
      </View>
    </View>
  );
}

export default AudioPlayer;

const styles = StyleSheet.create({
  Avatar: {
    width: 60,
    height: 60,
    borderRadius: 80,
  },
  container: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    maxWidth: "80%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
    borderRadius: 5,
  },
  Microphone: {
    position: "absolute",
    bottom: 0,
    left: 5,
  },
  Name: {
    paddingTop: 3,
    paddingLeft: 5,
  },
  SeekBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
