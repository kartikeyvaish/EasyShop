import { makeStyles } from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import { useContext } from "react";
import ThemeContext from "../themes/context";

function PhoneInput({
  error = "",
  onBlur,
  onChange,
  ErrorVisibility,
  marginTop,
}) {
  const themeContext = useContext(ThemeContext);
  const useStyles = makeStyles((theme) => ({
    cssLabel: {
      color: themeContext.theme.colors.text,
    },
    cssFocused: {
      borderColor: `${"green"} !important`,
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: `${
        error !== "" && ErrorVisibility === true
          ? "red"
          : themeContext.theme.colors.text
      } !important`,
    },
  }));

  const classes = useStyles();

  return (
    <MuiPhoneNumber
      label="Phone"
      defaultCountry={"in"}
      onChange={onChange}
      variant="outlined"
      style={{
        width: "100%",
        color: "red",
        marginBottom: error !== "" && ErrorVisibility === true ? 0 : 8,
      }}
      InputLabelProps={{
        style: {
          color:
            error !== "" && ErrorVisibility === true
              ? "red"
              : themeContext.theme.colors.text,
        },
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
      }}
      InputProps={{
        classes: {
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        },
        style: {
          maxHeight: 150,
          overflow: "auto",
          marginBottom: 2,
          color: themeContext.theme.colors.text,
        },
      }}
      helperText={error !== "" && ErrorVisibility === true ? error : null}
      onBlur={onBlur}
      FormHelperTextProps={{ style: { margin: 0, marginBottom: 8 } }}
      error={error !== "" && ErrorVisibility === true ? true : false}
    />
  );
}

export default PhoneInput;
