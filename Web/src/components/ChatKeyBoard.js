import { makeStyles, TextField } from "@material-ui/core";
import { useContext } from "react";
import ThemeContext from "../themes/context";
import Text from "./Text";

function ChatKeyBoard({
  label,
  type,
  error = "",
  variant = "outlined",
  onBlur,
  onChange,
  ErrorVisibility,
  style,
  placeholder,
  inputRef,
  value,
  multiline,
  disabled,
  defaultValue,
  NormalText,
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
    <>
      <TextField
        label={label}
        variant={variant}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        value={value}
        inputRef={inputRef}
        disabled={disabled}
        multiline={multiline}
        error={error !== "" && ErrorVisibility === true ? true : false}
        onChange={onChange}
        helperText={error !== "" && ErrorVisibility === true ? error : null}
        onBlur={onBlur}
        InputLabelProps={{
          style: {
            color:
              error !== "" && ErrorVisibility === true
                ? "red"
                : themeContext.theme.colors.text,
          },
          classes: {
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
            color: themeContext.theme.colors.text,
          },
        }}
        FormHelperTextProps={{ style: { margin: 3 } }}
        style={{
          width: "100%",
          marginBottom: 10,
          opacity: disabled ? 0.5 : 1,
          marginTop: 10,
          ...style,
        }}
      />
      {NormalText ? (
        <div style={{ width: "100%", marginBottom: 10, ...style }}>
          <Text text="Email is Verified" marginTop={-10} color="green" />
        </div>
      ) : null}
    </>
  );
}

export default ChatKeyBoard;
