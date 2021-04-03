import { useEffect } from "react";
import * as FileSystem from "expo-file-system";

import AppConfiguration from "../config/AppConfiguration";
import HelperFunctions from "../config/HelperFunctions";

const BaseURL = AppConfiguration.BaseURL;

export default useCleaner = () => {
  useEffect(() => {
    ClearCache();
    DownloadDefaultVideoThumbnail();
    return () => {};
  }, []);

  const DeleteFolder = async (uri) => {
    try {
      const result = await FileSystem.deleteAsync(uri, {
        idempotent: true,
      });
    } catch (error) {}
  };

  const ClearCache = async () => {
    try {
      const CacheDir = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory
      );
      const DocuDir = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );
      const CacheDirectoryList = [
        "ImageManipulator",
        "SharingCache",
        "VideoThumbnails",
        "ImagePicker",
        "Sharing",
        "Audio",
        "DocumentPicker",
      ];
      for (let i = 0; i < CacheDir.length; i++) {
        if (HelperFunctions.GiveMimeTypeMessage(CacheDir[i]) !== "none") {
          DeleteFolder(FileSystem.cacheDirectory + CacheDir[i]);
        }
      }
      for (let i = 0; i < CacheDirectoryList.length; i++) {
        DeleteFolder(FileSystem.cacheDirectory + CacheDirectoryList[i]);
      }
      for (let i = 0; i < DocuDir.length; i++) {
        if (DocuDir[i] !== "VideoDefault") {
          DeleteFolder(FileSystem.documentDirectory + DocuDir[i]);
        }
      }
    } catch (error) {}
  };

  const DownloadDefaultVideoThumbnail = async () => {
    try {
      const VideoDefaultFolder = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "VideoDefault",
        { size: true }
      );

      if (VideoDefaultFolder.exists === false) {
        const mkdir = await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "VideoDefault",
          { intermediates: true }
        );
      }

      let name = AppConfiguration.DefaultThumbnail.split("/").pop();

      const VideoThumbnail = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "VideoDefault/" + name,
        { size: true }
      );

      if (VideoThumbnail.exists === false) {
        const result = FileSystem.createDownloadResumable(
          BaseURL + AppConfiguration.DefaultThumbnail,
          FileSystem.documentDirectory + "VideoDefault/" + name,
          {},
          null
        );
        await result.downloadAsync();
      }
    } catch (error) {}
  };
};
