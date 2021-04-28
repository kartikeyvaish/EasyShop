import { CircularProgress } from "@material-ui/core";
import ColorPallete from "../config/ColorPallete";
import Text from "./Text";

function LoadingScreen({ Loading, LoadingText = "Loading...." }) {
  return Loading === true ? (
    <div style={styles.LoadingScreen}>
      <CircularProgress style={{ color: ColorPallete.primary }} size={120} />
      <Text text={LoadingText} color="white" size={30} />
    </div>
  ) : null;
}

export default LoadingScreen;

const styles = {
  LoadingScreen: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};
