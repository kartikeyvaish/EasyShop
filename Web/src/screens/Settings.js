import { useContext, useEffect } from "react";
import AuthContext from "../auth/context";
import CheckBox from "../components/CheckBox";
import SingleContainer from "../components/SingleContainer";
import Text from "../components/Text";

function Settings() {
  const { Mode, SetMode } = useContext(AuthContext);

  useEffect(() => {
    document.title = "EasyShop | Settings";
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <SingleContainer style={{ padding: 0 }}>
      <div style={styles.Box}>
        <Text
          text="Settings"
          size={30}
          family="Mulish"
          weight="700"
          marginTop={20}
          marginLeft={20}
          marginBottom={20}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckBox
            checked={Mode === "dark" ? true : false}
            onChange={() => {
              localStorage.setItem(
                "ModeToken",
                Mode === "dark" ? "light" : "dark"
              );
              SetMode(Mode === "dark" ? "light" : "dark");
            }}
          />
          <Text text="Enable Dark Mode" size={18} marginTop={-3} />
        </div>
      </div>
    </SingleContainer>
  );
}

export default Settings;

const styles = {
  Box: {
    width: "100%",
    maxWidth: 800,
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
  },
};
