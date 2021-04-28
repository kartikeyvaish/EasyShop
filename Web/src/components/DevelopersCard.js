import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";
import { toast } from "react-toastify";

import ColorPallete from "../config/ColorPallete";
import Configuration from "../config/Configuration";
import Text from "./Text";
import Icon from "./Icon";

const ImageURL = Configuration.ImageURL;
const Instagram = Configuration.Instagram;
const Github = Configuration.Github;

function DevelopersCard(props) {
  return (
    <div style={styles.container}>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 120,
        }}
      >
        <img src={ImageURL + props.ProfilePic} alt="DP" style={styles.Avatar} />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          paddingLeft: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Text text={props.Name} size={20} family="Inter" weight="bold" />
        <Text text={props.Specialization} size={18} family="Inter" />
        <Text text={props.Tech_Used} family="Inter" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <Icon
            marginRight={20}
            onClick={() =>
              window.open(Instagram + props.Instgram_Username, "_blank")
            }
          >
            <InstagramIcon />
          </Icon>

          <Icon
            marginRight={20}
            onClick={() =>
              window.open(Github + props.Github_Username, "_blank")
            }
          >
            <GitHubIcon />
          </Icon>

          <Icon
            marginRight={20}
            onClick={() => toast.info(`Send Mail to : ${props.Email}`)}
          >
            <MailIcon />
          </Icon>
        </div>
      </div>
    </div>
  );
}

export default DevelopersCard;

const styles = {
  Avatar: {
    borderColor: ColorPallete.primary,
    borderWidth: 2,
    borderStyle: "solid",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  container: {
    display: "flex",
    width: "100%",
    height: "auto",
    minHeight: 150,
    paddingBottom: 30,
    flexDirection: "row",
    borderColor: ColorPallete.primary,
    borderWidth: 1,
    borderStyle: "solid",
    marginBottom: 20,
    borderRadius: 10,
  },
};
