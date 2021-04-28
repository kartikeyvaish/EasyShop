import { useContext } from "react";
import ThemeContext from "../themes/context";
import TextInput from "./TextInput";
import ThemedDiv from "./ThemedDiv";
import SearchIcon from "@material-ui/icons/Search";
import ColorPallete from "../config/ColorPallete";

function SearchBar({
  placeholder = "Search for Products etc...",
  onChange,
  onRightPress,
  onKeyPress,
}) {
  const themeContext = useContext(ThemeContext);

  return (
    <ThemedDiv
      style={{
        height: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
      }}
    >
      <div style={{ flex: 9 }}>
        <TextInput
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={onKeyPress}
          style={{
            backgroundColor: themeContext.theme.colors.background,
            borderRadius: 5,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flex: 2,
          maxWidth: 100,
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onRightPress}
      >
        <SearchIcon style={{ color: ColorPallete.primary }} />
      </div>
    </ThemedDiv>
  );
}

export default SearchBar;
