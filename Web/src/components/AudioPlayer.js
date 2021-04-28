import { useRef, useState } from "react";
import Configuration from "../config/Configuration";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ColorPallete from "../config/ColorPallete";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import ReplayIcon from "@material-ui/icons/Replay";
import { CircularProgress } from "@material-ui/core";

const BaseURL = Configuration.BaseURL;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function AudioPlayer({
  _id,
  Time,
  File,
  CustomFile,
  ProfilePicture,
  Name,
  CurrentPlaying,
  onPress,
}) {
  const Sound = useRef(new Audio(CustomFile ? CustomFile : BaseURL + File));
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Playing, SetPlaying] = useState(false);
  const [Value, SetValue] = useState(0);

  const classes = useStyles();

  Sound.current.oncanplaythrough = function () {
    SetLoaded(true);
  };

  Sound.current.addEventListener(
    "ended",
    function () {
      Sound.current.currentTime = 0;
      SetValue(0);
      SetPlaying(false);
    },
    false
  );

  Sound.current.addEventListener("timeupdate", function () {
    var currentTime = Sound.current.currentTime;
    var duration = Sound.current.duration;
    if (Playing === true) {
      const progress = (currentTime / duration) * 100;
      if (progress > 100) {
        SetValue(100);
      } else {
        SetValue(progress);
      }
    }
  });

  const PlayAudio = async () => {
    try {
      if (Playing === false) {
        Sound.current.play();
        SetPlaying(true);
      }
    } catch (error) {}
  };

  const PauseAudio = async () => {
    try {
      if (CurrentPlaying === _id.toString()) {
        if (Playing === true) {
          Sound.current.pause();
          SetPlaying(false);
        }
      }
    } catch (error) {}
  };

  const LoadAudio = async () => {
    SetLoading(true);
    try {
      Sound.current.load();
      SetLoaded(true);
      SetLoading(false);
    } catch (error) {
      toast.error("Error in Loading Audio");
      SetLoaded(false);
      SetLoading(false);
    }
  };

  return (
    <div style={styles.AudioBox} onClick={onPress}>
      <div style={styles.PlayPauseButton}>
        {Loaded === false ? (
          Loading ? (
            <div>
              <CircularProgress
                style={{ fontSize: 40, color: ColorPallete.primary }}
              />
            </div>
          ) : (
            <div onClick={() => LoadAudio()}>
              <ReplayIcon
                style={{ fontSize: 40, color: ColorPallete.primary }}
              />
            </div>
          )
        ) : Playing ? (
          <div onClick={() => PauseAudio()}>
            <PauseIcon style={{ fontSize: 40, color: ColorPallete.primary }} />
          </div>
        ) : (
          <div onClick={() => PlayAudio()}>
            <PlayArrowIcon
              style={{ fontSize: 40, color: ColorPallete.primary }}
            />
          </div>
        )}
      </div>

      <div style={styles.ProgressBox}>
        <div className={classes.root}>
          <LinearProgress variant="determinate" value={Value} />
        </div>
      </div>

      <div style={styles.ProfilePicture}>
        <img
          src={BaseURL + ProfilePicture}
          width="60"
          alt="DP"
          height="60"
          style={{ objectFit: "contain", borderRadius: 60 }}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;

const styles = {
  AudioBox: {
    height: 100,
    width: 500,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
  },
  PlayPauseButton: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  ProgressBox: {
    display: "flex",
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  ProfilePicture: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
};
