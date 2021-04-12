import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import API from "../api/API";
import AppConfiguration from "../config/AppConfiguration";
import AuthContext from "../auth/context";
import ChatKeyBaord from "../components/ChatKeyBaord";
import Container from "../components/Container";
import HelperFunctions from "../config/HelperFunctions";
import ImageTopBar from "../components/ImageTopBar";
import RecievedMessage from "../components/RecievedMessage";
import SendMessage from "../components/SendMessage";
import Toast from "../components/Toast";
import { useBackHandler } from "../hooks/useBackHandler";
import VImage from "../components/ViewImage";
import VVideo from "../components/ViewVideo";

let recording = new Audio.Recording();
const BaseURL = AppConfiguration.BaseURL;
const SocketURL = AppConfiguration.SocketURL;

function ChatRoom({ navigation, route }) {
  const authContext = useContext(AuthContext);
  const [Message, SetMessage] = useState("");
  const [UsersCount, SetUsersCount] = useState(0);
  const [RecordingDuration, SetRecordingDuration] = useState("");
  const [RecordStatus, SetRecordStatus] = useState("Recording..");
  const [Messages, SetMessages] = useState(route.params.Messages);
  const [CameraPerm, SetCameraPerm] = useState(false);
  const [CurrentPlaying, SetCurrentPlaying] = useState(null);
  const [Loading, SetLoading] = useState(false);
  const [LoadingText, SetLoadingText] = useState("");
  const [AudioPerm, SetAudioPerm] = useState(false);
  const [isRecording, SetisRecording] = useState(false);
  const [MediaPerm, SetMediaPerm] = useState(false);
  const [ViewImage, SetViewImage] = useState(false);
  const [SelectedImage, SetSelectedImage] = useState(null);
  const [ViewVideo, SetViewVideo] = useState(false);
  const [SelectedVideo, SetSelectedVideo] = useState(null);
  const [ShowGallerySheet, SetShowGallerySheet] = useState(false);
  const [ShowCameraSheet, SetShowCameraSheet] = useState(false);
  const [Progress, SetProgress] = useState(0);
  const [DownloadPercent, SetDownloadPercent] = useState(0);
  const FLatListRef = useRef();
  const chatSocket = useRef();

  const Data = { ...route.params };
  const OtherUser = { ...Data.OtherUser };

  useEffect(() => {
    GetPermission();
    ReadAll();
    return () => {};
  }, []);

  useBackHandler(() => {
    if (ShowGallerySheet === true || ShowCameraSheet === true) {
      CloseActionSheets();
      return true;
    }
    return false;
  });

  useEffect(() => {
    chatSocket.current = new WebSocket(
      "ws://" +
        SocketURL +
        "/ws/Chat/" +
        route.params._id.toString() +
        "/" +
        authContext.User._id.toString() +
        "/"
    );

    return () => chatSocket.current.close();
  }, []);

  if (chatSocket.current) {
    chatSocket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.Type === "UsersCount") {
        if (data.UsersCount > 1) {
          OtherUserRead();
        }
        SetUsersCount(data.UsersCount);
      } else {
        if (data.From !== authContext.User._id) {
          AddToChat(data);
        }
      }
    };
  }

  const MessageToSocket = async (Data) => {
    try {
      chatSocket.current.send(JSON.stringify(Data));
    } catch (error) {}
  };

  const CloseActionSheets = () => {
    SetShowGallerySheet(false);
    SetShowCameraSheet(false);
  };

  const GetPermission = async () => {
    CloseActionSheets();
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    SetMediaPerm(result.granted);

    const camResult = await ImagePicker.requestCameraPermissionsAsync();
    SetCameraPerm(camResult.granted);

    const getAudioPerm = await Audio.requestPermissionsAsync();
    SetAudioPerm(getAudioPerm.granted);
  };

  const ReadAll = async () => {
    try {
      await API.ReadAll({
        _id: route.params._id,
        SeenBy: authContext.User._id,
      });
    } catch (error) {}
  };

  const OtherUserRead = async () => {
    try {
      let count = 0;
      let newArray = [...Messages];
      for (let i = newArray.length - 1; i >= 0; i--) {
        if (newArray[i].From.toString() === authContext.User._id.toString()) {
          if (newArray[i].Read === true) {
            break;
          } else {
            newArray[i].Read = true;
            count++;
          }
        }
      }
      if (count > 0) {
        SetMessages(newArray);
      }
    } catch (error) {}
  };

  const UpdateStatus = async (data) => {
    try {
      if (data.isRecording) {
        SetRecordingDuration(data.durationMillis);
      }
    } catch (error) {}
  };

  const StartRecording = async () => {
    CloseActionSheets();
    if (AudioPerm === true) {
      try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        recording.setOnRecordingStatusUpdate(UpdateStatus);
        recording.setProgressUpdateInterval(1000);
        await recording.startAsync();
        SetisRecording(true);
      } catch (error) {}
    } else {
      GetPermission();
    }
  };

  const PauseRecording = async () => {
    try {
      if (isRecording && RecordStatus === "Recording..") {
        await recording.pauseAsync();
        SetRecordStatus("Recording Paused");
      } else {
        await recording.startAsync();
        SetRecordStatus("Recording..");
      }
    } catch (error) {}
  };

  const StopRecording = async () => {
    CloseActionSheets();
    try {
      await recording.stopAndUnloadAsync();
      const result = recording.getURI();
      ConstructAudioFormData(result);
      recording = new Audio.Recording();
      SetisRecording(false);
    } catch (error) {}
  };

  const CancelRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      recording = new Audio.Recording();
      SetisRecording(false);
    } catch (error) {
      SetisRecording(false);
    }
  };

  const CaptureFile = async (option) => {
    CloseActionSheets();
    try {
      if (MediaPerm === true && CameraPerm === true) {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes:
            option === "image"
              ? ImagePicker.MediaTypeOptions.Images
              : ImagePicker.MediaTypeOptions.Videos,
          videoMaxDuration: 120,
        });
        if (result.cancelled === false) {
          if (option === "image") {
            ConstructImageFormData(result);
          } else {
            if (result.duration > 1000) {
              ConstructVideoFormData(result);
            } else {
              SetShowGallerySheet(false);
              SetShowCameraSheet(false);
              Toast.show("Video Too Short...");
            }
          }
        }
      } else {
        GetPermission();
      }
    } catch (error) {}
  };

  const PickFiles = async (options) => {
    CloseActionSheets();
    let result = await DocumentPicker.getDocumentAsync({
      type:
        options === "image"
          ? "image/*"
          : options === "video"
          ? "video/*"
          : "audio/*",
    });
    if (result.type !== "cancel") {
      if (result.size > 25000000) {
        Toast.show("File Limit of 25 MB");
      } else {
        let type = HelperFunctions.GiveMimeTypeMessage(result.uri);
        if (type === "none") {
          Toast.show("Only Images/Videos/Audio Allowed");
        } else {
          result.type = type;
          if (type === "image") {
            ConstructImageFormData(result);
          } else if (type === "video") {
            ConstructVideoFormData(result);
          } else if (type === "audio") {
            ConstructAudioFormData(result.uri);
          }
        }
      }
    }
  };

  const ShowFullModal = (item) => {
    CloseActionSheets();
    try {
      if (item.Mime === "image") {
        SetViewImage(true);
        SetSelectedImage(item);
      } else if (item.Mime === "video") {
        SetViewVideo(true);
        SetSelectedVideo(item);
      }
    } catch (error) {}
  };

  const RenderItem = ({ item }) =>
    item.From === authContext.User._id ? (
      <SendMessage
        Message={item.Message}
        Time={item.Time}
        Date={item.Date !== "" ? item.Date : null}
        Type={item.Type}
        File={item.File}
        Mime={item.Mime}
        Read={Messages[Messages.length - 1]._id === item._id ? item.Read : null}
        CustomFile={item.CustomFile}
        PreviewFile={item.PreviewFile}
        ProfilePicture={authContext.User.ProfilePicture}
        Name={"You"}
        onPress={() => {
          ShowFullModal(item);
          SetCurrentPlaying(item._id);
        }}
        onShare={Loading ? null : () => Share(item)}
        CurrentPlaying={CurrentPlaying}
      />
    ) : (
      <RecievedMessage
        Message={item.Message}
        Time={item.Time}
        Date={item.Date !== "" ? item.Date : null}
        Type={item.Type}
        File={item.File}
        Mime={item.Mime}
        CustomFile={item.CustomFile}
        PreviewFile={item.PreviewFile}
        ProfilePicture={OtherUser.ProfilePicture}
        Name={OtherUser.Name}
        onPress={() => {
          ShowFullModal(item);
          SetCurrentPlaying(item._id);
        }}
        onShare={Loading ? null : () => Share(item)}
        CurrentPlaying={CurrentPlaying}
      />
    );

  const AddToChat = (data) => {
    SetMessage("");
    SetMessages([...Messages, { ...data }]);
  };

  const SendTextMessage = async () => {
    CloseActionSheets();
    let Time = HelperFunctions.GetCurrentTime();
    let tempID = HelperFunctions.GenerateUniqueID();
    let Data = {
      _id: tempID,
      From: authContext.User._id,
      Message: Message,
      Type: "Text",
      Read: UsersCount > 1 ? true : false,
      Time: Time,
    };

    let Date = HelperFunctions.GetTodayDate();
    if (Messages.length === 0) {
      Data.Date = Date;
      route.params.LastMessageDate = Date;
    } else {
      if (route.params.LastMessageDate === Date) {
        Data.Date = "";
      } else {
        Data.Date = Date;
        route.params.LastMessageDate = Date;
      }
    }
    AddToChat(Data);
    MessageToSocket(Data);

    try {
      Data._id = route.params._id;
      const response = await API.SendMessage(Data);
      if (response.ok) {
      } else {
        const temp = Messages.filter((c) => c._id !== tempID);
        SetMessages(temp);
        Toast.show("Server Error");
      }
    } catch (error) {
      const temp = Messages.filter((c) => c._id !== tempID);
      SetMessages(temp);
      Toast.show("Server Error");
    }
  };

  const Share = async (item) => {
    SetLoadingText("Preparing to Send...");
    SetLoading(true);
    try {
      if (!(await Sharing.isAvailableAsync())) {
        SetLoading(false);
        Toast.show(`Uh oh, sharing isn't available on your platform`);
        return;
      }

      if (item.CustomFile) {
        SetLoading(false);
        await Sharing.shareAsync(item.CustomFile);
      } else {
        let name = item.File.split("/").pop();

        const result = FileSystem.createDownloadResumable(
          BaseURL + item.File,
          FileSystem.cacheDirectory + name,
          {},
          null
        );

        const response = await result.downloadAsync();
        if (response.status === 200) {
          SetLoading(false);
          await Sharing.shareAsync(response.uri);
        } else {
          SetLoading(false);
          Toast.show(`Some Error while sharing`);
        }
      }
    } catch (error) {
      SetLoading(false);
      Toast.show(`Some Error while sharing`);
    }
  };

  const DownloadStatus = ({ totalBytesExpectedToWrite, totalBytesWritten }) => {
    SetProgress(
      (totalBytesWritten / totalBytesExpectedToWrite).toFixed(1) * 100
    );
    SetDownloadPercent(
      `${(totalBytesWritten / totalBytesExpectedToWrite).toFixed(1) * 100}%`
    );
  };

  const SaveToGallery = async (item) => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      SetLoadingText("Downloading File....");
      SetLoading(true);
      try {
        if (item.CustomFile) {
          const asset = await MediaLibrary.createAssetAsync(item.CustomFile);
          MediaLibrary.createAlbumAsync("EasyShop", asset, false)
            .then(() => {
              SetLoading(false);
              ToastAndroid.show("Saved in Gallery", 3000);
            })
            .catch(() => {
              SetLoading(false);
              ToastAndroid.show("Error In Saving File", 3000);
            });
        } else {
          let name = item.File.split("/").pop();

          const result = FileSystem.createDownloadResumable(
            BaseURL + item.File,
            FileSystem.cacheDirectory + name,
            {},
            DownloadStatus
          );

          const response = await result.downloadAsync();
          if (response.status === 200) {
            const asset = await MediaLibrary.createAssetAsync(response.uri);
            MediaLibrary.createAlbumAsync("EasyShop", asset, false)
              .then(() => {
                SetLoading(false);
                ToastAndroid.show("Saved in Gallery", 3000);
                SetProgress(0);
                SetDownloadPercent("");
              })
              .catch(() => {
                SetLoading(false);
                ToastAndroid.show("Error In Saving File", 3000);
                SetProgress(0);
                SetDownloadPercent("");
              });
          } else {
            SetLoading(false);
            ToastAndroid.show("Error In Saving File", 3000);
            SetProgress(0);
            SetDownloadPercent("");
          }
        }
      } catch (error) {
        SetLoading(false);
        ToastAndroid.show("Error In Saving File", 3000);
        SetProgress(0);
        SetDownloadPercent("");
      }
    } else {
      ToastAndroid.show("Need Storage permission to download Invoice");
    }
  };

  const ConstructImageFormData = async (result) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [],
        { compress: 0.3 }
      );
      result.PreviewFile = manipResult.uri;
      SendFileMessage(result);
    } catch (error) {}
  };

  const ConstructVideoFormData = async (result) => {
    let name = AppConfiguration.DefaultThumbnail.split("/").pop();
    const VideoThumbnail = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "VideoDefault/" + name,
      { size: true }
    );

    try {
      VideoThumbnails.getThumbnailAsync(result.uri, {
        time: 1000,
        quality: 1,
      })
        .then((data) => {
          result.PreviewFile = data.uri;
          SendFileMessage(result);
        })
        .catch((error) => {
          result.PreviewFile = VideoThumbnail.uri;
          SendFileMessage(result);
        });
    } catch (e) {
      result.PreviewFile = VideoThumbnail.uri;
      SendFileMessage(result);
    }
  };

  const ConstructAudioFormData = async (result) => {
    try {
      let FileName = `AUD_${
        HelperFunctions.TodayDateFormat() + "." + result.split(".").pop()
      }`;
      let Data = {
        name: FileName,
        type: "audio",
        uri: result,
      };
      SendFileMessage(Data);
    } catch (error) {}
  };

  const SendFileMessage = async (result) => {
    SetLoadingText("Sending File...");
    SetLoading(true);
    CloseActionSheets();
    let Time = HelperFunctions.GetCurrentTime();
    let tempID = HelperFunctions.GenerateUniqueID();
    let Data = {
      _id: tempID,
      From: authContext.User._id,
      Type: "File",
      Mime: result.type,
      CustomFile: result.uri,
      PreviewFile: result.PreviewFile,
      Read: UsersCount > 1 ? true : false,
      Time: Time,
    };

    let Date = HelperFunctions.GetTodayDate();
    if (Messages.length === 0) {
      Data.Date = Date;
      route.params.LastMessageDate = Date;
    } else {
      if (route.params.LastMessageDate === Date) {
        Data.Date = "";
      } else {
        Data.Date = Date;
        route.params.LastMessageDate = Date;
      }
    }
    AddToChat(Data);

    try {
      const form = new FormData();
      form.append("_id", route.params._id);
      form.append("From", authContext.User._id);
      form.append("Type", "File");
      form.append("Mime", result.type);
      form.append("Read", UsersCount > 1 ? true : false);
      form.append("Files", {
        name: result.name
          ? result.name
          : "SampleFile." + result.uri.split(".").pop(),
        uri: result.uri,
        type: result.type + "/" + result.uri.split(".").pop(),
      });
      if (result.type === "image" || result.type === "video") {
        form.append("PreviewFile", {
          name: "SampleFilePreview." + result.PreviewFile.split(".").pop(),
          uri: result.PreviewFile,
          type: "image" + "/" + result.PreviewFile.split(".").pop(),
        });
      }
      const response = await API.SendFile(form);
      if (response.ok) {
        response.data._id = tempID;
        MessageToSocket(response.data);
        SetLoading(false);
      } else {
        const temp = Messages.filter((c) => c._id !== tempID);
        SetMessages(temp);
        SetLoading(false);
        Toast.show("Server Error");
      }
    } catch (error) {
      const temp = Messages.filter((c) => c._id !== tempID);
      SetMessages(temp);
      SetLoading(false);
      Toast.show("Server Error");
    }
  };

  return (
    <Container Loading={Loading} LoadingText={LoadingText}>
      <VImage
        modalVisible={ViewImage}
        hideModal={() => {
          SetViewImage(false);
          SetCurrentPlaying(null);
        }}
        onShare={Loading ? null : () => Share(SelectedImage)}
        onDownload={() => SaveToGallery(SelectedImage)}
        {...SelectedImage}
        LoadingText={LoadingText}
        Loading={Loading}
        progress={Progress}
        DownloadPercentage={DownloadPercent}
      />
      <VVideo
        modalVisible={ViewVideo}
        hideModal={() => {
          SetViewVideo(false);
          SetCurrentPlaying(null);
        }}
        onShare={Loading ? null : () => Share(SelectedVideo)}
        onDownload={() => SaveToGallery(SelectedVideo)}
        {...SelectedVideo}
        LoadingText={LoadingText}
        Loading={Loading}
        CurrentPlaying={CurrentPlaying}
        progress={Progress}
        DownloadPercentage={DownloadPercent}
      />

      <ImageTopBar
        File={OtherUser.ProfilePicture}
        Title={OtherUser.Name}
        onBackPress={() => navigation.goBack()}
        Status={UsersCount > 1 ? "Online" : "Offline"}
      />

      <View style={styles.container}>
        <FlatList
          data={Messages}
          keyExtractor={(item) => item._id.toString()}
          renderItem={RenderItem}
          ref={FLatListRef}
          onContentSizeChange={() => FLatListRef.current.scrollToEnd()}
          onLayout={() => FLatListRef.current.scrollToEnd()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
        />
      </View>

      <ChatKeyBaord
        Message={Message}
        onChangeText={(text) => SetMessage(text)}
        onCameraPress={() => {
          SetShowCameraSheet(!ShowCameraSheet);
          SetShowGallerySheet(false);
        }}
        onAttatchmentPress={() => {
          SetShowGallerySheet(!ShowGallerySheet);
          SetShowCameraSheet(false);
        }}
        onFocus={() => CloseActionSheets()}
        onImageCapturePress={() => CaptureFile("image")}
        onVideoCapturePress={() => CaptureFile("video")}
        onImagePicker={() => PickFiles("image")}
        onVideoPicker={() => PickFiles("video")}
        onAudioPicker={() => PickFiles("audio")}
        isRecording={isRecording}
        onStart={() => StartRecording()}
        onEnd={() => StopRecording()}
        onPause={() => PauseRecording()}
        onCancel={() => CancelRecording()}
        onSendPress={() => SendTextMessage()}
        ShowGallerySheet={ShowGallerySheet}
        ShowCameraSheet={ShowCameraSheet}
        RecordingDuration={RecordingDuration}
        RecordStatus={RecordStatus}
      />
    </Container>
  );
}

export default ChatRoom;

const styles = StyleSheet.create({
  ImageModal: {
    marginTop: StatusBar.currentHeight,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "red",
  },
  VideoModal: {
    marginTop: StatusBar.currentHeight,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  Header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  Avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginLeft: 5,
    marginRight: 15,
  },
});
