import { useContext } from "react";
import ThemeContext from "../themes/context";

function Box({
  children,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  style = {},
  backgroundColor,
}) {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: backgroundColor
          ? backgroundColor
          : themeContext.theme.colors.background,
        justifyContent: "center",
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Box;
