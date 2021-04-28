import { useContext } from "react";
import ThemeContext from "../themes/context";

function Icon({
  color,
  children,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  onClick,
}) {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        color: color ? color : themeContext.theme.colors.text,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Icon;
