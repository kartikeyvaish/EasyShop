import Configuration from "../config/Configuration";
import AudioPlayer from "./AudioPlayer";
import ImageMessage from "./ImageMessage";
import Text from "./Text";
import ThemedDiv from "./ThemedDiv";
import RecieptButton from "./RecieptButton";

const BaseURL = Configuration.BaseURL;

function SendMessage({
  Message,
  Time,
  Date,
  Read,
  Type,
  File,
  Mime,
  CustomFile,
  PreviewFile,
  ProfilePicture,
  onPress,
  CurrentPlaying,
  _id,
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
    <>
      <div style={styles.container}>
        {Date ? (
          <Text text={Date} size={13} color="grey" marginBottom={5} />
        ) : null}
        <ThemedDiv
          style={{
            maxWidth: "80%",
            height: "auto",
            minWidth: "40%",
            width: "auto",
            alignSelf: "flex-end",
            padding: 10,
            borderColor: "grey",
            borderRadius: 10,
            borderWidth: 1,
            borderStyle: "solid",
            position: "relative",
          }}
        >
          {Type === "Text" ? RenderText() : RenderFile()}
          <RecieptButton Time={Time} Read={Read} Mime={Mime} Type={Type} />
        </ThemedDiv>
      </div>
    </>
  );
}

export default SendMessage;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginBottom: 8,
  },
};
