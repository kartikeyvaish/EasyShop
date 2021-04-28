import { useContext } from "react";
import ThemeContext from "../themes/context";

function Text({
  text,
  style = {},
  family,
  weight,
  size,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  cursor = "default",
  color,
  textDecoration = "none",
  onClick,
  textAlign,
  wordBreak,
  letterSpacing,
  ColorReverse,
}) {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      onClick={onClick}
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        textAlign: textAlign,
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: wordBreak,
        wordWrap: wordBreak,
      }}
    >
      <span
        style={{
          fontFamily: family,
          fontWeight: weight,
          fontSize: size,
          cursor: cursor,
          color: color
            ? color
            : ColorReverse
            ? themeContext.theme.colors.background
            : themeContext.theme.colors.text,
          textDecoration: textDecoration,
          letterSpacing: letterSpacing,
          overflow: "hidden",
          ...style,
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default Text;
