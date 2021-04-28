import { useContext, useEffect, useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import ThemeContext from "../themes/context";
import Configuration from "../config/Configuration";

const BaseURL = Configuration.BaseURL;

function FileCard({ type = "image", file, onCancel, uri = null }) {
  const [File, SetFile] = useState("");
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    if (uri) {
      SetFile(BaseURL + uri);
    } else {
      GetFile();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const GetFile = () => {
    var reader = new FileReader();
    reader.onload = function (e) {
      SetFile(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        minWidth: 100,
        height: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderColor: "grey",
        borderWidth: 1,
        borderStyle: "solid",
        marginLeft: 10,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          position: "absolute",
          top: 0,
          right: 0,
          color: "red",
        }}
        onClick={onCancel}
      >
        <CancelIcon style={{ fontSize: 30 }} />
      </div>
      {type === "image" ? (
        <img
          src={File}
          alt="FILE"
          width="100"
          height="90"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <PlayArrowIcon
          style={{ fontSize: 80, color: themeContext.theme.colors.text }}
        />
      )}
    </div>
  );
}

export default FileCard;
