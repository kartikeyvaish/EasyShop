import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useContext } from "react";

import ThemeContext from "../themes/context";
import Text from "./Text";

function Picker({
  handleChange,
  value = "Select State",
  SelectItems,
  label,
  placeholder,
  onBlur,
  error,
  ErrorVisibility,
}) {
  const themeContext = useContext(ThemeContext);

  const useStyles = makeStyles({
    root: {
      width: "100%",
      marginTop: 10,
      "& .MuiOutlinedInput-input": {
        color:
          ErrorVisibility === true && error !== ""
            ? "red"
            : themeContext.theme.colors.text,
      },
      "& .MuiInputLabel-root": {
        color:
          ErrorVisibility === true && error !== ""
            ? "red"
            : themeContext.theme.colors.text,
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor:
          ErrorVisibility === true && error !== ""
            ? "red"
            : themeContext.theme.colors.text,
      },
      "&:hover .MuiOutlinedInput-input": {
        color: themeContext.theme.colors.text,
      },
      "&:hover .MuiInputLabel-root": {
        color: themeContext.theme.colors.text,
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: themeContext.theme.colors.text,
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: themeContext.theme.colors.text,
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: themeContext.theme.colors.text,
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: themeContext.theme.colors.text,
      },
    },
  });

  const classes = useStyles();

  return (
    <div>
      <FormControl variant="outlined" className={classes.root}>
        <InputLabel id="StateLabel">State</InputLabel>
        <Select
          labelId="StateLabel"
          id="SelectID"
          value={value}
          onChange={handleChange}
          label={label}
          onBlur={onBlur}
          style={{ width: "100%" }}
        >
          <MenuItem value={placeholder}>{placeholder}</MenuItem>
          {SelectItems.map((c) => (
            <MenuItem value={c.name} key={c.key}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {ErrorVisibility === true && error !== "" ? (
        <Text text="State is Required" color="red" />
      ) : null}
    </div>
  );
}

export default Picker;
