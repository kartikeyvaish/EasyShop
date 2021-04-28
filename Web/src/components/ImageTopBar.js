import Text from "./Text";
import Configuration from "./../config/Configuration";
import ColorPallete from "../config/ColorPallete";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const BaseURL = Configuration.BaseURL;

function ImageTopBar({ File, Name, Status }) {
  return (
    <>
      <div style={styles.container}>
        <img
          src={BaseURL + File}
          width="40"
          height="40"
          alt="DP"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text
            text={Name}
            marginLeft={20}
            weight="700"
            family="Inter"
            size={18}
          />
          <Text
            text={Status}
            marginLeft={20}
            color={Status === "Online" ? "green" : "red"}
            family="Inter"
            size={15}
          />
        </div>

        <div style={styles.LastMessageDateBox}>
          <MoreVertIcon style={styles.Icon} />
        </div>
      </div>
    </>
  );
}

export default ImageTopBar;

const styles = {
  Icon: {
    fontSize: 30,
    color: ColorPallete.primary,
    paddingRight: 10,
  },
  LastMessageDateBox: {
    display: "flex",
    flex: 1,
    flexDirection: "row-reverse",
  },
  container: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 3,
    paddingBottom: 3,
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: "1px",
    borderTopStyle: "none",
  },
};
