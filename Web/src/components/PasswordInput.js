import {
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useContext, useState } from "react";
import Text from "./Text";
import ThemeContext from "../themes/context";

function PasswordInput({
  value,
  onChange,
  label = "Password",
  error = "",
  onBlur,
  ErrorVisibility,
}) {
  const themeContext = useContext(ThemeContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& $notchedOutline": {
        borderColor: "red",
      },
      "&:hover $notchedOutline": {
        borderColor: "blue",
      },
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

  const [Type, SetType] = useState("password");

  const TogglePassword = () => {
    if (Type === "text") {
      SetType("password");
    } else {
      SetType("text");
    }
  };

  return (
    <>
      <FormControl
        variant="outlined"
        style={{ width: "100%", marginBottom: 10 }}
      >
        <InputLabel
          style={{
            color:
              error !== "" && ErrorVisibility === true
                ? "red"
                : themeContext.theme.colors.text,
          }}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          type={Type}
          onChange={onChange}
          value={value}
          error={error !== "" && ErrorVisibility === true ? true : false}
          onBlur={onBlur}
          classes={classes}
          inputProps={{
            style: {
              color: themeContext.theme.colors.text,
            },
          }}
          endAdornment={
            <InputAdornment position="end" onClick={() => TogglePassword()}>
              <IconButton edge="end">
                {Type === "password" ? (
                  <Visibility
                    style={{ color: themeContext.theme.colors.text }}
                  />
                ) : (
                  <VisibilityOff
                    style={{ color: themeContext.theme.colors.text }}
                  />
                )}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
        {error !== "" && ErrorVisibility === true ? (
          <Text text={error} size={12} color="red" style={{ margin: 3 }} />
        ) : null}
      </FormControl>
    </>
  );
}

export default PasswordInput;
