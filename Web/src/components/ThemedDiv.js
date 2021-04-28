import { useContext } from "react";

import ThemeContext from "../themes/context";

function ThemedDiv({ style, backgroundColor, children, className }) {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: backgroundColor
          ? backgroundColor
          : themeContext.theme.colors.background,
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default ThemedDiv;
