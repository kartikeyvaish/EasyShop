import { Button as BTN, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import ColorPallete from "../config/ColorPallete";
import ThemeContext from "../themes/context";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

function Button({
  style = {},
  color,
  backgroundColor = ColorPallete.primary,
  Title,
  Loading,
  onClick,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  fontSize = 18,
  capitalize = true,
  fontFamily,
}) {
  const classes = useStyles();

  const themeContext = useContext(ThemeContext);

  return (
    <BTN
      variant="contained"
      style={{
        color: color ? color : themeContext.theme.colors.text,
        backgroundColor: backgroundColor,
        width: "100%",
        height: 50,
        fontSize: fontSize,
        opacity: Loading ? 0.5 : 1,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        fontFamily: fontFamily,
        ...style,
      }}
      className={capitalize === false ? classes.button : null}
      onClick={Loading === true ? null : onClick}
    >
      {Title}
      {Loading === true ? (
        <CircularProgress
          size={30}
          style={{ position: "absolute", right: 10, color: color }}
        />
      ) : null}
    </BTN>
  );
}

export default Button;
