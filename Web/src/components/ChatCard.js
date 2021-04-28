import MusicNoteIcon from "@material-ui/icons/MusicNote";
import ImageIcon from "@material-ui/icons/Image";
import VideocamIcon from "@material-ui/icons/Videocam";

import ColorPallete from "../config/ColorPallete";
import Configuration from "../config/Configuration";
import Text from "./Text";

const BaseURL = Configuration.BaseURL;

function CheckUnreadStatus(arr, Owner) {
  if (arr.length) {
    if (arr[arr.length - 1].From === Owner) {
      if (arr[arr.length - 1].Read === false) {
        return true;
      }
    }
  }
  return false;
}

function ChatCard({
  User,
  TimeAgo,
  onClick,
  Messages,
  LastMessage,
  LastMessageType,
}) {
  let Status = CheckUnreadStatus(Messages, User._id);

  return (
    <div style={styles.container} className="SmallElevation" onClick={onClick}>
      <img
        src={BaseURL + User.ProfilePicture}
        alt={"DP"}
        width="50"
        height="50"
      ></img>

      <div style={styles.InnerContainer}>
        <Text text={User.Name} marginLeft={10} weight="700" family="Mulish" />
        <div style={styles.LastMessageBox}>
          {LastMessageType === "Text" ? null : LastMessage === "image" ? (
            <ImageIcon style={styles.Icon} />
          ) : LastMessage === "video" ? (
            <VideocamIcon style={styles.Icon} />
          ) : (
            <MusicNoteIcon style={styles.Icon} />
          )}
          <Text
            text={
              LastMessageType === "Text"
                ? "Message"
                : LastMessage === "image"
                ? "Image"
                : LastMessage === "video"
                ? "Video"
                : "Audio"
            }
            size={13}
            color={Status ? ColorPallete.primary : null}
            family="Inter"
            marginLeft={LastMessageType === "Text" ? 0 : 10}
          />
        </div>
      </div>

      <div style={styles.LastMessageDateBox}>
        <Text text={TimeAgo} color={Status ? ColorPallete.primary : null} />
      </div>
    </div>
  );
}

export default ChatCard;

const styles = {
  container: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  InnerContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
  },
  Icon: {
    fontSize: 18,
    color: ColorPallete.primary,
  },
  LastMessageBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  LastMessageDateBox: {
    display: "flex",
    width: "auto",
    height: "100%",
    padding: 10,
    alignSelf: "flex-end",
  },
};
