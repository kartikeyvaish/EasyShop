import { CircularProgress, Container as CNT } from "@material-ui/core";
import { useContext } from "react";
import ThemeContext from "../themes/context";
import Text from "./Text";

function Container({
  children,
  style = {},
  backgroundColor,
  Loading = false,
  LoadingText = "Loading...",
}) {
  const themeContext = useContext(ThemeContext);

  return (
    <CNT
      maxWidth={false}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: backgroundColor
          ? backgroundColor
          : themeContext.theme.colors.background,
        width: "100%",
        overflow: "auto",
        ...style,
      }}
    >
      {Loading ? (
        <div
          style={{
            width: "100%",
            height: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress style={{ color: themeContext.theme.colors.text }} />
          <Text text={LoadingText} marginTop={20} size={20} family="Mulish" />
        </div>
      ) : (
        children
      )}
    </CNT>
  );
}

export default Container;
