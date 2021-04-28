import Configuration from "../config/Configuration";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ColorPallete from "../config/ColorPallete";

const BaseURL = Configuration.BaseURL;

function ImageMessage(props) {
  return (
    <div
      style={{
        width: "auto",
        height: "auto",
        maxHeight: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {props.isVideo === true ? (
        <PlayArrowIcon
          style={{
            position: "absolute",
            color: ColorPallete.primary,
            fontSize: 100,
            zIndex: 30,
          }}
        />
      ) : null}

      {props.CustomFile ? (
        <img
          style={styles.Avatar}
          src={props.CustomFile}
          alt="ImageMessage"
          width="250"
          height="250"
        />
      ) : (
        <img
          style={styles.Avatar}
          src={BaseURL + props.File}
          width="250"
          height="250"
          alt="ImageMessage"
        />
      )}
    </div>
  );
}

export default ImageMessage;

const styles = {
  Avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    maxHeight: 300,
    objectFit: "cover",
  },
  FileTime: {
    position: "absolute",
    right: 10,
    bottom: 5,
    fontSize: 12,
    color: "white",
    fontFamily: "MuliBold",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
};
