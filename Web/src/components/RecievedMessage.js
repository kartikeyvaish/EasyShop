import ImageMessage from "./ImageMessage";
import Text from "./Text";
import Configuration from "./../config/Configuration";
import AudioPlayer from "./AudioPlayer";
import RecieptButton from "./RecieptButton";

const BaseURL = Configuration.BaseURL;

function RecievedMessage({
  Message,
  Time,
  Date,
  Type,
  File,
  Mime,
  CustomFile,
  PreviewFile,
  ProfilePicture,
  onPress,
  CurrentPlaying,
  _id,
  CanPlay,
}) {
  const RenderFile = () => {
    return (
      <div>
        {Mime === "audio" ? (
          <AudioPlayer
            Message={Message}
            Time={Time}
            File={File}
            CustomFile={CustomFile}
            ProfilePicture={ProfilePicture}
            CurrentPlaying={CurrentPlaying}
            onPress={onPress}
            _id={_id}
            CanPlay={CanPlay}
          />
        ) : (
          <ImageMessage
            File={Mime === "image" ? File : BaseURL + PreviewFile}
            PreviewFile={Mime === "image" ? PreviewFile : BaseURL + PreviewFile}
            CustomFile={
              Mime === "image"
                ? CustomFile
                : CustomFile
                ? PreviewFile
                : BaseURL + PreviewFile
            }
            onPress={onPress}
            Mime={Mime}
            Time={Time}
            isVideo={Mime === "video" ? true : false}
          />
        )}
      </div>
    );
  };

  const RenderText = () => {
    return (
      <div>
        <Text text={Message} />
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {Date ? (
        <Text text={Date} size={13} color="grey" marginBottom={5} />
      ) : null}

      <div style={styles.InnerContainer}>
        {Type === "Text" ? RenderText() : RenderFile()}

        <RecieptButton Time={Time} Mime={Mime} Read={null} Type={Type} />
      </div>
    </div>
  );
}

export default RecievedMessage;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginBottom: 8,
  },
  InnerContainer: {
    maxWidth: "80%",
    minWidth: "40%",
    height: "auto",
    width: "auto",
    alignSelf: "flex-start",
    padding: 10,
    borderColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    position: "relative",
  },
};
